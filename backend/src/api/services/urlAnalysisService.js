const puppeteer = require('puppeteer');

const analyze = async (url) => {
  let browser;

  try {
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();

    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36'
    );

    await page.evaluateOnNewDocument(() => {
      Object.defineProperty(navigator, 'webdriver', {
        get: () => false,
      });
    });

    await page.goto(url, {
      waitUntil: 'networkidle2',
      timeout: 45000,
    });

    await page.waitForSelector('body', { timeout: 10000 });

    const blockedDomains = [
      'disneyplus.com',
      'disney.com',
    ];
    
    const currentDomain = new URL(url).hostname;
    const isDomainBlocked = blockedDomains.some(domain => currentDomain.includes(domain));
    
    if (isDomainBlocked) {
      console.log(`Warning: Domain ${currentDomain} prohibits automated scraping.`);
    }

    const privacyPolicyVerification = await page.evaluate(() => {
      const title = document.title.toLowerCase();
      const titleIndicators = ['privacy', 'privacy policy', 'data protection', 'data policy', 'privacy statement'];
      const titleMatch = titleIndicators.some(indicator => title.includes(indicator));
      
      const path = window.location.pathname.toLowerCase();
      const urlIndicators = ['privacy', 'privacy-policy', 'privacypolicy', 'data-protection', 'legal/privacy'];
      const urlMatch = urlIndicators.some(indicator => path.includes(indicator));
      
      const bodyText = document.body.innerText.toLowerCase();
      const keywordCounts = {
        'privacy': (bodyText.match(/privacy/g) || []).length,
        'personal data': (bodyText.match(/personal data/g) || []).length,
        'information': (bodyText.match(/information/g) || []).length,
        'collect': (bodyText.match(/collect/g) || []).length,
        'cookie': (bodyText.match(/cookie/g) || []).length,
        'gdpr': (bodyText.match(/gdpr/g) || []).length,
        'consent': (bodyText.match(/consent/g) || []).length,
        'third party': (bodyText.match(/third party/g) || []).length
      };
      
      const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'))
        .map(h => h.innerText.toLowerCase());
      const headingMatch = headings.some(heading => 
        heading.includes('privacy') || heading.includes('policy') || 
        heading.includes('data protection') || heading.includes('personal information')
      );
      
      const contentLength = bodyText.length;
      
      const commonSections = [
        'information we collect',
        'how we use',
        'data retention',
        'your rights',
        'third parties',
        'cookies',
        'changes to this policy',
        'contact us'
      ];
      
      const sectionMatches = commonSections.filter(section => 
        bodyText.includes(section.toLowerCase())
      ).length;
      
      let confidenceScore = 0;
      if (titleMatch) confidenceScore += 25;
      if (urlMatch) confidenceScore += 25;
      if (headingMatch) confidenceScore += 20;
      
      const totalKeywords = Object.values(keywordCounts).reduce((sum, count) => sum + count, 0);
      const keywordDensity = totalKeywords / (contentLength || 1) * 1000; 
      confidenceScore += Math.min(keywordDensity * 5, 15); 
      
      confidenceScore += Math.min(sectionMatches * 3, 15); 
      return {
        titleMatch,
        urlMatch,
        headingMatch,
        keywordCounts,
        contentLength,
        sectionMatches,
        confidenceScore,
        isLikelyPrivacyPolicy: confidenceScore >= 60
      };
    });

    const extractedText = await page.evaluate(() => {
      return document.body.innerText;
    });

    const structuredData = await page.evaluate(() => {
      const jsonLdElements = document.querySelectorAll('script[type="application/ld+json"]');
      const jsonData = [];
      
      jsonLdElements.forEach(element => {
        try {
          const parsed = JSON.parse(element.textContent);
          jsonData.push(parsed);
        } catch (error) {
          next(error)
        }
      });
      
      return jsonData;
    });

    return {
      extractedText: extractedText
        .replace(/\t/g, ' ')
        .replace(/\n{2,}/g, '\n')
        .replace(/\s{2,}/g, ' ')
        .trim(),
      url: page.url(),
      structuredData: structuredData.length > 0 ? structuredData : null,
      potentiallyBlockedDomain: isDomainBlocked
    };
  } catch (error) {
    next(error)
  } finally {
    if (browser) await browser.close();
  }
};

module.exports = {
  analyze,
};