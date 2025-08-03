
# 🚀 Fabric QA Code Challenge — Playwright + TypeScript

A robust end-to-end and API test automation framework built using [Playwright](https://playwright.dev/), TypeScript, and best practices for scalability, maintainability, and CI/CD readiness.

---

## ✅ Key Features

- 🧱 Page Object Model (POM) for modular, maintainable UI tests
- 🌐 UI + API Test coverage with Playwright `request` context
- 📊 HTML reports with screenshots, videos, and traces
- 🎯 CI/CD pipeline ready with Jenkins integration
- 🔍 `test.step()` for clean report traces and debugging

---

## 🗂 Project Structure

```
fabric-qa-challenge/
├── pages/
├── tests/
│   ├── ui/
│   └── api/
├── utils/
├── playwright.config.ts
├── tsconfig.json
├── Jenkinsfile
├── README.md
```

---

## ⚙️ Setup Instructions

```bash
  npm install
  npx playwright install
  npx playwright test
  npx playwright show-report
```

---

## 🔁 Retrying Failed Tests

```ts
retries: process.env.CI ? 2 : 1
```

or via CLI:

```bash
  npx playwright test --retries=2
```

---


## 🧰 Jenkins Integration

Use the provided `Jenkinsfile` to run tests in your CI/CD pipeline. Steps include:

1. Install dependencies
2. Run Playwright tests
3. Publish HTML reports

Artifacts include videos, screenshots, and traces.

---

## ✅ Test Coverage Summary

| Feature                             | UI | API |
|-------------------------------------|-----|-----|
| User Registration                   | ✅  |     |
| Login & Global Navigation           | ✅  |     |
| Open Account                        | ✅  |     |
| Bill Payment                        | ✅  |     |
| Fund Transfer                       | ✅  |     |
| Transaction Search by Amount        |     | ✅  |

---

## 👤 Author

Igor Yakub Senior QA Engineer  
Location: Melbourne, Australia
