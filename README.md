# Groupon Playwright Automation (Proof of Concept)

## 1. Introduction

This repository is a **proof of concept (PoC)** for automated testing of the **Groupon main page** using **Playwright** with **TypeScript**. The purpose of this PoC is to demonstrate the feasibility of automating Groupon's core functionalities and exploring Playwright's capabilities for browser automation. The project covers essential interactions, such as navigating the main page, interacting with various components, and validating page elements. Due to the nature of the production environment, the focus is on reliable, low-flakiness scenarios.

---

## 2. Setup

To get started with running the Playwright tests in this repository, follow the steps below:

### Prerequisites

- **Node.js** version **18 or higher** (required by the `engines` field in `package.json`). You can download Node.js [here](https://nodejs.org/).
- **npm** (comes bundled with Node.js).
- **Playwright** installed globally or via `npm`.

### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/workitponiedzialek/groupon-tests.git
   cd groupon-tests
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Install Playwright Browsers**
   ```bash
   npx playwright install
   ```

### Running the Tests

Most likely due to anti-bot protections on Groupon's production site, tests **only work in `--headed` mode**. This mode runs tests with the browser UI visible, which helps bypass some detection mechanisms.

Run tests with the following command:

```bash
npx playwright test --headed
```

The `--headed` option ensures the browser is launched with its UI, reducing the likelihood of being blocked by anti-bot measures.

#### Running a Specific Test by Line Number

You can run a specific test by pointing to a file and line number using the following command:

```bash
npx playwright test scenarios/homePage.spec.ts:15 --headed
```

This will execute the test located at **line 15** in the `homePage.spec.ts` file.

#### Running Tests with Report and Screenshots

To generate a report and capture **screenshots on failure**, use the following command:

```bash
npx playwright test --headed --reporter=html
```

- **Screenshots** will be automatically taken on test failures and included in the report.
- The **HTML report** will be generated in the `playwright-report` directory. You can open it by running:

  ```bash
  npx playwright show-report
  ```

---

## 3. Structure

The repository follows a structured design to separate different responsibilities, making the code easier to maintain and extend. Here's an overview of the folder structure:

```
.
├── scenarios/
├── pages/
└── region/
```

### 1. `scenarios`

- **Purpose**: Contains test files that define various test scenarios.
- **Description**: Each file in this folder represents a test case or a suite of related tests. These scenarios describe the steps to interact with the Groupon website and include assertions to verify expected behavior.

  **Example**: `main-page.spec.ts` contains tests related to interactions with the Groupon home page.

### 2. `region`

- **Purpose**: Contains reusable components and locators that can be shared across different pages.
- **Description**: This folder includes modular files that encapsulate locators and actions for specific components used in multiple pages, such as headers, footers, and buttons.

  **Example**: `header-region.ts` defines interactions for the site header, including navigation elements.

### 3. `pages`

- **Purpose**: Contains page objects representing different pages of the Groupon web application.
- **Description**: Each file in this folder maps to a specific page on the website and encapsulates locators and actions for that page. This abstraction allows tests to interact with pages through high-level methods, promoting cleaner and more readable code.

  **Example**: `main-page.ts` defines locators and methods for interacting with the Groupon main page.

---

## 4. Limitations

This proof of concept has a few known limitations due to the nature of automating a live production site with possible anti-bot protections:

1. **Login Automation**:
   - Automating the login scenario was not possible because of the **CAPTCHA** protection present on the login page. This would require advanced techniques or manual intervention to bypass.

2. **Scenario Selection**:
   - Current test scenarios were chosen to minimize **flakiness**. Since the tests run on the **production environment** (which can change frequently), tests were designed to avoid dependencies on specific database entries or deals that might change or expire.

3. **Headless Mode**:
   - Tests do not run successfully in **headless mode** most likely due to Groupon's anti-bot mechanisms. Headless browsers are likely detected and blocked. Further research and implementation of techniques (e.g., using proxy servers, altering browser fingerprints) would be needed to make headless mode functional.

---
