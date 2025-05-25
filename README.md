# 🕵️‍♂️ Privacy Policy Analyzer

This is a modular application that analyzes privacy policy documents and provides insights into readability, complexity, compliance issues, and more. The project consists of three separate services:

- 🎯 **Frontend**: A user-friendly web interface built with Next.js
- 🧠 **NLP Module**: A FastAPI-based service that analyzes text using NLP metrics
- 🔧 **Backend**: A Node.js Express API that handles file uploads and manages parsing

---

## 📂 Project Structure
privacy-policy-analyzer/ 

frontend/ - Next.js web app

backend/ - Express.js API 

nlp-module/ - FastAPI NLP service

README.md 

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/bobanboshevski/privacy-policy-analyzer.git
cd privacy-policy-analyzer
```
### 2. ⚙️ Set up each module

Each module has its own setup and environment. You must follow the steps described in the README file inside each subfolder:
* frontend/README.md
* backend/README.md
* nlp-module/README.md

Make sure you have installed the required tools for each part (Node.js, Python 3, pip, etc.) before proceeding.

---

### 📚 Documentation

#### Each module includes:
* Installation instructions
* Local development commands
* How to install and manage dependencies
* API or CLI usage (where applicable)

---

### Development Notes

* You can run each service independently for development purposes (run each service in its own terminal)
* Make sure ports do not conflict (default: Frontend on 3000, Backend on 3001, NLP on 8000)
* The backend use REST API calls to interact with the NLP service
* Keep .env files for secrets (if needed) and never commit them to GitHub
* Ensure the NLP service is running before testing full document analysis from the frontend

---

## 🛠️ Contribution & Issues

#### Pull requests and issue reports are welcome! Please ensure your code follows the structure and style of the respective modules.

---