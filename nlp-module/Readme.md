# 🧠 NLP Module - FastAPI Service

This is the NLP microservice built using **FastAPI**. It provides endpoints for analyzing privacy policies and returns structured results based on multiple metrics such as readability, complexity, and ambiguity.

---

## 📦 Requirements

- Python 3.10+
- `pip` or `poetry` for dependency management

---

## 🚀 Getting Started

### 1. Go to nlp-module directory

```bash
cd nlp-module
```

### 2. Create and activate the virtual environment
```bash
python3 -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
```

### 3. Install dependencies
```bash
pip install -r requirements.txt
```

### 4. Run the application locally
```bash
uvicorn app.main:app --reload
```


## 📦 Dependency Management

This project uses a `requirements.txt` file to manage Python dependencies.

### ✅ Installing dependencies

To install all required dependencies, run:

```bash
pip install -r requirements.txt
```

### How to add new library to the

When you add a new library to the project's virtual environment (e.g., requests, scikit-learn), you must update requirements.txt so that others can install it too.
```bash
pip install <package-name>
pip freeze > requirements.txt
```
This will regenerate requirements.txt with all currently installed packages and their versions in the virtual environment.

### 🚫 Don’t forget:

If you only install a package but don’t update requirements.txt, other teammates (or production environments) won’t know they need that dependency, and the app could break.