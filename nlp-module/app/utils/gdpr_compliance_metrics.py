import re
from typing import Dict, List, Tuple


def check_lawful_basis_coverage(text: str) -> float:
    """Check for GDPR Article 6 lawful basis coverage with more flexible patterns"""
    patterns = [
        r'lawful basis|legal basis|basis for processing',
        r'legitimate interest',
        r'consent.*processing|processing.*consent|consent.*data',
        r'contract.*necessary|contractual.*basis|perform.*contract',
        r'vital interest|life.*death|emergency',
        r'public task|official authority|public authority',
        r'legal obligation|comply.*law|required.*law',
        r'article 6|gdpr.*article',
        r'we process.*because|reason.*process|purpose.*collect',
        r'legal.*ground|processing.*ground',
        r'necessary.*provide.*service|essential.*service',
        r'business.*purpose|commercial.*purpose',
        r'why.*collect.*information|why.*use.*data'
    ]
    
    lower_text = text.lower()
    matches = sum(1 for pattern in patterns if re.search(pattern, lower_text))
    return min(matches / 8, 1.0)  # Reduced from len(patterns)


def check_data_subject_rights_coverage(text: str) -> float:
    """Check coverage of GDPR data subject rights with broader detection"""
    rights_patterns = [
        r'right to access|access.*data|request.*copy',
        r'right to rectification|right to correct|update.*information|correct.*data',
        r'right to erasure|right to be forgotten|delete.*data|remove.*information',
        r'right to restrict.*processing|limit.*processing|restrict.*use',
        r'right to data portability|export.*data|download.*data|portable.*format',
        r'right to object|object.*processing|opt.*out.*processing',
        r'data subject rights|your.*rights|privacy.*rights',
        r'manage.*information|control.*data|update.*profile',
        r'delete.*account|close.*account|deactivate',
        r'contact.*us.*privacy|privacy.*request|exercise.*rights',
        r'change.*preferences|privacy.*settings|account.*settings',
        r'withdraw.*consent|revoke.*consent|opt.*out',
        r'access.*personal.*information|view.*information'
    ]
    
    lower_text = text.lower()
    matches = sum(1 for pattern in rights_patterns if re.search(pattern, lower_text))
    # More generous scoring
    return min(matches / 7, 1.0)


def check_consent_mechanism_quality(text: str) -> float:
    """Evaluate quality of consent mechanisms with practical language"""
    quality_indicators = [
        # Legal consent requirements
        r'freely given.*consent|voluntary.*consent',
        r'specific.*consent|explicit.*consent',
        r'informed.*consent|clear.*consent',
        r'unambiguous.*consent|clear.*indication',
        r'withdraw.*consent|revoke.*consent|change.*mind',
        r'opt[- ]out|unsubscribe|stop.*receiving',
        r'easy.*withdraw|simple.*withdraw',
        r'choose.*receive|preference.*center|manage.*communication',
        r'cookie.*settings|cookie.*preferences|manage.*cookies',
        r'marketing.*preferences|email.*preferences',
        r'privacy.*settings|account.*settings|control.*panel',
        r'checkbox|toggle|switch.*off|turn.*off',
        r'granular.*control|individual.*control|separate.*consent'
    ]
    
    lower_text = text.lower()
    matches = sum(1 for pattern in quality_indicators if re.search(pattern, lower_text))
    return min(matches / 8, 1.0)


def check_dpo_information(text: str) -> float:
    """Check for Data Protection Officer information with flexible detection"""
    dpo_patterns = [
        r'data protection officer|dpo\b',
        r'privacy officer|chief privacy officer',
        r'contact.*privacy|privacy.*contact|privacy.*team',
        r'privacy.*question|privacy.*concern|privacy.*inquiry',
        r'privacy@|dpo@|legal@',
        r'data.*protection.*contact|gdpr.*contact',
        r'privacy.*department|legal.*department',
        r'responsible.*data.*protection'
    ]
    
    lower_text = text.lower()
    return 1.0 if any(re.search(pattern, lower_text) for pattern in dpo_patterns) else 0.0


def check_international_transfers(text: str) -> float:
    """Check coverage of international data transfers with practical language"""
    transfer_patterns = [
        r'international.*transfer|cross.*border.*transfer',
        r'transfer.*outside.*eu|transfer.*outside.*eea',
        r'adequacy decision|adequate.*protection',
        r'standard contractual clauses|model.*clauses|scc\b',
        r'binding corporate rules|bcr\b',
        r'appropriate safeguards|adequate.*safeguards',
        r'global.*service|worldwide.*service|international.*service',
        r'server.*location|data.*center|store.*data.*country',
        r'third.*country|outside.*european|non.*eu.*country',
        r'united states|usa|us.*based|american.*company',
        r'privacy.*shield|safe.*harbor',
        r'partner.*country|affiliate.*country|subsidiary.*country',
        r'cloud.*provider|hosting.*provider|service.*provider.*located'
    ]
    
    lower_text = text.lower()
    matches = sum(1 for pattern in transfer_patterns if re.search(pattern, lower_text))
    return min(matches / 2, 1.0)


def check_security_measures(text: str) -> float:
    """Check description of security measures with broader patterns"""
    security_patterns = [
        r'appropriate.*security|adequate.*security',
        r'technical.*measures|organisational.*measures|organizational.*measures',
        r'security.*measures|protective.*measures',
        r'encrypt|encryption|cryptographic',
        r'secure.*processing|process.*securely',
        r'protect.*data|safeguard.*data|data.*protection',
        r'ssl|tls|https|secure.*connection',
        r'firewall|intrusion.*detection|access.*control',
        r'security.*team|security.*department|cybersecurity',
        r'industry.*standard|best.*practice|security.*protocol',
        r'regular.*update|security.*patch|vulnerability',
        r'employee.*training|staff.*training|security.*awareness',
        r'audit|assessment|compliance.*review|security.*review'
    ]
    
    lower_text = text.lower()
    matches = sum(1 for pattern in security_patterns if re.search(pattern, lower_text))
    return min(matches / 8, 1.0)


def check_breach_notification(text: str) -> float:
    """Check breach notification procedures with flexible detection"""
    breach_patterns = [
        r'data breach|security breach|breach.*notification',
        r'breach.*notification|notify.*breach',
        r'72 hours|seventy.*two.*hours',
        r'supervisory authority|data.*protection.*authority',
        r'notify.*breach|report.*breach',
        r'security.*incident|data.*incident',
        r'unauthorized.*access|unlawful.*access',
        r'inform.*affected|notify.*user|alert.*customer',
        r'incident.*response|breach.*response|security.*response',
        r'regulatory.*notification|authority.*notification'
    ]
    
    lower_text = text.lower()
    matches = sum(1 for pattern in breach_patterns if re.search(pattern, lower_text))
    return min(matches / 2, 1.0)


def check_retention_periods(text: str) -> float:
    """Check data retention information with flexible patterns"""
    retention_patterns = [
        r'retention period|retention.*time|how long.*keep',
        r'storage.*period|storage.*time',
        r'delete.*data|remove.*information|erase.*data',
        r'retain.*data|keep.*data|store.*data',
        r'as long as.*necessary|until.*no.*longer.*needed',
        r'specific.*period|certain.*period|defined.*period',
        r'expire|expiration|expiry',
        r'archive|archival|historical.*data',
        r'inactive.*account|dormant.*account|unused.*account',
        r'legal.*requirement.*retain|required.*keep|obligated.*store',
        r'business.*purpose.*require|operational.*need',
        r'automatically.*delete|scheduled.*deletion'
    ]
    
    lower_text = text.lower()
    matches = sum(1 for pattern in retention_patterns if re.search(pattern, lower_text))
    return min(matches / 4, 1.0)


def gdpr_overall_score(text: str) -> float:
    """Calculate overall GDPR compliance score with more balanced weighting"""
    scores = {
        'lawful_basis': check_lawful_basis_coverage(text) * 0.18,
        'data_subject_rights': check_data_subject_rights_coverage(text) * 0.22,
        'consent_mechanism': check_consent_mechanism_quality(text) * 0.15,
        'dpo_information': check_dpo_information(text) * 0.12,
        'international_transfers': check_international_transfers(text) * 0.12,
        'security_measures': check_security_measures(text) * 0.12,
        'breach_notification': check_breach_notification(text) * 0.05,
        'retention_periods': check_retention_periods(text) * 0.09
    }
    
    total_score = sum(scores.values())
    
    lower_text = text.lower()
    if re.search(r'gdpr|general data protection regulation|data protection regulation', lower_text):
        total_score += 0.08
    if re.search(r'european union|eu\b|eea|europe', lower_text):
        total_score += 0.05
    if re.search(r'privacy policy|privacy notice|data policy', lower_text):
        total_score += 0.03
    
    return min(total_score, 1.0)


def gdpr_compliance_percentage(text: str) -> int:
    """Get GDPR compliance as percentage"""
    return round(gdpr_overall_score(text) * 100)


def gdpr_is_compliant(text: str) -> bool:
    """Check if text meets minimum GDPR compliance threshold"""
    return gdpr_compliance_percentage(text) >= 50
