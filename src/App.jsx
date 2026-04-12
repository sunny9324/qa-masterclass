import React, { useState, useEffect } from 'react';
import { 
  Menu, X, BookOpen, Code2, PlayCircle, CheckCircle2, 
  HelpCircle, MonitorPlay, Check, Copy, ChevronRight, 
  Briefcase, ArrowRight, Lightbulb, UserCheck, Folder, 
  FileCode2, FileJson, Terminal, Info, LayoutTemplate,
  Sun, Moon, Layers, ChevronDown, ChevronUp
} from 'lucide-react';

// --- DATA STRUCTURE FOR LESSONS ---
const LESSONS = [
  {
    id: 1,
    title: "Lesson 1: What is Test Automation (Foundation)",
    concept: "Understanding the role of automation and writing your first script.",
    analogy: "Think of manual testing like a Woolworths store manager physically walking down the aisles every morning to check if milk is in stock, the price is correct, and the barcode scans properly. It's exhausting and prone to human error. Test automation is like deploying a programmed robot that instantly scans the entire supermarket at 6 AM every day and emails you a report if anything is out of place.",
    flow: [
      "Open Web Browser",
      "Navigate to the Coles Homepage",
      "Verify the webpage title says 'Coles'",
      "Close the Browser"
    ],
    playwright: [
      {
        file: "tests/foundation.spec.ts",
        code: `import { test, expect } from '@playwright/test';

// 1. Define the test case
test('Verify Coles Homepage loads correctly', async ({ page }) => {
    
    // 2. Navigate to the URL
    await page.goto('https://www.coles.com.au');
    
    // 3. Validate the page title (Assertion)
    await expect(page).toHaveTitle(/Coles/);
    
    // Playwright automatically closes the browser at the end of the test block.
});`
      }
    ],
    selenium: [
      {
        file: "src/test/java/tests/FoundationTest.java",
        code: `package tests;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;

public class FoundationTest {
    public static void main(String[] args) {
        
        // 1. Initialize the WebDriver (Opens browser)
        WebDriver driver = new ChromeDriver();
        
        try {
            // 2. Navigate to the URL
            driver.get("https://www.coles.com.au");
            
            // 3. Validate the page title (Assertion)
            String actualTitle = driver.getTitle();
            Assert.assertTrue(actualTitle.contains("Coles"), "Title does not match!");
            
        } finally {
            // 4. Manually close the browser (CRITICAL in Selenium)
            driver.quit();
        }
    }
}`
      }
    ],
    executionGuide: {
      playwright: [
        "Save the code in your 'tests' folder as 'foundation.spec.ts'.",
        "Run the test using: npx playwright test tests/foundation.spec.ts --headed"
      ],
      selenium: [
        "Save the code in your 'src/test/java/tests' package as 'FoundationTest.java'.",
        "Run the main method from your IDE."
      ]
    },
    differences: [
      { feature: "Browser Management", playwright: "Automatic (Injects 'page' fixture)", selenium: "Manual (Must instantiate WebDriver)" },
      { feature: "Teardown", playwright: "Closes automatically after test block", selenium: "Requires explicit driver.quit() in a finally block" },
      { feature: "Speed", playwright: "Communicates directly via WebSocket (Faster)", selenium: "Communicates via WebDriver HTTP API (Slower)" }
    ],
    interviewInsights: {
      playwright: [
        { q: "What is Playwright?", a: "Playwright is an open-source Node.js library developed by Microsoft for browser automation. It supports Chromium, WebKit, and Firefox with a single API." },
        { q: "How does Playwright communicate with the browser?", a: "It uses a direct WebSocket connection, bypassing the HTTP middleware layer, resulting in faster execution and native access to browser events." },
        { q: "What languages does Playwright support?", a: "TypeScript, JavaScript, Python, .NET, and Java." },
        { q: "What is the 'page' fixture?", a: "An isolated browser tab automatically provided to each test, ensuring tests run independently without sharing state." },
        { q: "Does Playwright support mobile testing?", a: "It supports mobile device emulation natively within Chromium and WebKit, but it does not run on actual physical mobile devices (unlike Appium)." }
      ],
      selenium: [
        { q: "What is Selenium WebDriver?", a: "An open-source automation tool that provides a set of APIs to interact with browsers natively, simulating user actions." },
        { q: "Explain the Selenium Architecture.", a: "Language Bindings -> JSON Wire Protocol (W3C standard) -> Browser Driver (e.g., ChromeDriver) -> Real Browser." },
        { q: "What is the purpose of driver.quit()?", a: "It securely closes all browser windows opened by the WebDriver and ends the background driver process, preventing memory leaks." },
        { q: "What is the difference between driver.close() and driver.quit()?", a: "close() shuts down the current active browser tab/window. quit() terminates the entire WebDriver session and closes all associated windows." },
        { q: "Is Selenium a testing framework?", a: "No, it is purely a browser automation library. It must be paired with a testing framework like TestNG or JUnit to handle assertions and test execution." }
      ],
      comparison: [
        { q: "Why might a company migrate from Selenium to Playwright?", a: "To reduce test flakiness via auto-waiting, increase execution speed, and gain out-of-the-box features like network interception and trace viewing." },
        { q: "When is Selenium a better choice than Playwright?", a: "When testing legacy browsers (IE11), older operating systems, or when the team strictly requires a language or tool deeply integrated into the older Selenium ecosystem." },
        { q: "Compare community support.", a: "Selenium has been around for over a decade, meaning almost every edge case is documented on StackOverflow. Playwright is newer but has massive momentum and official backing from Microsoft." },
        { q: "How do the tools handle multiple tabs?", a: "Playwright natively supports multiple BrowserContexts (isolated sessions). Selenium handles it via switching Window Handles, which shares the same underlying browser session." },
        { q: "Which tool requires more configuration?", a: "Selenium requires downloading drivers (historically) and configuring third-party reporters. Playwright is a zero-config, 'batteries included' framework." }
      ]
    },
    practiceTask: "Write a foundation script in both frameworks that opens the Woolworths homepage and verifies the URL contains 'woolworths.com.au'."
  },
  {
    id: 2,
    title: "Lesson 2: Framework Setup & Project Structure",
    concept: "Installing dependencies and organizing files for enterprise automation.",
    analogy: "Before Woolworths can stock groceries, they must build the physical store. They need designated aisles for produce, a secure backroom for the manager, and checkout lanes for customers. In automation, 'Setup' is building the store (installing tools), and 'Project Structure' is the floor plan (where we put our locators, tests, and reports so engineers don't get lost).",
    setup: {
      playwright: {
        title: "🟦 Playwright (TypeScript) Setup — Step by Step",
        steps: [
          { cmd: "npm init playwright@latest", desc: "Run this in your terminal. It creates the project folder automatically." },
          { cmd: "TypeScript", desc: "Select 'TypeScript' when the installer asks." },
          { cmd: "tests", desc: "Select 'tests' as your End-to-End testing folder." },
          { cmd: "true", desc: "Add a GitHub Actions workflow? (Optional, say yes/no)." },
          { cmd: "true", desc: "Install Playwright browsers? (Say YES! It downloads Chrome, Firefox, Safari automatically)." }
        ],
        folderStructure: [
          { name: "node_modules/", type: "folder", depth: 0 },
          { name: "pages/", type: "folder", depth: 0, highlight: true },
          { name: "HomePage.ts", type: "file", depth: 1, highlight: true },
          { name: "tests/", type: "folder", depth: 0, highlight: true },
          { name: "searchProduct.spec.ts", type: "file", depth: 1, highlight: true },
          { name: "playwright.config.ts", type: "config", depth: 0 },
          { name: "package.json", type: "config", depth: 0 }
        ]
      },
      selenium: {
        title: "🟨 Selenium (Java) Setup — Step by Step",
        steps: [
          { cmd: "Install JDK 11+", desc: "Ensure Java is installed on your computer." },
          { cmd: "Create Maven Project", desc: "Open IntelliJ/Eclipse and create a new 'Maven' project." },
          { cmd: "Open pom.xml", desc: "This is your configuration file where you add dependencies." },
          { cmd: "<dependency>", desc: "Add 'selenium-java' inside the <dependencies> tag in pom.xml." },
          { cmd: "Reload Maven", desc: "Click 'Reload Maven Changes' in your IDE to download Selenium." }
        ],
        folderStructure: [
          { name: ".idea/", type: "folder", depth: 0 },
          { name: "src/", type: "folder", depth: 0 },
          { name: "main/java/pages/", type: "folder", depth: 1, highlight: true },
          { name: "HomePage.java", type: "file", depth: 2, highlight: true },
          { name: "test/java/tests/", type: "folder", depth: 1, highlight: true },
          { name: "SearchTest.java", type: "file", depth: 2, highlight: true },
          { name: "pom.xml", type: "config", depth: 0, highlight: true }
        ]
      }
    },
    interviewInsights: {
      playwright: [
        { q: "What is package.json used for?", a: "It tracks all the Node.js dependencies, scripts, and metadata for the Playwright project." },
        { q: "What is playwright.config.ts?", a: "The global configuration file where you set the base URL, timeouts, retries, reporters, and the browsers you want to test against." },
        { q: "Do you need to download ChromeDriver manually in Playwright?", a: "No. Playwright automatically downloads and manages its own isolated browser binaries to ensure version compatibility." },
        { q: "What is the 'tests' folder for?", a: "It is the default directory where Playwright looks for files ending in '.spec.ts' or '.test.ts' to execute as test suites." },
        { q: "How do you update Playwright to the latest version?", a: "By running `npm install -D @playwright/test@latest` followed by `npx playwright install`." }
      ],
      selenium: [
        { q: "What is a pom.xml file?", a: "The Project Object Model file used by Maven to manage project dependencies, plugins, and build lifecycle in Java." },
        { q: "What dependencies are minimally required for a Selenium framework?", a: "selenium-java (for browser interaction), testng/junit (for assertions/execution), and webdrivermanager (historically, though Selenium 4.6+ manages drivers natively)." },
        { q: "What is the difference between src/main/java and src/test/java?", a: "src/main/java contains the framework logic, utilities, and Page Objects. src/test/java strictly contains the executable test scripts." },
        { q: "How does Selenium 4+ handle browser drivers?", a: "It introduced Selenium Manager, which automatically detects the installed browser version and downloads the matching driver, eliminating the need to manually set `System.setProperty`." },
        { q: "What is Maven?", a: "A build automation tool primarily used for Java projects to manage dependencies and standardize the build process." }
      ],
      comparison: [
        { q: "Compare the setup speed of both tools.", a: "Playwright is 'zero-config'—a single terminal command sets up the entire architecture. Selenium requires manual IDE setup, JDK installation, Maven configuration, and creating the folder structure." },
        { q: "How do both tools manage external libraries?", a: "Playwright uses npm (Node Package Manager) via package.json. Selenium typically uses Maven or Gradle via pom.xml or build.gradle." },
        { q: "Which tool requires more boilerplate configuration?", a: "Selenium. To get reporting, parallel execution, and assertions working, you must integrate multiple third-party libraries. Playwright includes all of these out of the box." },
        { q: "Compare Cross-Browser setup.", a: "In Selenium, you must instantiate different drivers (`new FirefoxDriver()`). In Playwright, you define 'projects' in the config file and it automatically runs tests across Chromium, WebKit, and Firefox." },
        { q: "How are tests triggered in CI/CD?", a: "Playwright is triggered via `npm run test` (or npx). Selenium is triggered via Maven `mvn test`." }
      ]
    }
  },
  {
    id: 3,
    title: "Lesson 3: Locators (Deep Dive)",
    concept: "How to reliably find web elements on a page using IDs, CSS Selectors, XPath, and Text.",
    analogy: "Finding an element on a webpage is exactly like finding an item in Coles. \n\n• ID Locator: Like scanning a unique barcode. It's the most reliable and fastest way to find a product.\n• CSS Selector: Like giving exact coordinates ('Aisle 4, Shelf 2'). Fast, but if the store rearranges the shelves, your code breaks.\n• XPath: Like giving turn-by-turn directions ('Walk in, take the 2nd left, look at the middle fridge'). Powerful, but highly fragile.\n• Text Locator: Like looking for a sign that says 'Fresh Milk'. Easy to read, but you might accidentally find 'Fresh Milk Alternatives' instead!",
    dependentConcepts: [
      {
        title: "1. ID & Name Locators (The Barcode)",
        desc: "The most robust way to find an element. IDs should be unique on the page.",
        playwright: `// Playwright uses standard CSS syntax for IDs (#)\nconst user = page.locator('#username');\n// Or using modern roles (Preferred)\nconst user = page.getByRole('textbox', { name: 'username' });`,
        selenium: `// Selenium has dedicated 'By' methods for IDs and Names\nWebElement user = driver.findElement(By.id("username"));\nWebElement pass = driver.findElement(By.name("password"));`
      },
      {
        title: "2. CSS Selectors (The Coordinates)",
        desc: "Targets elements based on their styling classes or HTML attributes.",
        playwright: `// Targeting a button with class 'login-btn'\nconst loginBtn = page.locator('.login-btn');\n// Targeting an attribute\nconst email = page.locator('input[type="email"]');`,
        selenium: `// Selenium uses By.cssSelector()\nWebElement loginBtn = driver.findElement(By.cssSelector(".login-btn"));\nWebElement email = driver.findElement(By.cssSelector("input[type='email']"));`
      },
      {
        title: "3. Text Locators (The Signpost)",
        desc: "Finds an element strictly by the visible text shown to the user.",
        playwright: `// Playwright has a powerful built-in text locator\nconst btn = page.getByText('Log In');\nconst exactBtn = page.getByText('Log In', { exact: true });`,
        selenium: `// Selenium requires using XPath or LinkText for text matching\nWebElement btn = driver.findElement(By.xpath("//*[text()='Log In']"));\nWebElement link = driver.findElement(By.linkText("Forgot Password"));`
      },
      {
        title: "4. XPath Locators (The Turn-by-Turn Map)",
        desc: "Navigates the XML structure of the HTML DOM. Very powerful but slower and prone to breaking.",
        playwright: `// Playwright supports XPath natively in the locator method\nconst price = page.locator('//div[@id="cart"]/span[2]');`,
        selenium: `// Selenium uses By.xpath()\nWebElement price = driver.findElement(By.xpath("//div[@id='cart']/span[2]"));`
      }
    ],
    playwright: [
      {
        file: "tests/locators.spec.ts",
        code: `import { test, expect } from '@playwright/test';

test('Coles Search using various locators', async ({ page }) => {
    await page.goto('https://www.coles.com.au');
    
    // 1. ID Locator (Best Practice)
    await page.locator('#searchTerm').fill('Bread');
    
    // 2. CSS Attribute Selector
    await page.locator('button[data-testid="search-button"]').click();
    
    // 3. User-Facing Role Locator (Playwright specific & preferred)
    await page.getByRole('button', { name: 'Add to cart' }).first().click();
    
    // 4. XPath Locator (Fragile, use as last resort)
    const priceText = await page.locator('//span[@class="price"]').first().textContent();
});`
      }
    ],
    selenium: [
      {
        file: "src/test/java/tests/LocatorsTest.java",
        code: `package tests;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class LocatorsTest {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        try {
            driver.get("https://www.coles.com.au");
            
            // 1. ID Locator (Best Practice)
            driver.findElement(By.id("searchTerm")).sendKeys("Bread");
            
            // 2. CSS Attribute Selector
            driver.findElement(By.cssSelector("button[data-testid='search-button']")).click();
            
            // 3. Text using XPath
            driver.findElement(By.xpath("//button[text()='Add to cart']")).click();
            
            // 4. XPath Locator (Fragile, use as last resort)
            String priceText = driver.findElement(By.xpath("//span[@class='price']")).getText();
            
        } finally {
            driver.quit();
        }
    }
}`
      }
    ],
    differences: [
      { feature: "Text Locators", playwright: "Native (page.getByText)", selenium: "Requires XPath (//button[text()='Login'])" },
      { feature: "Multiple Elements", playwright: "locator('.item').nth(0)", selenium: "driver.findElements(By.className).get(0)" },
      { feature: "Strictness", playwright: "Fails if locator finds >1 element (Strict mode)", selenium: "Silently interacts with the first one it finds" }
    ],
    interviewInsights: {
      playwright: [
        { q: "What is 'Locator Strictness' in Playwright?", a: "By default, Playwright locators are strict. If a locator matches multiple elements on the DOM (e.g., two 'Submit' buttons), Playwright will throw an error rather than silently clicking the wrong one. You must make the locator more specific or use `.first()` or `.nth()`." },
        { q: "Why does Playwright recommend user-facing locators (getByRole, getByText)?", a: "Playwright encourages testing the application the way a real user interacts with it. A user doesn't look for an element with `id='btn-submit'`; they look for a Button that says 'Submit'. Using `getByRole('button', { name: 'Submit' })` ensures the button is actually accessible to screen readers too." },
        { q: "How do you handle elements inside an iframe in Playwright?", a: "Playwright can seamlessly pierce iframes using the `frameLocator()` method. Example: `page.frameLocator('#payment-frame').locator('#card-number').fill('1234');`" },
        { q: "What is the difference between `page.locator()` and `page.$()`?", a: "`page.$()` is an older, legacy method that resolves to an ElementHandle immediately (no auto-waiting, prone to staleness). `page.locator()` is the modern approach: it creates a recipe/query that resolves lazily and auto-waits right before an action is performed." },
        { q: "How do you chain locators in Playwright?", a: "You can chain locators to narrow down the search area. For example, to find a specific product inside a specific row: `page.locator('.row').filter({ hasText: 'Milk' }).locator('.add-to-cart-btn').click();`." }
      ],
      selenium: [
        { q: "What is a NoSuchElementException?", a: "It is thrown when Selenium WebDriver cannot find an element in the DOM using the provided locator strategy at the exact moment the command is executed (usually because the locator is wrong, or the element hasn't loaded yet)." },
        { q: "Which locator strategy is the fastest in Selenium?", a: "`By.id()` is generally the fastest because it directly calls the browser's native `document.getElementById()` function, which is highly optimized. XPath is historically the slowest as it parses the entire XML structure." },
        { q: "What is the difference between `findElement` and `findElements`?", a: "`findElement` returns a single `WebElement` (the first one that matches) and throws an exception if none are found. `findElements` returns a `List<WebElement>` and returns an empty list (size 0) if none are found, without throwing an error." },
        { q: "What is the difference between Absolute and Relative XPath?", a: "Absolute XPath (`/html/body/div[1]/form/input`) starts from the root HTML node and is extremely fragile. Relative XPath (`//form[@id='login']/input`) starts searching anywhere in the document using double slashes `//` and is much more resilient to UI changes." },
        { q: "What is a StaleElementReferenceException?", a: "This occurs when an element you previously located is no longer attached to the DOM (e.g., the page refreshed via AJAX). To fix it, you must re-instantiate the locator: `driver.findElement(By.id('username'))` before interacting with it again." }
      ],
      comparison: [
        { q: "How do Playwright and Selenium handle Shadow DOM locators?", a: "Playwright handles open Shadow DOM natively; standard CSS and text locators will pierce the shadow boundary automatically. In Selenium, you traditionally have to write complex JavaScript executors to pierce the Shadow Root, though recent versions have added better `getShadowRoot()` support." },
        { q: "Compare how both tools handle dynamic attributes (like changing IDs).", a: "In Selenium, you rely heavily on XPath functions like `contains(@id, 'user_')` or CSS `[id^='user_']`. Playwright can use these same CSS/XPath tricks, but often bypasses the issue entirely by using `getByRole` or `getByText`." },
        { q: "How do both tools wait for a locator to appear?", a: "Playwright locators have built-in actionability checks; `locator.click()` will automatically poll the DOM until the element is visible, enabled, and stable. Selenium requires explicit `WebDriverWait` wrapper code before attempting to interact." },
        { q: "What happens if a locator matches multiple elements?", a: "Selenium silently chooses the first matching element it encounters in the DOM, which can lead to false positives in testing. Playwright throws a 'Strict Mode' violation error, forcing the engineer to write better, more specific locators." },
        { q: "Compare text-based locating capabilities.", a: "Selenium strictly relies on XPath (e.g., `//*[text()='Login']`) or `linkText` (only for `<a>` tags). Playwright has native, powerful text engines like `getByText('Login')`, which can match substrings, ignore case, and use Regular Expressions." }
      ]
    },
    practiceTask: "Open Woolworths and try to locate the main 'Cart' icon using 3 different strategies (ID/CSS, XPath, and Role/Text)."
  },
  {
    id: 4,
    title: "Lesson 4: Actions (Click, Type, Hover, Keyboard)",
    concept: "Simulating physical user interactions with the webpage.",
    analogy: "Interacting with a webpage is exactly like physically shopping in-store. 'Typing' is like writing down your shopping list. 'Clicking' is pressing the green button on the EFTPOS machine. 'Hovering' is picking up a product to closely read the nutrition label before deciding to buy it. 'Keyboard Actions' (like pressing Enter) are like the cashier scanning a barcode—fast, direct, and bypassing the need to manually click a button.",
    flow: [
      "Navigate to Coles Homepage",
      "Hover over the 'Dairy' navigation menu",
      "Click the 'Milk' category",
      "Type '2 Litre' into the search filter",
      "Press the 'Enter' key on the keyboard to submit"
    ],
    dependentConcepts: [
      {
        title: "1. Clicking & Double Clicking",
        desc: "The most common action. Triggers buttons, links, and checkboxes.",
        playwright: `// Standard click (Auto-waits for actionability)\nawait page.locator('#checkout-btn').click();\n// Double click\nawait page.locator('.item').dblclick();`,
        selenium: `// Standard click\ndriver.findElement(By.id("checkout-btn")).click();\n// Double click requires the Actions class\nActions actions = new Actions(driver);\nactions.doubleClick(element).perform();`
      },
      {
        title: "2. Typing & Clearing Text",
        desc: "Entering data into input fields or text areas.",
        playwright: `// Fill clears the field first, then types\nawait page.locator('#search').fill('Bread');\n// Type simulates individual keystrokes (slower)\nawait page.locator('#search').pressSequentially('Bread');`,
        selenium: `// clear() must be called explicitly before sendKeys\nWebElement search = driver.findElement(By.id("search"));\nsearch.clear();\nsearch.sendKeys("Bread");`
      },
      {
        title: "3. Hovering (Mouse Over)",
        desc: "Moving the mouse over an element to trigger dropdowns or tooltips.",
        playwright: `// Built-in hover method\nawait page.locator('.nav-dairy').hover();`,
        selenium: `// Requires the Actions class\nActions actions = new Actions(driver);\nactions.moveToElement(driver.findElement(By.className("nav-dairy"))).perform();`
      },
      {
        title: "4. Keyboard Actions",
        desc: "Simulating physical keyboard presses like Enter, Tab, or Escape.",
        playwright: `// Pressing a single key\nawait page.locator('#search').press('Enter');\n// Pressing a combination\nawait page.keyboard.press('Control+A');`,
        selenium: `// Passing Keys enum to sendKeys\ndriver.findElement(By.id("search")).sendKeys(Keys.ENTER);\n// Or using Actions class\nactions.sendKeys(Keys.ESCAPE).perform();`
      }
    ],
    pomAnalogy: "Grouping actions in POM is like training a Woolworths personal shopper. Instead of telling them 'move your hand 5 inches forward, extend index finger, and push down on the red EFTPOS button', you just say 'Pay for the groceries' (the POM method). The complex physical movements (locators and clicks) are abstracted away inside the Page Class.",
    playwright: [
      {
        file: "pages/NavigationPage.ts",
        code: `import { Page, Locator } from '@playwright/test';

export class NavigationPage {
    readonly page: Page;
    readonly dairyMenu: Locator;
    readonly milkSubCategory: Locator;
    readonly searchFilter: Locator;

    constructor(page: Page) {
        this.page = page;
        this.dairyMenu = page.locator('#nav-dairy');
        this.milkSubCategory = page.getByText('Fresh Milk');
        this.searchFilter = page.locator('input[placeholder="Filter by keyword"]');
    }

    async navigateToMilkCategory() {
        // 1. Hover Action
        await this.dairyMenu.hover();
        // 2. Click Action
        await this.milkSubCategory.click();
    }

    async filterProducts(keyword: string) {
        // 3. Type Action (Fill clears existing text)
        await this.searchFilter.fill(keyword);
        // 4. Keyboard Action
        await this.searchFilter.press('Enter');
    }
}`
      },
      {
        file: "tests/shoppingActions.spec.ts",
        code: `import { test } from '@playwright/test';
import { NavigationPage } from '../pages/NavigationPage';

test('Advanced User Actions on Coles', async ({ page }) => {
    const navPage = new NavigationPage(page);
    await page.goto('https://www.coles.com.au');
    
    // Complex mouse and keyboard interactions hidden behind clean methods
    await navPage.navigateToMilkCategory();
    await navPage.filterProducts('2 Litre');
});`
      }
    ],
    selenium: [
      {
        file: "src/main/java/pages/NavigationPage.java",
        code: `package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.interactions.Actions;

public class NavigationPage {
    WebDriver driver;
    Actions actions;
    
    By dairyMenu = By.id("nav-dairy");
    By milkSubCategory = By.xpath("//*[text()='Fresh Milk']");
    By searchFilter = By.cssSelector("input[placeholder='Filter by keyword']");

    public NavigationPage(WebDriver driver) {
        this.driver = driver;
        this.actions = new Actions(driver); // Required for Hover
    }

    public void navigateToMilkCategory() {
        // 1. Hover Action
        actions.moveToElement(driver.findElement(dairyMenu)).perform();
        // 2. Click Action
        driver.findElement(milkSubCategory).click();
    }

    public void filterProducts(String keyword) {
        // 3. Type Action & 4. Keyboard Action
        driver.findElement(searchFilter).clear();
        driver.findElement(searchFilter).sendKeys(keyword);
        driver.findElement(searchFilter).sendKeys(Keys.ENTER);
    }
}`
      },
      {
        file: "src/test/java/tests/ShoppingActionsTest.java",
        code: `package tests;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import pages.NavigationPage;

public class ShoppingActionsTest {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        try {
            NavigationPage navPage = new NavigationPage(driver);
            driver.get("https://www.coles.com.au");
            
            // Complex mouse and keyboard interactions hidden behind clean methods
            navPage.navigateToMilkCategory();
            navPage.filterProducts("2 Litre");
        } finally {
            driver.quit();
        }
    }
}`
      }
    ],
    executionGuide: {
      playwright: [
        "Create 'NavigationPage.ts' inside your 'pages' folder.",
        "Create 'shoppingActions.spec.ts' inside your 'tests' folder.",
        "Run the test using: npx playwright test tests/shoppingActions.spec.ts --headed"
      ],
      selenium: [
        "Create 'NavigationPage.java' inside your 'src/main/java/pages' package.",
        "Create 'ShoppingActionsTest.java' inside your 'src/test/java/tests' package.",
        "Run the main method inside 'ShoppingActionsTest.java'."
      ]
    },
    playwrightNoPom: {
      file: "tests/shoppingActionsRaw.spec.ts",
      code: `import { test } from '@playwright/test';

test('Coles Actions (No POM)', async ({ page }) => {
    await page.goto('https://www.coles.com.au');

    // Tangled locators and actions
    await page.locator('#nav-dairy').hover();
    await page.getByText('Fresh Milk').click();
    
    await page.locator('input[placeholder="Filter by keyword"]').fill('2 Litre');
    await page.locator('input[placeholder="Filter by keyword"]').press('Enter');
});`
    },
    seleniumNoPom: {
      file: "src/test/java/tests/ShoppingActionsTestRaw.java",
      code: `package tests;

import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.interactions.Actions;

public class ShoppingActionsTestRaw {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        try {
            driver.get("https://www.coles.com.au");
            Actions actions = new Actions(driver);

            // Tangled locators, actions, and verbose setup
            actions.moveToElement(driver.findElement(By.id("nav-dairy"))).perform();
            driver.findElement(By.xpath("//*[text()='Fresh Milk']")).click();
            
            driver.findElement(By.cssSelector("input[placeholder='Filter']")).clear();
            driver.findElement(By.cssSelector("input[placeholder='Filter']")).sendKeys("2 Litre");
            driver.findElement(By.cssSelector("input[placeholder='Filter']")).sendKeys(Keys.ENTER);

        } finally {
            driver.quit();
        }
    }
}`
    },
    pomBenefitsSummary: [
      { title: "1. Abstracting Verbose APIs", desc: "In Selenium, hovering requires instantiating the `Actions` class and calling `.perform()`. By wrapping this in a POM method, test writers never have to remember how to use the complex Actions API—they just call `navPage.navigateToMilkCategory()`." },
      { title: "2. Composing Workflows", desc: "Typing a search and pressing Enter are two distinct physical actions. In the No POM script, we write them out step-by-step. In POM, we compose them into a single logical workflow: `filterProducts()`, reducing code clutter." },
      { title: "3. Behavior Consistency", desc: "If the application requires you to clear a field before typing (common in React apps), you write the `clear()` logic exactly once in the POM. All tests using that POM method will automatically exhibit the correct behavior." }
    ],
    differences: [
      { feature: "Hovering", playwright: "Native method: `locator.hover()`", selenium: "Requires `Actions` class: `actions.moveToElement().perform()`" },
      { feature: "Typing behavior", playwright: "`fill()` clears existing text automatically.", selenium: "`sendKeys()` appends text; `clear()` must be called explicitly." },
      { feature: "Click Interception", playwright: "Waits if element is covered, or use `{ force: true }`.", selenium: "Throws `ElementClickInterceptedException`, requiring JavaScript click fallback." }
    ],
    interviewInsights: {
      playwright: [
        { q: "What does `{ force: true }` do in Playwright?", a: "It bypasses Playwright's actionability checks. If an element is covered by another element (like a sticky header) or is slightly off-screen, a normal click will fail/wait. Force clicking tells Playwright to dispatch the click event regardless." },
        { q: "What is the difference between `fill()` and `pressSequentially()`?", a: "`fill()` is optimized: it instantly clears the field and sets the value. `pressSequentially()` simulates pressing real keys one by one with optional delays (e.g., `delay: 100`), which is useful for triggering complex auto-complete dropdowns." },
        { q: "How do you perform a drag-and-drop action in Playwright?", a: "Playwright has a native method: `await page.locator('#item').dragTo(page.locator('#dropzone'));`. It handles the mouse down, move, and up events automatically." },
        { q: "How does Playwright handle scrolling?", a: "Playwright automatically scrolls elements into view before interacting with them. If you need to manually scroll, you can use `await locator.scrollIntoViewIfNeeded()` or evaluate JavaScript." },
        { q: "Can you simulate keyboard shortcuts?", a: "Yes, using `page.keyboard.press()`. For example, `page.keyboard.press('Control+Shift+T')` will simulate that exact chord combination." }
      ],
      selenium: [
        { q: "What is an ElementClickInterceptedException?", a: "It occurs when you command Selenium to click an element, but another element (like a floating modal, a loading spinner, or a sticky header) is physically covering the target element at the (x,y) coordinates." },
        { q: "How do you bypass an ElementClickInterceptedException?", a: "The best way is to wait for the covering element to disappear. If that fails, you can bypass the UI entirely using a JavascriptExecutor: `((JavascriptExecutor)driver).executeScript(\"arguments[0].click();\", element);`." },
        { q: "What is the Actions class in Selenium?", a: "A built-in class used for complex user interactions that standard WebElements cannot perform, such as Hovering (`moveToElement`), Drag and Drop, and Double Clicking. Always remember to call `.perform()` at the end." },
        { q: "How do you simulate pressing the 'Tab' key?", a: "You pass the `Keys.TAB` enum to the `sendKeys` method of the current element: `driver.findElement(By.id(\"email\")).sendKeys(Keys.TAB);`" },
        { q: "Why might `element.clear()` not work in modern React/Angular apps?", a: "Modern JS frameworks track state based on keyboard events. `clear()` just empties the DOM value without firing key events. You often have to simulate `Ctrl+A` and `Delete` via the Actions class instead." }
      ],
      comparison: [
        { q: "Compare how both tools handle Hover actions.", a: "Playwright has a simple, native `locator.hover()` method. Selenium requires instantiating the `Actions` class, chaining `moveToElement`, and explicitly calling `.perform()`, making it much more verbose." },
        { q: "If an element is hidden via CSS (`display: none`), can you click it?", a: "By default, neither tool can click it because it is not physically interactive to a real user. Both tools require using JavaScript injection to bypass the UI and trigger the click event directly." },
        { q: "Compare Drag and Drop implementation.", a: "Playwright offers a single `dragTo(targetLocator)` command. Selenium requires the Actions class: `actions.dragAndDrop(source, target).perform();`. Playwright's implementation is generally less flaky on modern HTML5 drag events." },
        { q: "How do both tools type into text fields?", a: "Selenium's `sendKeys()` always appends text. Playwright's `fill()` replaces text. This means in Selenium, you almost always write two lines of code (`clear()` then `sendKeys()`) to ensure a clean state." },
        { q: "How do both tools handle the mouse pointer position?", a: "Selenium moves the mouse to the center of the element's bounding box. Playwright also targets the center, but allows you to specify exact `{ x, y }` pixel offsets relative to the element's top-left corner during a click." }
      ]
    },
    practiceTask: "Write a script that navigates to Woolworths, uses a keyboard action to clear the search bar, types 'Apple', and uses the arrow keys + Enter to select the first auto-complete suggestion."
  },
  {
    id: 5,
    title: "Lesson 5: Assertions & Validations",
    concept: "Verifying that the UI state matches the expected outcome.",
    analogy: "Assertions are like the receipt check at the Woolworths exit. You don't just assume the cashier scanned everything correctly; you actively verify that the total price on the receipt matches the price on the shelf, and that the bag contains exactly what you paid for. If it doesn't match, you raise an alert (the test fails). Without assertions, your automation script is just clicking buttons blindly without actually 'testing' anything!",
    flow: [
      "Search for 'Apples' in the search bar",
      "Validate the page URL contains the word 'apples'",
      "Validate the search result header text equals 'Apples'",
      "Validate the 'Add to Cart' button is visible and enabled"
    ],
    dependentConcepts: [
      {
        title: "1. Text Assertions",
        desc: "Checking if an element contains or exactly matches specific text.",
        playwright: `// Auto-retrying web-first assertion\nawait expect(page.locator('.title')).toHaveText('Apples');\nawait expect(page.locator('.desc')).toContainText('Fresh');`,
        selenium: `// Requires getting text first, then asserting synchronously\nString txt = driver.findElement(By.className("title")).getText();\nAssert.assertEquals(txt, "Apples");`
      },
      {
        title: "2. Visibility Assertions",
        desc: "Verifying if an element is currently rendered and visible on screen.",
        playwright: `// Fails if element is hidden (e.g., display: none)\nawait expect(page.locator('#checkout-btn')).toBeVisible();`,
        selenium: `// isDisplayed() returns a boolean for the Assert class\nboolean isVis = driver.findElement(By.id("btn")).isDisplayed();\nAssert.assertTrue(isVis);`
      },
      {
        title: "3. State Assertions",
        desc: "Checking if checkboxes are checked, or buttons are enabled/disabled.",
        playwright: `await expect(page.locator('#terms-checkbox')).toBeChecked();\nawait expect(page.locator('#submit')).toBeEnabled();`,
        selenium: `Assert.assertTrue(driver.findElement(By.id("chk")).isSelected());\nAssert.assertTrue(driver.findElement(By.id("btn")).isEnabled());`
      },
      {
        title: "4. Page & URL Assertions",
        desc: "Verifying the current state of the browser tab itself.",
        playwright: `// Checks if current URL contains specific string\nawait expect(page).toHaveURL(/.*checkout/);\nawait expect(page).toHaveTitle('Woolworths');`,
        selenium: `Assert.assertTrue(driver.getCurrentUrl().contains("checkout"));\nAssert.assertEquals(driver.getTitle(), "Woolworths");`
      }
    ],
    pomAnalogy: "Assertions belong in the Test Script (the Store Manager checking the receipt), not the Page Object (the Cashier). The cashier's job is just to scan items and interact with the register. The manager's job is to verify the outcome is correct. Keeping assertions out of Page Objects makes your Page classes reusable for many different types of tests.",
    playwright: [
      {
        file: "pages/SearchResultsPage.ts",
        code: `import { Page, Locator } from '@playwright/test';

export class SearchResultsPage {
    readonly page: Page;
    readonly headerTitle: Locator;
    readonly firstProductAddToCartBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        // We define the locators, but WE DO NOT ASSERT HERE
        this.headerTitle = page.locator('h1.search-results-title');
        this.firstProductAddToCartBtn = page.locator('.product-card button').first();
    }
}`
      },
      {
        file: "tests/assertions.spec.ts",
        code: `import { test, expect } from '@playwright/test';
import { SearchResultsPage } from '../pages/SearchResultsPage';

test('Validate Woolworths Search Results', async ({ page }) => {
    // Navigate and search (simulated)
    await page.goto('https://www.woolworths.com.au/shop/search/products?searchTerm=apples');
    
    const resultsPage = new SearchResultsPage(page);
    
    // 1. URL Assertion
    await expect(page).toHaveURL(/.*searchTerm=apples/);
    
    // 2. Text Assertion (Wait for UI to update)
    await expect(resultsPage.headerTitle).toContainText('apples', { ignoreCase: true });
    
    // 3. State & Visibility Assertion
    await expect(resultsPage.firstProductAddToCartBtn).toBeVisible();
    await expect(resultsPage.firstProductAddToCartBtn).toBeEnabled();
});`
      }
    ],
    selenium: [
      {
        file: "src/main/java/pages/SearchResultsPage.java",
        code: `package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

public class SearchResultsPage {
    WebDriver driver;
    
    // Locators exposed for the test script to assert against
    By headerTitle = By.cssSelector("h1.search-results-title");
    By firstProductAddToCartBtn = By.cssSelector(".product-card button");

    public SearchResultsPage(WebDriver driver) {
        this.driver = driver;
    }

    // Helper methods returning data for the test to assert
    public String getHeaderText() {
        return driver.findElement(headerTitle).getText();
    }

    public boolean isAddToCartEnabled() {
        return driver.findElement(firstProductAddToCartBtn).isEnabled();
    }
}`
      },
      {
        file: "src/test/java/tests/AssertionsTest.java",
        code: `package tests;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import pages.SearchResultsPage;

public class AssertionsTest {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        try {
            driver.get("https://www.woolworths.com.au/shop/search/products?searchTerm=apples");
            SearchResultsPage resultsPage = new SearchResultsPage(driver);
            
            // 1. URL Assertion
            Assert.assertTrue(driver.getCurrentUrl().contains("searchTerm=apples"), "Wrong URL!");
            
            // 2. Text Assertion
            String header = resultsPage.getHeaderText().toLowerCase();
            Assert.assertTrue(header.contains("apples"), "Header does not match!");
            
            // 3. State Assertion
            Assert.assertTrue(resultsPage.isAddToCartEnabled(), "Button is disabled!");
            
            System.out.println("All Assertions Passed!");
        } finally {
            driver.quit();
        }
    }
}`
      }
    ],
    executionGuide: {
      playwright: [
        "Create 'SearchResultsPage.ts' inside your 'pages' folder.",
        "Create 'assertions.spec.ts' inside your 'tests' folder.",
        "Run the test using: npx playwright test tests/assertions.spec.ts --headed"
      ],
      selenium: [
        "Create 'SearchResultsPage.java' inside your 'src/main/java/pages' package.",
        "Create 'AssertionsTest.java' inside your 'src/test/java/tests' package.",
        "Ensure TestNG is installed to run Assertions properly."
      ]
    },
    playwrightNoPom: {
      file: "tests/assertionsRaw.spec.ts",
      code: `import { test, expect } from '@playwright/test';

test('Assertions without POM', async ({ page }) => {
    await page.goto('https://www.woolworths.com.au/shop/search/products?searchTerm=apples');

    // Hardcoding locators directly inside the assertions
    await expect(page).toHaveURL(/.*apples/);
    await expect(page.locator('h1.search-results-title')).toContainText('apples');
    await expect(page.locator('.product-card button').first()).toBeVisible();
});`
    },
    seleniumNoPom: {
      file: "src/test/java/tests/AssertionsTestRaw.java",
      code: `package tests;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;

public class AssertionsTestRaw {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        try {
            driver.get("https://www.woolworths.com.au/shop/search/products?searchTerm=apples");

            // Hardcoding locators directly inside the assertions
            Assert.assertTrue(driver.getCurrentUrl().contains("apples"));
            
            String text = driver.findElement(By.cssSelector("h1.search-results-title")).getText();
            Assert.assertTrue(text.toLowerCase().contains("apples"));
            
            boolean visible = driver.findElement(By.cssSelector(".product-card button")).isDisplayed();
            Assert.assertTrue(visible);

        } finally {
            driver.quit();
        }
    }
}`
    },
    pomBenefitsSummary: [
      { title: "1. SRP (Single Responsibility Principle)", desc: "By keeping assertions strictly in the Test scripts, the Page Objects remain pure representations of the UI. If a Page Object had an `assertTitleIsApples()` method, that Page Object could only ever be used for the 'Apples' test. By returning the text to the Test script, the Test script decides what to assert." },
      { title: "2. Clearer Failure Traces", desc: "When an assertion fails in a Test script, the CI/CD report clearly highlights the exact business requirement that failed (e.g., 'Expected URL to contain checkout'). If the assertion is hidden deep inside a Page Object utility method, the stack trace is confusing to read." },
      { title: "3. Reusable Verifications", desc: "A single POM method like `isAddToCartEnabled()` can be used by the Search Test, the Promo Test, and the Checkout Test, each asserting different expectations based on their specific test scenarios." }
    ],
    differences: [
      { feature: "Assertion Engine", playwright: "Built-in `expect` library (Web-First).", selenium: "Requires third-party library (TestNG or JUnit)." },
      { feature: "Retries/Waiting", playwright: "Assertions automatically wait and retry until timeout.", selenium: "Assertions execute instantly and fail immediately if UI isn't ready." },
      { feature: "Soft Assertions", playwright: "Supported natively via `expect.soft()`.", selenium: "Supported via TestNG's `SoftAssert` class." }
    ],
    interviewInsights: {
      playwright: [
        { q: "What is a 'Web-First' Assertion?", a: "In Playwright, `expect(locator).toBeVisible()` is web-first. It doesn't just check the DOM once; it actively polls the DOM, waiting for the element to become visible, until a timeout is reached. This eliminates flakiness without needing explicit waits." },
        { q: "What is a Soft Assertion?", a: "A soft assertion (`expect.soft()`) allows a test to continue executing even if that specific assertion fails. It collects all failures and marks the test as failed at the very end. This is useful for checking multiple non-critical UI elements (like 5 different labels) in one run." },
        { q: "What is the difference between `toHaveText` and `toContainText`?", a: "`toHaveText` requires an exact string match of the entire element's text. `toContainText` checks if the expected string exists anywhere inside the element's text (substring match)." },
        { q: "How do you assert that an element is NOT present?", a: "You use the `.not` modifier: `await expect(page.locator('.loading-spinner')).not.toBeVisible();`. Playwright will wait for it to disappear." },
        { q: "Can you change the timeout for a single assertion?", a: "Yes, you can pass a timeout option to the expect call: `await expect(locator).toBeVisible({ timeout: 15000 });` to wait up to 15 seconds." }
      ],
      selenium: [
        { q: "What is the difference between Hard and Soft Assertions in TestNG?", a: "A Hard Assertion (`Assert.assertEquals`) immediately throws an `AssertionError` and aborts the test script. A Soft Assertion (`SoftAssert.assertEquals`) records the failure but continues the script. You must call `softAssert.assertAll()` at the end of the test to throw the collected errors." },
        { q: "How do you check if an element is disabled in Selenium?", a: "You use the `isEnabled()` method. It returns `true` if the element is interactive, and `false` if it has the HTML `disabled` attribute: `Assert.assertFalse(driver.findElement(By.id(\"btn\")).isEnabled());`" },
        { q: "What happens if you assert `isDisplayed()` on an element that doesn't exist in the DOM?", a: "The `findElement` call will fail first, throwing a `NoSuchElementException` before the `isDisplayed()` method or the Assertion even executes." },
        { q: "How do you assert the absence of an element?", a: "Because `findElement` throws an exception if not found, you typically use `findElements` (which returns an empty list). `Assert.assertTrue(driver.findElements(By.id(\"spinner\")).isEmpty());`." },
        { q: "What assertion library does Selenium use natively?", a: "Selenium does not have a native assertion library. It relies entirely on the testing framework integrated with it, usually TestNG (`org.testng.Assert`) or JUnit (`org.junit.Assert`)." }
      ],
      comparison: [
        { q: "Compare how both tools handle asserting dynamic text that takes 3 seconds to load.", a: "In Selenium, if you use `Assert.assertEquals(element.getText(), \"Loaded\")`, it executes instantly and fails. You must prepend it with `WebDriverWait`. In Playwright, `expect(element).toHaveText(\"Loaded\")` automatically waits and retries for up to 5 seconds by default." },
        { q: "How is cross-browser assertion formatting handled?", a: "Playwright normalizes text (collapses whitespace, ignores invisible text) automatically in `toHaveText`. Selenium's `getText()` can sometimes return different whitespace formats depending on the browser driver, requiring manual `.trim()` and string manipulation before asserting." },
        { q: "Compare library dependencies for Assertions.", a: "Playwright is 'batteries-included' and ships with its own robust `expect` library (based on Jest). Selenium requires configuring Maven to pull in TestNG, JUnit, or AssertJ." },
        { q: "How do you assert CSS properties (like color)?", a: "In Selenium, you use `element.getCssValue(\"color\")` and assert the string. In Playwright, you use a web-first assertion: `await expect(element).toHaveCSS('color', 'rgb(255, 0, 0)');`." },
        { q: "If a test has 10 assertions and the 2nd one fails, what happens?", a: "In both frameworks, using standard/hard assertions, the script aborts immediately at the 2nd assertion, and the remaining 8 are skipped. Both frameworks require explicit 'Soft Assertion' implementations to continue." }
      ]
    },
    practiceTask: "Write a test that validates a checkbox on a Coles registration form is unchecked by default, clicks the checkbox, and then asserts that its state is now checked."
  },
  {
    id: 6,
    title: "Lesson 6: Waits (Auto vs Manual — CRITICAL)",
    concept: "Handling asynchronous webpage loading and preventing flaky tests.",
    analogy: "Waiting in automation is like waiting at the Woolworths Deli counter. \n\n• Playwright (Auto-Wait): You take a ticket and read a magazine. The moment your number is called, you step up. It's efficient and perfectly timed.\n• Selenium (Manual/Explicit Wait): You must actively stare at the clerk and repeatedly ask 'Are you ready?' for exactly 10 seconds. If they aren't ready in 10 seconds, you walk away angry (Test Fails).\n• Hard Sleep (Thread.sleep): The absolute worst approach. You set a timer for 5 minutes, blindfold yourself, and stand there. Even if the clerk was ready in 10 seconds, you waste 4 minutes and 50 seconds doing nothing!",
    flow: [
      "Click 'Load Promotions' (Triggers a network request)",
      "Wait for the Loading Spinner to disappear",
      "Wait for the Promotion Banner to appear",
      "Assert the banner text is visible"
    ],
    playwright: [
      {
        file: "tests/waits.spec.ts",
        code: `import { test, expect } from '@playwright/test';

test('Coles Promotions Wait Handling', async ({ page }) => {
    await page.goto('https://www.coles.com.au');
    
    // Action triggers a slow load
    await page.locator('#load-promotions-btn').click();
    
    // PLAYWRIGHT AUTO-WAITING
    // Playwright automatically waits for the element to be attached to the DOM,
    // visible, stable (not animating), and capable of receiving events.
    await page.locator('.promo-banner').click(); 
    
    // WEB-FIRST ASSERTIONS (Auto-retrying)
    // This assertion will poll the DOM repeatedly until the text appears
    // or the default timeout (5s) is reached.
    await expect(page.locator('.promo-text')).toHaveText('Half Price!');
    
    // EXPLICIT WAIT (Rarely needed, but available)
    // Waiting for a specific element state if the UI is acting weird
    await page.locator('.loading-spinner').waitFor({ state: 'hidden' });
});`
      }
    ],
    selenium: [
      {
        file: "src/test/java/tests/WaitsTest.java",
        code: `package tests;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;

public class WaitsTest {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        try {
            driver.get("https://www.coles.com.au");
            
            // Action triggers a slow load
            driver.findElement(By.id("load-promotions-btn")).click();
            
            // SELENIUM EXPLICIT WAIT (Mandatory for dynamic apps)
            // We must explicitly declare how long to wait (10s) and WHAT condition to wait for
            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
            
            // 1. Wait for spinner to disappear
            wait.until(ExpectedConditions.invisibilityOfElementLocated(By.className("loading-spinner")));
            
            // 2. Wait for banner to be clickable before clicking
            WebElement banner = wait.until(ExpectedConditions.elementToBeClickable(By.className("promo-banner")));
            banner.click();
            
            // 3. Wait for text to be present
            wait.until(ExpectedConditions.textToBePresentInElementLocated(By.className("promo-text"), "Half Price!"));
            
        } finally {
            driver.quit();
        }
    }
}`
      }
    ],
    differences: [
      { feature: "Actionability", playwright: "Checks visibility, stability, and enablement automatically before ANY action.", selenium: "Throws ElementNotInteractableException if you don't explicitly wait for it." },
      { feature: "Assertions", playwright: "expect() auto-retries until condition is met.", selenium: "Assert.assertEquals executes instantly and fails if the text isn't there immediately." },
      { feature: "Syntax", playwright: "Clean, zero-code waiting.", selenium: "Verbose `WebDriverWait` boilerplate required frequently." }
    ],
    interviewInsights: {
      playwright: [
        { q: "What are Playwright's Actionability checks?", a: "Before Playwright clicks or types, it automatically checks if the element is: Attached to the DOM, Visible, Stable (not moving/animating), Receives Events (not obscured by another element), and Enabled." },
        { q: "What is the difference between `page.waitForTimeout()` and auto-waiting?", a: "`page.waitForTimeout(5000)` is a hard sleep (like Thread.sleep) that forcefully stops execution for 5 seconds. It is considered an anti-pattern. Auto-waiting intelligently proceeds the millisecond the element is ready." },
        { q: "How do you wait for an API response in Playwright?", a: "You can wait for specific network traffic instead of UI elements using `await page.waitForResponse('**/api/v1/products');`. This is incredibly robust for modern React/Angular apps." },
        { q: "What is a Web-First Assertion?", a: "Assertions like `expect(locator).toBeVisible()` that automatically poll the DOM and retry until the condition passes or the timeout is reached. It prevents flaky assertions on slow-loading elements." },
        { q: "How do you change the default timeout in Playwright?", a: "You can change global timeouts in `playwright.config.ts` (e.g., `timeout: 30000` for the test, `expect: { timeout: 5000 }` for assertions), or pass it inline `await locator.click({ timeout: 10000 })`." }
      ],
      selenium: [
        { q: "What is an Implicit Wait?", a: "A global setting (`driver.manage().timeouts().implicitlyWait(10)`) that tells WebDriver to poll the DOM for a certain amount of time when trying to find ANY element. Do not mix it with Explicit Waits." },
        { q: "What is an Explicit Wait?", a: "Used via `WebDriverWait`, it tells WebDriver to pause execution until a specific condition (`ExpectedConditions`) is met for a specific element. It is dynamic and highly recommended." },
        { q: "What is a Fluent Wait?", a: "It is an extension of Explicit Wait that allows you to configure the polling frequency (how often it checks) and specify which exceptions to ignore (e.g., `ignoring(NoSuchElementException.class)`) while waiting." },
        { q: "Why is `Thread.sleep()` a bad practice?", a: "It forces the thread to pause for an exact duration regardless of whether the element is ready. If an element takes 1 second to load and you sleep for 10, you waste 9 seconds. If it takes 11 seconds, the test still fails." },
        { q: "What happens if an Explicit Wait timeout is reached?", a: "Selenium throws a `TimeoutException`, failing the test." }
      ],
      comparison: [
        { q: "Why do Selenium frameworks often suffer from 'Flakiness' compared to Playwright?", a: "Because Selenium requires the engineer to manually predict and code every single wait scenario perfectly. If the network is slow and the engineer missed an Explicit Wait, the test fails. Playwright auto-waits natively." },
        { q: "How do both tools handle waiting for an element to disappear?", a: "In Selenium: `wait.until(ExpectedConditions.invisibilityOfElementLocated(By.id('loader')))`.\nIn Playwright: `await page.locator('#loader').waitFor({ state: 'hidden' });`" },
        { q: "Compare handling of element animations.", a: "Selenium often clicks moving elements, resulting in errors or missed clicks. Playwright checks the 'Stable' state, meaning it automatically waits for CSS animations to finish before clicking." },
        { q: "How do both tools handle elements obscured by overlays?", a: "If a modal covers a button, Selenium might throw an `ElementClickInterceptedException`. Playwright's actionability checks specifically look for whether the element 'Receives Events', and will wait for the overlay to disappear." },
        { q: "Which tool requires more lines of code to handle dynamic content?", a: "Selenium requires significantly more boilerplate (`WebDriverWait` declarations, `ExpectedConditions`) for every interaction in a modern dynamic web app." }
      ]
    },
    practiceTask: "Write a script that navigates to a slow-loading page. In Selenium, implement a Fluent Wait to handle the delay. In Playwright, write a Web-First Assertion."
  },
  {
    id: 7,
    title: "Lesson 7: Page Object Model (POM)",
    concept: "Organizing your framework to maximize reusability and minimize maintenance.",
    analogy: "Imagine trying to run a massive Woolworths supermarket where all items—fresh produce, bakery goods, and cleaning supplies—are dumped in one giant pile in the middle of the store. Finding a specific item would be a nightmare! Page Object Model (POM) is like organizing the supermarket into clear aisles. You keep 'Produce' in one area and 'Bakery' in another. In code, we organize our 'Locators & Actions' (aisles/shelves) into Page classes, and our 'Tests' (shoppers buying items) into Test classes.",
    flow: [
      "Instantiate the Page Object (e.g., HomePage)",
      "Call a method from the Page Object (e.g., searchFor('Milk'))",
      "Page Object interacts with the web elements using its hidden locators",
      "Test Script validates the outcome without knowing the underlying HTML"
    ],
    playwright: [
      {
        file: "pages/HomePage.ts",
        code: `import { Page, Locator } from '@playwright/test';

// 1. We create a Class representing the Home Page
export class HomePage {
    readonly page: Page;
    readonly searchBox: Locator;
    readonly searchBtn: Locator;
    readonly productTile: Locator;

    // 2. We define our locators ONCE here in the constructor
    constructor(page: Page) {
        this.page = page;
        this.searchBox = page.locator('input[name="searchTerm"]');
        this.searchBtn = page.locator('button[aria-label="Search"]');
        this.productTile = page.locator('.product-tile').first();
    }

    // 3. We create reusable actions
    async goto() {
        await this.page.goto('https://www.woolworths.com.au');
    }

    async searchFor(item: string) {
        await this.searchBox.fill(item);
        await this.searchBtn.click();
    }
}`
      },
      {
        file: "tests/searchProduct.spec.ts",
        code: `import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

// This file ONLY contains the test flow (no messy locators!)
test('Search product on Woolworths using POM', async ({ page }) => {
    
    // 1. Initialize our Page Object
    const homePage = new HomePage(page);
    
    // 2. Execute the flow cleanly
    await homePage.goto();
    await homePage.searchFor('milk');
    
    // 3. Validate the results
    await expect(homePage.productTile).toBeVisible();
});`
      }
    ],
    selenium: [
      {
        file: "src/main/java/pages/HomePage.java",
        code: `package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;

// 1. We create a Class representing the Home Page
public class HomePage {
    WebDriver driver;
    
    // 2. We define our locators ONCE as variables
    By searchBox = By.name("searchTerm");
    By searchBtn = By.cssSelector("button[aria-label='Search']");
    By productTile = By.className("product-tile");

    public HomePage(WebDriver driver) {
        this.driver = driver;
    }

    // 3. We create reusable actions
    public void goTo() {
        driver.get("https://www.woolworths.com.au");
    }

    public void searchFor(String item) {
        driver.findElement(searchBox).sendKeys(item);
        driver.findElement(searchBtn).click();
    }

    public boolean isProductVisible() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        WebElement card = wait.until(ExpectedConditions.visibilityOfElementLocated(productTile));
        return card.isDisplayed();
    }
}`
      },
      {
        file: "src/test/java/tests/SearchTest.java",
        code: `package tests;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import pages.HomePage;

// This file ONLY contains the test flow (no messy locators!)
public class SearchTest {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        
        try {
            // 1. Initialize our Page Object
            HomePage homePage = new HomePage(driver);
            
            // 2. Execute the flow cleanly
            homePage.goTo();
            homePage.searchFor("milk");
            
            // 3. Validate the results
            if(homePage.isProductVisible()) {
                System.out.println("Test Passed: Product found!");
            } else {
                System.out.println("Test Failed");
            }
        } finally {
            driver.quit();
        }
    }
}`
      }
    ],
    playwrightNoPom: {
      file: "tests/searchProductRaw.spec.ts",
      code: `import { test, expect } from '@playwright/test';

// All locators and actions are mixed together in one file!
test('Search product on Woolworths (No POM)', async ({ page }) => {
    await page.goto('https://www.woolworths.com.au');

    // Locators are hardcoded directly in the test script
    await page.fill('input[name="searchTerm"]', 'milk');
    await page.click('button[aria-label="Search"]');

    // Assertions mixed with locators
    const productCard = page.locator('.product-tile').first();
    await expect(productCard).toBeVisible();
});`
    },
    seleniumNoPom: {
      file: "src/test/java/tests/SearchTestRaw.java",
      code: `package tests;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;

// All locators and actions are mixed together in one file!
public class SearchTestRaw {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        try {
            driver.get("https://www.woolworths.com.au");

            // Locators are hardcoded directly in the test script
            driver.findElement(By.name("searchTerm")).sendKeys("milk");
            driver.findElement(By.cssSelector("button[aria-label='Search']")).click();

            // Assertions mixed with locators
            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
            WebElement productCard = wait.until(ExpectedConditions.visibilityOfElementLocated(By.className("product-tile")));
            
            if(productCard.isDisplayed()) {
                System.out.println("Test Passed");
            }
        } finally {
            driver.quit();
        }
    }
}`
    },
    pomBenefitsSummary: [
      { title: "1. Separation of Concerns", desc: "Look at the 'No POM' scripts: locators like `page.locator('input[name=\"searchTerm\"]')` are tangled directly inside the test. In the POM approach, locators are safely isolated inside `HomePage`, keeping the test script incredibly clean and focused only on the user's shopping journey." },
      { title: "2. Code Reusability", desc: "If you needed to write 10 different tests that search for grocery items, the 'No POM' approach forces you to duplicate the same locator and typing commands 10 times. With POM, you just call `homePage.searchFor('bread')` over and over, drastically reducing duplicate code." },
      { title: "3. Single Point of Maintenance", desc: "If Woolworths updates their site and changes the search button's `aria-label`, the 'No POM' method requires you to find and fix that locator across potentially 50 different test files! With POM, you update the locator exactly ONE time in the `HomePage` class, and all 50 tests are instantly fixed." }
    ],
    interviewInsights: {
      playwright: [
        { q: "How do you implement POM in Playwright?", a: "By creating a standard TypeScript/JavaScript class. You declare locators as class properties in the constructor using `page.locator()`, and create async methods for actions." },
        { q: "Is PageFactory used in Playwright?", a: "No, PageFactory is a Selenium-specific concept. Playwright handles element location dynamically upon action, so annotations like `@FindBy` are not needed or supported." },
        { q: "How do you handle multiple pages in a POM architecture?", a: "A single test script can instantiate multiple page objects. For example: `const loginPage = new LoginPage(page); await loginPage.login(); const homePage = new HomePage(page); await homePage.verifyDashboard();`" },
        { q: "Can Page Objects inherit from each other?", a: "Yes. For example, a `BasePage` class can contain common locators like headers and footers, and `CheckoutPage` can `extend BasePage` to inherit those elements." },
        { q: "Where should assertions live in a POM framework?", a: "Best practice is to keep assertions in the Test file, not the Page Object. The Page Object should only handle locators and actions, returning state back to the test to assert against." }
      ],
      selenium: [
        { q: "What is Page Object Model?", a: "It is a design pattern that creates an Object Repository for web UI elements. Each webpage is represented by a Class, and the elements/interactions are represented as variables and methods." },
        { q: "What is PageFactory in Selenium?", a: "An extension of POM provided by Selenium. It allows you to initialize WebElements using the `@FindBy` annotation (e.g., `@FindBy(id=\"search\") WebElement searchBox;`), followed by calling `PageFactory.initElements()`." },
        { q: "What is the primary benefit of POM?", a: "Reducing code duplication and improving maintenance. If the UI changes, you only update the locator in one single Page class instead of modifying hundreds of test scripts." },
        { q: "Why should you avoid putting assertions in a Page Object?", a: "It violates the Single Responsibility Principle. A Page Object's job is to describe the page and perform actions. A Test class's job is to assert logic. Mixing them makes Page Objects less reusable across different tests." },
        { q: "How do you achieve Encapsulation in POM?", a: "By declaring locators (`By` variables) as `private`, and only exposing public methods (like `searchFor()`) to the test script. The test should not interact with the WebDriver directly to find elements." }
      ],
      comparison: [
        { q: "Does the core concept of POM change between Selenium and Playwright?", a: "No. The architectural pattern (Separation of Concerns, classes representing pages, methods representing actions) is identical. Only the syntax and locator instantiation differ." },
        { q: "Compare Locator instantiation.", a: "In Selenium POM, locators are often static `By` objects or `@FindBy` WebElements. In Playwright POM, locators are assigned in the constructor via `this.searchBox = page.locator(...)`." },
        { q: "Which framework strictly requires `PageFactory.initElements()`?", a: "Only Selenium. Playwright does not use annotations or require explicit initialization of elements before action." },
        { q: "Compare the use of 'Base Classes'.", a: "Both frameworks benefit from a `BaseTest` (handling setup/teardown) and a `BasePage` (handling common UI components). The implementation in Java uses inheritance (`extends`), and in TS uses classes or fixtures." },
        { q: "If a test fails due to a changed UI, where do you fix it in a POM framework?", a: "In both frameworks, you fix the locator inside the specific Page Class. You do not touch the Test Script." }
      ]
    }
  },
  {
    id: 8,
    title: "Lesson 8: Screenshots & Video Recording",
    concept: "Capturing visual evidence of test execution and failures.",
    analogy: "Think of screenshots and videos like the security cameras at Woolworths self-checkout. You don't want the security team manually recording every single customer who successfully buys bread (that takes up too much storage!). But if a customer scans an item incorrectly and the system throws an error, the camera automatically saves a snapshot and a short video clip of exactly what happened. In automation, we want our framework to automatically capture evidence ONLY when a test fails.",
    flow: [
      "Configure the framework to listen for test results",
      "Run the test: Navigate to Coles checkout",
      "Test intentionally fails (e.g., button not found)",
      "Framework intercepts the failure instantly",
      "A screenshot and/or video is automatically saved to an output folder"
    ],
    dependentConcepts: [
      {
        title: "1. Capturing Full Page Screenshots",
        desc: "Taking a manual picture of the entire browser viewport.",
        playwright: `// Captures the current visible page\nawait page.screenshot({ path: 'screenshot.png' });\n// Captures full scrolling page\nawait page.screenshot({ path: 'full.png', fullPage: true });`,
        selenium: `// Cast driver to TakesScreenshot\nFile src = ((TakesScreenshot)driver).getScreenshotAs(OutputType.FILE);\nFileUtils.copyFile(src, new File("screenshot.png"));`
      },
      {
        title: "2. Element-Level Screenshots",
        desc: "Capturing only a specific component (e.g., just the payment form).",
        playwright: `// Call screenshot directly on the locator\nawait page.locator('#payment-form').screenshot({ path: 'form.png' });`,
        selenium: `// Selenium 4 supports this natively on WebElements\nWebElement form = driver.findElement(By.id("payment-form"));\nFile src = form.getScreenshotAs(OutputType.FILE);`
      },
      {
        title: "3. Video Recording",
        desc: "Recording the entire browser session from start to finish.",
        playwright: `// Defined cleanly in playwright.config.ts\nuse: {\n  video: 'retain-on-failure'\n}`,
        selenium: `// Requires complex third-party libraries (like Monte Screen Recorder)\n// or wrapping execution inside specific Docker containers (Selenoid).`
      },
      {
        title: "4. The Trace Viewer (Playwright Only)",
        desc: "A specialized tool that records DOM state, network, and console logs.",
        playwright: `// Defined in playwright.config.ts\nuse: {\n  trace: 'retain-on-failure'\n}`,
        selenium: `// No exact native equivalent.\n// Requires integrating external logging libraries or Allure.`
      }
    ],
    pomAnalogy: "If you don't use a centralized configuration/listener (No POM approach), you must manually write a `try/catch` block around every single test to take a screenshot. It's like asking every single Woolworths cashier to hold a Polaroid camera and snap a photo if a transaction fails. The 'Best Practice' approach installs automatic ceiling cameras (TestNG Listeners / Playwright Config) that watch all cashiers invisibly and snap photos automatically when an alarm goes off.",
    playwright: [
      {
        file: "playwright.config.ts",
        code: `import { defineConfig } from '@playwright/test';

// Best Practice: Zero code in the actual test scripts.
// All screenshot and video logic is centralized here.
export default defineConfig({
  use: {
    // Only capture screenshots if the test fails
    screenshot: 'only-on-failure',
    // Only keep the video recording if the test fails
    video: 'retain-on-failure',
    // Trace viewer gives you a full GUI timeline of the failure
    trace: 'retain-on-failure'
  },
  // Results are automatically saved here
  outputDir: 'test-results/',
});`
      },
      {
        file: "tests/checkoutFailure.spec.ts",
        code: `import { test, expect } from '@playwright/test';

// The test remains clean and focused strictly on business logic.
test('Coles Checkout - Intentional Failure for Screenshot', async ({ page }) => {
    await page.goto('https://www.coles.com.au');
    
    // This will fail because the button doesn't exist immediately.
    // The config will automatically intercept this failure and save evidence!
    await page.locator('#fake-checkout-btn').click({ timeout: 2000 });
});`
      }
    ],
    selenium: [
      {
        file: "src/test/java/utils/ScreenshotListener.java",
        code: `package utils;

import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;
import org.testng.ITestListener;
import org.testng.ITestResult;
import org.apache.commons.io.FileUtils;
import java.io.File;

// Best Practice: Centralizing screenshot logic using a TestNG Listener
public class ScreenshotListener implements ITestListener {

    @Override
    public void onTestFailure(ITestResult result) {
        // Retrieve the driver instance from the failed test class
        WebDriver driver = (WebDriver) result.getTestContext().getAttribute("WebDriver");
        
        if (driver != null) {
            try {
                // Capture the screenshot
                File src = ((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE);
                // Save it with the failing test's name
                String dest = "test-results/" + result.getName() + ".png";
                FileUtils.copyFile(src, new File(dest));
                System.out.println("Screenshot saved: " + dest);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}`
      },
      {
        file: "src/test/java/tests/CheckoutFailureTest.java",
        code: `package tests;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.annotations.*;
import utils.ScreenshotListener;

// We attach the listener to the test class
@Listeners(ScreenshotListener.class)
public class CheckoutFailureTest {
    WebDriver driver;

    @BeforeMethod
    public void setup(org.testng.ITestContext context) {
        driver = new ChromeDriver();
        // Pass the driver to the context so the Listener can access it
        context.setAttribute("WebDriver", driver);
    }

    @Test
    public void intentionalFailureTest() {
        driver.get("https://www.coles.com.au");
        // This will throw NoSuchElementException and trigger the Listener
        driver.findElement(By.id("fake-checkout-btn")).click();
    }

    @AfterMethod
    public void teardown() {
        if (driver != null) driver.quit();
    }
}`
      }
    ],
    executionGuide: {
      playwright: [
        "Update your 'playwright.config.ts' with the provided settings.",
        "Create 'checkoutFailure.spec.ts' in your 'tests' folder.",
        "Run: npx playwright test tests/checkoutFailure.spec.ts",
        "Check the 'test-results/' folder for the PNG and WebM video files!"
      ],
      selenium: [
        "Add 'commons-io' dependency to pom.xml for FileUtils.",
        "Create 'ScreenshotListener.java' in a 'utils' package.",
        "Create 'CheckoutFailureTest.java' in your 'tests' package.",
        "Run the TestNG class. Check the 'test-results/' folder for the PNG!"
      ]
    },
    playwrightNoPom: {
      file: "tests/manualScreenshotRaw.spec.ts",
      code: `import { test, expect } from '@playwright/test';

test('Manual Screenshot Anti-Pattern', async ({ page }) => {
    try {
        await page.goto('https://www.coles.com.au');
        await page.locator('#fake-btn').click({ timeout: 2000 });
    } catch (error) {
        // ANTI-PATTERN: Manually catching errors in every test to take a picture
        await page.screenshot({ path: 'error.png' });
        throw error; // Re-throw to fail the test
    }
});`
    },
    seleniumNoPom: {
      file: "src/test/java/tests/ManualScreenshotTestRaw.java",
      code: `package tests;

import org.openqa.selenium.By;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.apache.commons.io.FileUtils;
import java.io.File;

public class ManualScreenshotTestRaw {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        try {
            driver.get("https://www.coles.com.au");
            driver.findElement(By.id("fake-btn")).click();
        } catch (Exception e) {
            // ANTI-PATTERN: Writing screenshot file logic inside the test itself
            try {
                File src = ((TakesScreenshot)driver).getScreenshotAs(OutputType.FILE);
                FileUtils.copyFile(src, new File("error.png"));
            } catch (Exception ioException) {}
            throw e;
        } finally {
            driver.quit();
        }
    }
}`
    },
    pomBenefitsSummary: [
      { title: "1. Global Centralization", desc: "In the 'Anti-Pattern', if you have 100 tests, you must write `try/catch` and screenshot logic 100 times. By using the Playwright Config or a Selenium TestNG Listener, you write the rule exactly once, and it automatically covers every test in your entire suite." },
      { title: "2. Clean Business Logic", desc: "Test scripts should read like a user manual: 'Go to page, click button, assert text'. Adding file streaming and image processing code directly into the test file makes it incredibly difficult for non-technical team members to read and understand the test." },
      { title: "3. Storage Optimization", desc: "Setting configs to `only-on-failure` ensures your CI/CD server doesn't run out of hard drive space. Taking pictures manually inside tests often leads to accidental 'success' pictures being hoarded indefinitely." }
    ],
    differences: [
      { feature: "Auto-Capture Setup", playwright: "Zero code. Just change 2 strings in `playwright.config.ts`.", selenium: "Requires implementing an `ITestListener`, file utilities, and passing driver contexts." },
      { feature: "Video Recording", playwright: "Native feature out-of-the-box (WebM format).", selenium: "No native video support. Requires heavy external library integration." },
      { feature: "Full Page Screenshots", playwright: "Native argument: `{ fullPage: true }`.", selenium: "Historically complex. Selenium 4 supports it primarily on Firefox, or requires third-party tools like AShot." }
    ],
    interviewInsights: {
      playwright: [
        { q: "How do you capture a screenshot of a specific element in Playwright?", a: "You call the screenshot method directly on the locator rather than the page: `await page.locator('.shopping-cart').screenshot({ path: 'cart.png' });`" },
        { q: "What is the Playwright Trace Viewer?", a: "It is an advanced debugging tool. Unlike a static video, a trace captures the DOM snapshot, network requests, and console logs at every action, allowing you to visually 'time travel' through the failed test in a browser UI." },
        { q: "How do you enable video recording only for retried tests?", a: "In `playwright.config.ts`, you set `video: 'retain-on-failure'`. This ensures it records everything, but instantly deletes the video if the test passes, saving disk space." },
        { q: "Can you hide sensitive data (like passwords) before taking a screenshot?", a: "Yes, Playwright provides a `mask` option: `await page.screenshot({ mask: [page.locator('#password')] });`. This puts a solid color block over the specified elements in the image." },
        { q: "What format does Playwright record video in?", a: "Playwright records videos in the lightweight `.webm` format to ensure CI/CD artifacts remain small." }
      ],
      selenium: [
        { q: "How do you take a screenshot in Selenium WebDriver?", a: "You must cast the WebDriver instance to the `TakesScreenshot` interface, call `getScreenshotAs(OutputType.FILE)`, and then use a file utility (like Apache Commons IO) to save the file to disk." },
        { q: "What is an ITestListener in TestNG?", a: "An interface that allows you to alter the default TestNG behavior. By implementing methods like `onTestFailure`, you can tell the framework to automatically execute screenshot code whenever a test fails." },
        { q: "How does the Listener access the WebDriver instance from the Test class?", a: "Because the Listener runs in a separate context, the Test class must pass the driver instance to the `ITestContext` attribute (e.g., in `@BeforeMethod`), which the Listener can then retrieve upon failure." },
        { q: "Can Selenium 4 take element-level screenshots?", a: "Yes, Selenium 4 introduced native element screenshots. You can call `getScreenshotAs` directly on a `WebElement` instead of casting the entire WebDriver." },
        { q: "How would you capture a full-page screenshot (including the scrollable area) in Selenium?", a: "While standard Selenium captures the viewport, FirefoxDriver natively supports full page. For Chrome, you typically use a third-party library like `AShot` or execute JavaScript to stitch scrolled images together." }
      ],
      comparison: [
        { q: "Compare the complexity of capturing evidence on test failure.", a: "Playwright abstracts this entirely into the configuration file requiring zero code. Selenium requires an architectural setup involving TestNG Listeners, context sharing, and manual file stream handling." },
        { q: "Compare the availability of Video Recording.", a: "Playwright provides native video recording capabilities via the Chrome DevTools Protocol. Selenium requires external tools (like Monte Screen Recorder or Docker-based Selenoid plugins) because the W3C WebDriver protocol does not natively support video streaming." },
        { q: "Which tool provides better post-execution debugging?", a: "Playwright. Its Trace Viewer is unmatched, providing DOM snapshots, network payloads, and source code mapping. Selenium relies purely on static screenshots and standard logging unless heavily integrated with tools like Allure." },
        { q: "How do both tools handle masking sensitive data in screenshots?", a: "Playwright has a native `mask` parameter array built into the screenshot method. In Selenium, you must write JavaScript injection to manually alter the DOM (e.g., changing background colors or removing elements) before triggering the screenshot." },
        { q: "Where is the captured evidence stored by default?", a: "Playwright automatically structures output in a `test-results` directory, neatly organized by test name. Selenium requires the engineer to manually write the folder creation and file naming logic (e.g., appending timestamps to file names)." }
      ]
    },
    practiceTask: "Implement a test that logs into Woolworths. In Playwright, configure a trace to be saved. In Selenium, take a screenshot specifically of the 'Login' button element before clicking it."
  },
  {
    id: 9,
    title: "Lesson 9: Test Execution (Parallel + Cross-browser)",
    concept: "Scaling your test execution for speed and coverage.",
    analogy: "Imagine a Woolworths with 100 customers. If you only open 1 checkout lane (Sequential Execution), it will take hours. If you open 10 lanes (Parallel Execution), you serve 10 customers simultaneously, drastically reducing time! Furthermore, Cross-Browser testing is like making sure the EFTPOS machine doesn't just accept Visa (Chrome), but also seamlessly accepts Mastercard (Firefox) and Amex (Safari).",
    flow: [
      "Configure the framework to run 3 test files simultaneously",
      "Configure the framework to target Chromium, Firefox, and WebKit",
      "Trigger the execution suite via Command Line",
      "Framework spawns independent worker processes/threads",
      "Consolidate results into a single report"
    ],
    dependentConcepts: [
      {
        title: "1. Configuring Parallelism",
        desc: "Instructing the framework to run multiple tests at the exact same time.",
        playwright: `// In playwright.config.ts\nexport default defineConfig({\n  fullyParallel: true, // Runs ALL tests inside a file in parallel\n  workers: 4 // Limits the number of concurrent processes\n});`,
        selenium: `<!-- In testng.xml -->\n<suite name="Suite" parallel="tests" thread-count="4">\n  <test name="ChromeTest">...</test>\n</suite>`
      },
      {
        title: "2. Cross-Browser Configuration",
        desc: "Executing the exact same script against different browser engines.",
        playwright: `// In playwright.config.ts\nprojects: [\n  { name: 'chromium', use: { ...devices['Desktop Chrome'] } },\n  { name: 'firefox', use: { ...devices['Desktop Firefox'] } }\n]`,
        selenium: `// Pass browser name as a TestNG parameter\n@Parameters("browser")\n@BeforeMethod\npublic void setup(String browser) {\n  if(browser.equals("chrome")) driver = new ChromeDriver();\n}`
      },
      {
        title: "3. Thread Safety (CRITICAL)",
        desc: "Ensuring parallel tests do not interfere with each other's data or browser sessions.",
        playwright: `// Playwright handles this natively.\n// Each test gets its own isolated 'page' fixture via separate OS processes.\ntest('Isolated test', async ({ page }) => { ... });`,
        selenium: `// Selenium requires Java ThreadLocal to prevent drivers from colliding\nprivate static ThreadLocal<WebDriver> driver = new ThreadLocal<>();\ndriver.set(new ChromeDriver());\ndriver.get().get("https://coles.com.au");`
      },
      {
        title: "4. Execution Commands",
        desc: "Triggering the scaled execution from the terminal.",
        playwright: `// Run 4 workers across all configured projects\nnpx playwright test --workers=4`,
        selenium: `// Run the TestNG XML suite via Maven\nmvn clean test -DsuiteXmlFile=testng.xml`
      }
    ],
    pomAnalogy: "Thread Safety is like giving each Woolworths cashier their own dedicated EFTPOS machine. If you use a 'static' driver (Anti-Pattern), it's like making 4 cashiers share 1 machine simultaneously—they will press buttons over each other and transactions will crash! By using POM correctly with ThreadLocal (Selenium) or isolated fixtures (Playwright), you ensure every test run gets its own private, isolated environment.",
    playwright: [
      {
        file: "playwright.config.ts",
        code: `import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // 1. Enable parallel execution for tests INSIDE the same file
  fullyParallel: true,
  
  // 2. Limit concurrent workers based on CI/CD CPU power
  workers: process.env.CI ? 2 : 4,
  
  // 3. Define the Cross-Browser Matrix
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit', // Safari engine
      use: { ...devices['Desktop Safari'] },
    },
  ],
});`
      },
      {
        file: "tests/scaledExecution.spec.ts",
        code: `import { test, expect } from '@playwright/test';

// Because of our config, this test will automatically run 3 times 
// (once in Chrome, Firefox, and Safari) completely in parallel!
test('Cross-Browser Coles Verification', async ({ page }) => {
    
    await page.goto('https://www.coles.com.au');
    
    // Playwright isolates the 'page' fixture perfectly.
    // Even running 4 workers, they will never collide.
    await expect(page).toHaveTitle(/Coles/);
});`
      }
    ],
    selenium: [
      {
        file: "src/test/java/utils/BaseTest.java",
        code: `package utils;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.testng.annotations.*;

public class BaseTest {
    // CRITICAL: ThreadLocal ensures each parallel thread gets its own WebDriver instance
    protected static ThreadLocal<WebDriver> driver = new ThreadLocal<>();

    @Parameters("browser")
    @BeforeMethod
    public void setup(@Optional("chrome") String browser) {
        if (browser.equalsIgnoreCase("chrome")) {
            driver.set(new ChromeDriver());
        } else if (browser.equalsIgnoreCase("firefox")) {
            driver.set(new FirefoxDriver());
        }
        
        // Access the thread-safe driver using get()
        driver.get().manage().window().maximize();
    }

    @AfterMethod
    public void teardown() {
        if (driver.get() != null) {
            driver.get().quit();
            driver.remove(); // Prevent memory leaks
        }
    }
}`
      },
      {
        file: "testng.xml",
        code: `<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">
<!-- Configure parallel="tests" to run the below blocks simultaneously -->
<suite name="CrossBrowserSuite" parallel="tests" thread-count="2">

    <!-- Thread 1: Runs in Chrome -->
    <test name="Coles_Chrome_Test">
        <parameter name="browser" value="chrome"/>
        <classes>
            <class name="tests.ScaledExecutionTest"/>
        </classes>
    </test>

    <!-- Thread 2: Runs in Firefox simultaneously -->
    <test name="Coles_Firefox_Test">
        <parameter name="browser" value="firefox"/>
        <classes>
            <class name="tests.ScaledExecutionTest"/>
        </classes>
    </test>

</suite>`
      }
    ],
    executionGuide: {
      playwright: [
        "Update 'playwright.config.ts' with the projects matrix.",
        "Create 'scaledExecution.spec.ts' in the 'tests' folder.",
        "Run the matrix: npx playwright test tests/scaledExecution.spec.ts",
        "Notice in the terminal that 3 tests run simultaneously!"
      ],
      selenium: [
        "Create 'BaseTest.java' to handle the ThreadLocal logic.",
        "Ensure your Test classes extend 'BaseTest' and use 'driver.get()'.",
        "Create 'testng.xml' at the root of your project.",
        "Run the suite via IDE (Right click testng.xml -> Run) or Maven."
      ]
    },
    playwrightNoPom: {
      file: "tests/serialRaw.spec.ts",
      code: `import { test } from '@playwright/test';

// Anti-Pattern: Forcing sequential execution unnecessarily
test.describe.configure({ mode: 'serial' });

test('Step 1: Login', async ({ page }) => {
    // If this fails, Step 2 will be skipped!
});

test('Step 2: Checkout', async ({ page }) => {
    // Tests should be independent, not chained serially.
});`
    },
    seleniumNoPom: {
      file: "src/test/java/tests/CollisionTestRaw.java",
      code: `package tests;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.annotations.*;

public class CollisionTestRaw {
    
    // ANTI-PATTERN: A static WebDriver without ThreadLocal!
    // If two parallel tests run, Thread B will overwrite Thread A's driver.
    // Thread A will throw a NullPointerException or control Thread B's browser!
    public static WebDriver driver;

    @BeforeMethod
    public void setup() {
        driver = new ChromeDriver();
    }

    @Test
    public void testColes() {
        driver.get("https://www.coles.com.au");
    }
}`
    },
    pomBenefitsSummary: [
      { title: "1. Preventing Thread Collisions", desc: "The 'No POM' Selenium script uses a standard `static WebDriver`. In parallel execution, Thread 2 will overwrite the driver of Thread 1, causing massive test failures. By utilizing `ThreadLocal` in a Base Class, every test thread is safely isolated." },
      { title: "2. DRY Matrix Setup", desc: "Instead of writing `if (browser == 'chrome')` inside every single test, we abstract that logic into the XML/Config and the Base Class. The actual test script focuses entirely on the business logic, unaware of which browser it is currently executing in." },
      { title: "3. Maximum Infrastructure Utilization", desc: "Running 100 UI tests sequentially can take an hour. By properly configuring Playwright workers or TestNG thread-counts, you can execute the exact same suite in 10 minutes, providing instant feedback to developers." }
    ],
    differences: [
      { feature: "Parallel Architecture", playwright: "Process-based. Spawns completely isolated OS Node.js processes.", selenium: "Thread-based. Runs inside a single JVM, requiring strict thread-safety code." },
      { feature: "Browser Engine Support", playwright: "Chromium, Firefox, WebKit (Safari engine) bundled natively.", selenium: "Chrome, Firefox, Edge, Safari (Requires native OS drivers installed)." },
      { feature: "Matrix Execution", playwright: "Defined via a `projects` array in config; runs automatically.", selenium: "Defined via XML files utilizing `@Parameters`." }
    ],
    interviewInsights: {
      playwright: [
        { q: "How does Playwright achieve parallel execution without thread-safety issues?", a: "Playwright uses a multi-process architecture instead of multi-threading. Each worker is a completely separate Node.js OS process. This guarantees total memory and state isolation between tests without needing complex thread locks." },
        { q: "What is `fullyParallel: true` in Playwright?", a: "By default, Playwright runs multiple test *files* in parallel, but tests *inside* the same file run sequentially. Setting `fullyParallel: true` forces tests within the same file to also execute simultaneously across different workers." },
        { q: "What is WebKit?", a: "WebKit is the browser engine developed by Apple that powers Safari. Playwright ships with a patched version of WebKit, allowing you to test Safari behavior on Windows and Linux machines natively, which Selenium cannot do." },
        { q: "How do you run a Playwright test on only one specific browser?", a: "You use the `--project` flag in the CLI. For example: `npx playwright test --project=firefox` will ignore the other browsers configured in the matrix." },
        { q: "What happens if a worker process crashes in Playwright?", a: "Because workers are isolated OS processes, a crash in Worker 1 will not affect Worker 2. The Playwright test runner will simply restart the failed worker process and continue the suite." }
      ],
      selenium: [
        { q: "What is ThreadLocal in Java and why is it critical for Selenium?", a: "`ThreadLocal` is a Java class that provides thread-local variables. When running parallel tests in TestNG, multiple threads share the same JVM memory. Wrapping the WebDriver in `ThreadLocal` ensures each thread gets its own isolated browser instance, preventing collisions." },
        { q: "What are the ways to run parallel tests in TestNG?", a: "You configure the `testng.xml` file. You can set `parallel=\"methods\"` (runs test methods simultaneously), `parallel=\"classes\"`, or `parallel=\"tests\"` (runs entire `<test>` blocks simultaneously), along with the `thread-count` attribute." },
        { q: "What is Selenium Grid?", a: "A proxy server that routes commands to remote browser instances. While local parallel execution runs browsers on your own machine, Grid allows you to scale by running parallel browsers across a network of different OS/Virtual Machines (Nodes)." },
        { q: "Why might a Selenium parallel test suite fail randomly?", a: "The most common reason is non-thread-safe variables (like a static `WebDriver` or static Page Objects without `ThreadLocal`). Another reason is testing against a shared backend environment where Test A deletes data that Test B is actively trying to read." },
        { q: "How do you test Safari in Selenium?", a: "You must instantiate a `SafariDriver`. However, unlike Playwright, Selenium requires you to execute this specifically on a macOS machine, as Safari cannot be installed or emulated natively on Windows." }
      ],
      comparison: [
        { q: "Compare the isolation levels of parallel execution in both tools.", a: "Playwright offers higher isolation because it uses separate OS processes and isolated Browser Contexts. Selenium uses shared JVM threads, which is highly prone to memory leaks and cross-thread contamination if the framework isn't designed perfectly." },
        { q: "Which tool requires more physical machine resources (RAM/CPU) to run parallel tests?", a: "Playwright. Spawning separate Node.js processes and lightweight browser contexts is generally faster, but processes consume more base memory than JVM threads. However, Playwright's browser contexts share the underlying browser executable, mitigating some overhead." },
        { q: "How does cross-browser testing setup differ?", a: "Selenium relies on the native browsers installed on the host machine. If Chrome updates, you must ensure your ChromeDriver matches. Playwright downloads and uses specific, locked browser binaries, ensuring perfect reproducibility across different environments." },
        { q: "Can both tools execute tests sequentially if needed?", a: "Yes. In Selenium, simply remove the `parallel` attribute from the XML. In Playwright, you can use `test.describe.serial()` or set `workers: 1`." },
        { q: "Compare mobile browser testing capabilities.", a: "Playwright uses high-fidelity device emulation within Chromium/WebKit to simulate mobile viewports, touch events, and user agents instantly. Selenium primarily tests desktop browsers unless integrated with a separate tool like Appium for actual mobile devices." }
      ]
    },
    practiceTask: "Configure your framework to run 2 tests in parallel. Make Test 1 open Coles and Test 2 open Woolworths. Watch them execute simultaneously on your screen."
  },
  {
    id: 10,
    title: "Lesson 10: Reporting",
    concept: "Generating visual and actionable HTML reports for stakeholders.",
    analogy: "Think of reporting like the end-of-day sales summary printed by the store manager at Coles. Instead of manually counting every single transaction receipt (reading raw terminal logs), the manager prints a beautiful, consolidated report showing total sales, refunded items, and specific errors. In automation, a Report consolidates hundreds of tests into a clean dashboard showing Passes, Fails, and execution times, completely translating code into business-readable data.",
    flow: [
      "Configure the framework's reporter settings",
      "Execute the test suite via the command line",
      "Framework automatically collects results, screenshots, and traces",
      "Framework compiles data into a static HTML dashboard",
      "Open the generated HTML report in a browser to review failures"
    ],
    dependentConcepts: [
      {
        title: "1. Built-in vs Third-Party Reporters",
        desc: "The tools used to generate the UI of the report.",
        playwright: `// Playwright has a native, interactive HTML reporter\nexport default defineConfig({\n  reporter: [['html'], ['list']]\n});`,
        selenium: `// Selenium relies on TestNG/JUnit, which generate basic text reports.\n// ExtentReports or Allure must be imported via Maven for UI reports.`
      },
      {
        title: "2. Test Steps (Log Grouping)",
        desc: "Breaking a single test down into readable, grouped sub-steps in the report.",
        playwright: `// Groups actions under a readable label in the report\nawait test.step('Login to Coles Portal', async () => {\n  await page.fill('#user', 'test');\n  await page.click('#submit');\n});`,
        selenium: `// ExtentReports provides a logging mechanism\nExtentTest test = extent.createTest("Login Test");\ntest.log(Status.INFO, "Entered username and clicked submit");`
      },
      {
        title: "3. Attaching Evidence",
        desc: "Adding screenshots or videos directly into the report UI.",
        playwright: `// Handled automatically by the config, but can be done manually:\nconst buffer = await page.screenshot();\nawait testInfo.attach('screenshot', { body: buffer, contentType: 'image/png' });`,
        selenium: `// Adding a screenshot path to the ExtentReports log\ntest.fail("Button missing", MediaEntityBuilder.createScreenCaptureFromPath("error.png").build());`
      },
      {
        title: "4. Viewing the Report",
        desc: "Opening the generated artifact after the execution finishes.",
        playwright: `// Starts a local web server to host the interactive report\nnpx playwright show-report`,
        selenium: `// Open the generated 'extent-report.html' file directly in Chrome\n// (No web server required for ExtentReports)`
      }
    ],
    pomAnalogy: "When a test fails, a well-structured POM framework makes the report incredibly readable. Instead of the report saying 'Failed to click xpath //div[2]/span', it says 'Failed to click Add to Cart in the CheckoutPage'. By combining POM with Test Steps, your report translates raw automation code into a language that Product Owners and Business Analysts can immediately understand.",
    playwright: [
      {
        file: "playwright.config.ts",
        code: `import { defineConfig } from '@playwright/test';

export default defineConfig({
  // Best Practice: Generate both a console list (for the dev) 
  // and an HTML report (for the stakeholders)
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'playwright-report' }]
  ],
});`
      },
      {
        file: "tests/reportTest.spec.ts",
        code: `import { test, expect } from '@playwright/test';

test('Coles Search flow with detailed report steps', async ({ page }) => {
    
    // Wrapping logic in test.step() makes the HTML report highly readable
    await test.step('Navigate to Coles Homepage', async () => {
        await page.goto('https://www.coles.com.au');
    });
    
    await test.step('Search for Apples', async () => {
        await page.locator('#searchTerm').fill('Apples');
        await page.locator('[data-testid="search-button"]').click();
    });
    
    await test.step('Verify search results load', async () => {
        await expect(page.locator('h1')).toContainText('Apples');
    });
});`
      }
    ],
    selenium: [
      {
        file: "src/test/java/utils/ExtentManager.java",
        code: `package utils;

import com.aventstack.extentreports.ExtentReports;
import com.aventstack.extentreports.reporter.ExtentSparkReporter;

// Best Practice: Abstract report generation into a Manager class
public class ExtentManager {
    private static ExtentReports extent;

    public static ExtentReports getInstance() {
        if (extent == null) {
            // Configure the HTML file output
            ExtentSparkReporter spark = new ExtentSparkReporter("target/ExtentReport.html");
            spark.config().setReportName("Coles Automation Results");
            spark.config().setDocumentTitle("Test Report");

            extent = new ExtentReports();
            extent.attachReporter(spark);
            extent.setSystemInfo("Environment", "QA");
        }
        return extent;
    }
}`
      },
      {
        file: "src/test/java/tests/ReportTest.java",
        code: `package tests;

import com.aventstack.extentreports.ExtentReports;
import com.aventstack.extentreports.ExtentTest;
import com.aventstack.extentreports.Status;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.annotations.*;
import utils.ExtentManager;

public class ReportTest {
    ExtentReports extent = ExtentManager.getInstance();
    ExtentTest test;
    WebDriver driver;

    @BeforeMethod
    public void setup() {
        driver = new ChromeDriver();
        // Create a new entry in the report for this test
        test = extent.createTest("Coles Search Flow");
    }

    @Test
    public void verifySearch() {
        test.log(Status.INFO, "Navigating to Coles Homepage");
        driver.get("https://www.coles.com.au");
        
        test.log(Status.PASS, "Homepage loaded successfully");
    }

    @AfterMethod
    public void teardown() {
        driver.quit();
        // CRITICAL: Flush writes the logged data to the HTML file!
        extent.flush();
    }
}`
      }
    ],
    executionGuide: {
      playwright: [
        "Update your 'playwright.config.ts' with the reporter array.",
        "Create 'reportTest.spec.ts' in your 'tests' folder.",
        "Run the test: npx playwright test tests/reportTest.spec.ts",
        "View the gorgeous UI: npx playwright show-report"
      ],
      selenium: [
        "Add the 'extentreports' dependency to your pom.xml.",
        "Create 'ExtentManager.java' in the 'utils' package.",
        "Create 'ReportTest.java' in the 'tests' package.",
        "Run the TestNG class, then open 'target/ExtentReport.html' in Chrome."
      ]
    },
    playwrightNoPom: {
      file: "tests/rawLogs.spec.ts",
      code: `import { test } from '@playwright/test';

test('Anti-Pattern Logging', async ({ page }) => {
    // ANTI-PATTERN: Using console.log instead of proper reporting steps.
    // Console logs disappear when the terminal closes and are not attached to HTML reports!
    console.log("Navigating to Coles...");
    await page.goto('https://www.coles.com.au');
    
    console.log("Searching...");
    await page.locator('#searchTerm').fill('Apples');
});`
    },
    seleniumNoPom: {
      file: "src/test/java/tests/RawLogsTest.java",
      code: `package tests;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class RawLogsTest {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        
        // ANTI-PATTERN: Using System.out.println instead of proper HTML reporters.
        // Stakeholders cannot read terminal logs!
        System.out.println("Starting test execution...");
        driver.get("https://www.coles.com.au");
        
        System.out.println("Test completed.");
        driver.quit();
    }
}`
    },
    pomBenefitsSummary: [
      { title: "1. Stakeholder Visibility", desc: "A 'No POM/Raw Log' framework outputs standard terminal text. A Product Owner cannot read terminal output. Integrating ExtentReports or using Playwright's Native HTML reporter provides a graphical dashboard with pie charts, making the automation suite's health instantly visible to management." },
      { title: "2. Debugging Speed", desc: "When a test fails, a raw framework just says 'Element not found'. An advanced reporting framework attaches a screenshot, a video, and a stack trace directly to the failing step in the UI, reducing root-cause analysis time from hours to seconds." },
      { title: "3. Step Encapsulation", desc: "By using `test.step()` (Playwright) or `ExtentTest.log()` (Selenium) inside your POM methods, the report automatically groups all the tiny locator actions under one clean, readable header like 'Submit Payment', drastically reducing report noise." }
    ],
    differences: [
      { feature: "Native HTML UI", playwright: "Included entirely out-of-the-box.", selenium: "Not included. Relies entirely on 3rd-party libraries." },
      { feature: "Execution Steps", playwright: "Supports wrapping async code in `test.step()` blocks.", selenium: "Supports flat string logging via `test.log(Status, msg)`." },
      { feature: "CI/CD Publishing", playwright: "Generates a static web app that requires hosting/uploading.", selenium: "ExtentReports generates a single, flat HTML file that can be easily emailed." }
    ],
    interviewInsights: {
      playwright: [
        { q: "What is the Playwright HTML Reporter?", a: "It is the default, zero-config reporting tool in Playwright that generates a static web app containing test results, traces, videos, screenshots, and step-by-step execution logs." },
        { q: "How do you group actions in the Playwright report?", a: "By wrapping your actions inside `await test.step('Description', async () => { ... })`. This collapses all internal actions under a readable dropdown in the final HTML report." },
        { q: "How do you publish a Playwright report in GitHub Actions?", a: "You use the `actions/upload-artifact` step in your YAML file to upload the `playwright-report/` directory so it can be downloaded and viewed after the CI run finishes." },
        { q: "Can you use Allure with Playwright?", a: "Yes. Playwright supports custom third-party reporters. You install the `allure-playwright` package and add it to the reporters array in `playwright.config.ts`." },
        { q: "How do you output a JUnit XML report for CI integration?", a: "You configure the JUnit reporter: `reporter: [['junit', { outputFile: 'results.xml' }]]`. Most CI systems (like Jenkins or GitLab) can parse this standard XML to generate trend graphs." }
      ],
      selenium: [
        { q: "What is ExtentReports?", a: "ExtentReports is an open-source, third-party reporting library for Java/C# that creates highly interactive, visually appealing HTML dashboards for Selenium test executions." },
        { q: "How do you integrate ExtentReports with TestNG?", a: "You typically create an `ITestListener`. In the `onStart` method, you initialize the report. In the `onTestSuccess`/`onTestFailure` methods, you log the status and attach screenshots, and finally call `extent.flush()` in `onFinish`." },
        { q: "What is the purpose of `extent.flush()`?", a: "It commands the ExtentReports engine to gather all logged data, statuses, and attached screenshots in memory and physically write them into the output HTML file. If you forget it, the report will be blank." },
        { q: "What is Allure Framework?", a: "Allure is a popular multi-language reporting tool. Unlike ExtentReports, which generates an HTML file directly, Allure generates raw JSON data during execution, which must then be compiled into an HTML report using the Allure Command Line tool." },
        { q: "Why shouldn't you use `System.out.println` for test automation reporting?", a: "Standard out logs only go to the execution console. They are volatile, cannot attach image evidence, cannot be easily parsed by CI/CD tools, and are completely unreadable for business stakeholders." }
      ],
      comparison: [
        { q: "Compare the setup effort for HTML reporting in both tools.", a: "Playwright requires zero configuration—it generates a robust HTML dashboard out of the box. Selenium requires adding Maven dependencies, writing Manager classes, and hooking up TestNG Listeners to achieve similar visual results." },
        { q: "How do both tools attach screenshots to reports?", a: "In Playwright, configuring `screenshot: 'only-on-failure'` automatically embeds the image into the native HTML report. In Selenium with ExtentReports, you must manually capture the file and link it via `MediaEntityBuilder.createScreenCaptureFromPath()`." },
        { q: "Which tool provides better historical trend reporting out of the box?", a: "Neither native Playwright HTML nor basic ExtentReports track historical data across multiple CI runs natively. Both require integration with tools like Allure (with history plugins) or a central dashboard like ReportPortal." },
        { q: "Compare how custom test metadata (like JIRA ticket IDs) is added.", a: "In Playwright, you can use test annotations: `test.info().annotations.push({ type: 'issue', description: 'JIRA-123' })`. In Selenium/ExtentReports, you can assign categories: `test.assignCategory(\"JIRA-123\")`." },
        { q: "How are the final reports structured on the disk?", a: "ExtentReports (Spark) generates a single, standalone HTML file that can be emailed. Playwright's HTML report generates a full folder of assets (HTML, CSS, JS, WebM videos, ZIP traces) which must be hosted on a server or viewed via the CLI." }
      ]
    },
    practiceTask: "Integrate a custom `test.step()` (Playwright) or `ExtentTest.log()` (Selenium) into the Woolworths Checkout test that explicitly logs 'Added Milk to Cart'."
  },
  {
    id: 11,
    title: "Lesson 11: Test Data Management",
    concept: "Decoupling hardcoded data from test scripts using external files to drive test execution.",
    analogy: "If a Woolworths manager needs to check the prices of 50 different items, they don't memorize all 50 prices in their head (hardcoding data). They hold a master spreadsheet (Data File) and simply read down the list item by item. In automation, we decouple our 'Shopping List' (Test Data) from the 'Shopper' (Test Script). The script simply loops through the list, meaning we can test 100 products without writing 100 different test scripts!",
    flow: [
      "Create an external JSON/Data file with product names and expected prices",
      "Import or read the data file into the test environment",
      "Loop through the data rows (Data-Driven Testing)",
      "Execute the UI steps using the current row's dynamic data",
      "Assert the UI matches the expected data from the file"
    ],
    dependentConcepts: [
      {
        title: "1. Storing External Data (JSON)",
        desc: "Best practice dictates keeping test logic and test data completely separate.",
        playwright: `// data/products.json\n[\n  { "item": "Milk", "price": "$2.50" },\n  { "item": "Bread", "price": "$3.00" }\n]`,
        selenium: `// data/products.json\n[\n  { "item": "Milk", "price": "$2.50" },\n  { "item": "Bread", "price": "$3.00" }\n]`
      },
      {
        title: "2. Importing Data into Tests",
        desc: "Reading the JSON file into the execution context.",
        playwright: `// Playwright natively imports JSON as a JS array\nimport testData from '../data/products.json';\n\nfor (const data of testData) {\n  test(\`Check \${data.item}\`, async () => { ... });\n}`,
        selenium: `// Selenium requires TestNG @DataProvider\n// Often paired with Jackson library to parse JSON\n@DataProvider(name = "items")\npublic Object[][] getData() { /* mapping logic */ }`
      },
      {
        title: "3. Environment Variables (Secrets)",
        desc: "Handling sensitive data like passwords that shouldn't be in JSON files.",
        playwright: `// Loaded via .env files natively\nawait page.fill('#pass', process.env.WOOLIES_PASSWORD);`,
        selenium: `// Loaded via Java System properties\ndriver.findElement(By.id("pass")).sendKeys(System.getenv("WOOLIES_PASSWORD"));`
      },
      {
        title: "4. Dynamic Data (Faker)",
        desc: "Generating random data (like emails) on the fly for registration forms.",
        playwright: `// using faker.js\nimport { faker } from '@faker-js/faker';\nconst email = faker.internet.email();`,
        selenium: `// using Java Faker\nFaker faker = new Faker();\nString email = faker.internet().emailAddress();`
      }
    ],
    pomAnalogy: "Using POM alongside Data Management creates the ultimate scalable framework. The 'Test Data' is the shopping list. The 'Test Script' is the shopper reading the list. The 'Page Object' is the supermarket layout. If the list changes, you only update the JSON. If the layout changes, you only update the POM. The shopper (Test Script) never needs retraining!",
    playwright: [
      {
        file: "data/products.json",
        code: `[
  { "product": "Full Cream Milk 2L", "expectedPrice": "$3.10" },
  { "product": "White Bread 600g", "expectedPrice": "$2.50" }
]`
      },
      {
        file: "tests/dataDrivenFlow.spec.ts",
        code: `import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import productsData from '../data/products.json';

// We loop through the JSON array to create multiple test cases automatically!
for (const item of productsData) {
    
    test(\`Verify Woolworths pricing for \${item.product}\`, async ({ page }) => {
        const homePage = new HomePage(page);
        
        await homePage.goto();
        await homePage.searchFor(item.product);
        
        // Asserting against the external JSON data
        const actualPrice = await page.locator('.price-tag').first().textContent();
        expect(actualPrice).toBe(item.expectedPrice);
    });
}`
      }
    ],
    selenium: [
      {
        file: "src/test/java/data/ProductsDataProvider.java",
        code: `package data;

import org.testng.annotations.DataProvider;

// In Java, TestNG DataProviders are natively used to inject multi-row data.
// Advanced frameworks will read a JSON file here and convert it to this Object array.
public class ProductsDataProvider {
    
    @DataProvider(name = "WoolworthsProducts")
    public static Object[][] getProductData() {
        return new Object[][] {
            { "Full Cream Milk 2L", "$3.10" },
            { "White Bread 600g", "$2.50" }
        };
    }
}`
      },
      {
        file: "src/test/java/tests/DataDrivenTest.java",
        code: `package tests;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.*;
import pages.HomePage;
import data.ProductsDataProvider;

public class DataDrivenTest {
    WebDriver driver;

    @BeforeMethod
    public void setup() { driver = new ChromeDriver(); }

    // TestNG automatically links and loops the test via the dataProvider name
    @Test(dataProvider = "WoolworthsProducts", dataProviderClass = ProductsDataProvider.class)
    public void verifyPricing(String product, String expectedPrice) {
        HomePage homePage = new HomePage(driver);
        
        homePage.goTo();
        homePage.searchFor(product);
        
        String actualPrice = driver.findElement(homePage.getPriceTagLocator()).getText();
        
        // Asserting against the dynamically injected test data
        Assert.assertEquals(actualPrice, expectedPrice, "Price mismatch!");
    }

    @AfterMethod
    public void teardown() { driver.quit(); }
}`
      }
    ],
    executionGuide: {
      playwright: [
        "Create 'products.json' in a 'data' folder.",
        "Create 'dataDrivenFlow.spec.ts' in 'tests'.",
        "Run the tests: npx playwright test tests/dataDrivenFlow.spec.ts",
        "The report will show 2 distinct, separate tests executed!"
      ],
      selenium: [
        "Create 'ProductsDataProvider.java' in the 'data' package.",
        "Create 'DataDrivenTest.java' in the 'tests' package.",
        "Run via TestNG XML or IDE Test Runner. It will execute the test twice."
      ]
    },
    playwrightNoPom: {
      file: "tests/hardcodedFlowRaw.spec.ts",
      code: `import { test, expect } from '@playwright/test';

// Anti-Pattern: Hardcoded data directly in the script
test('Verify pricing (Hardcoded)', async ({ page }) => {
    await page.goto('https://www.coles.com.au');
    
    // Data is tied directly to logic
    await page.locator('#search').fill('Full Cream Milk 2L');
    await page.locator('#search-btn').click();
    
    const price = await page.locator('.price-tag').first().textContent();
    // Expected value is tied directly to logic
    expect(price).toBe('$3.10');
    
    // To test Bread, you would have to copy-paste this entire test block!
});`
    },
    seleniumNoPom: {
      file: "src/test/java/tests/HardcodedTestRaw.java",
      code: `package tests;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.Test;

public class HardcodedTestRaw {
    
    // Anti-Pattern: Hardcoded data directly in the script
    @Test
    public void verifyPricing() {
        WebDriver driver = new ChromeDriver();
        driver.get("https://www.coles.com.au");
        
        // Data is tied directly to logic
        driver.findElement(By.id("search")).sendKeys("Full Cream Milk 2L");
        driver.findElement(By.id("search-btn")).click();
        
        String price = driver.findElement(By.className("price-tag")).getText();
        // Expected value is tied directly to logic
        Assert.assertEquals(price, "$3.10");
        
        driver.quit();
    }
}`
    },
    pomBenefitsSummary: [
      { title: "1. Massive Reduction in Code Duplication", desc: "In the No POM/No Data approach, testing 50 products requires copying and pasting the test block 50 times. In the Data-Driven approach, testing 50 products requires ZERO new code—you simply add 50 lines to the JSON file." },
      { title: "2. Non-Technical Maintenance", desc: "When Woolworths updates their milk prices, a manual QA tester or Business Analyst can simply open the `products.json` file and update the price. They do not need to understand TypeScript or Java to maintain the test suite." },
      { title: "3. Clearer Reporting", desc: "When tests iterate through external data, modern CI/CD reporters group the results neatly, showing exactly which data row passed or failed, rather than showing a monolithic script failure." }
    ],
    differences: [
      { feature: "Data Import", playwright: "Native JSON module resolution", selenium: "Requires parsing library (Jackson) or TestNG DataProviders" },
      { feature: "Iteration Method", playwright: "Standard Javascript `for...of` loop generating `test()` blocks", selenium: "TestNG `@Test(dataProvider)` annotation logic" },
      { feature: "Dynamic Data", playwright: "Easily uses `@faker-js/faker`", selenium: "Easily uses `java-faker` library" }
    ],
    interviewInsights: {
      playwright: [
        { q: "How do you implement Data-Driven Testing in Playwright?", a: "By importing a JSON or CSV file into the spec file, and wrapping the `test()` block inside a standard Javascript `for...of` or `forEach` loop. This dynamically generates a unique test case for each row of data." },
        { q: "How do you ensure test names are unique in a Playwright data loop?", a: "You must use template literals and inject a unique value from the data into the test name parameter. E.g., `test(\`Testing product \${data.itemName}\`, ...)`." },
        { q: "How do you manage environment-specific data (QA vs Staging)?", a: "By utilizing `.env` files and the `dotenv` npm package. You can store URLs and credentials in `.env.qa` and `.env.staging`, and load them via `process.env.BASE_URL` depending on the execution command." },
        { q: "What is `@faker-js/faker` used for?", a: "It is an external library used to generate massive amounts of realistic fake data (names, addresses, credit cards) on the fly. It is critical for testing registration flows without colliding with existing database entries." },
        { q: "Should you store passwords in your test data JSON files?", a: "Never. Passwords and API tokens should be injected dynamically via Environment Variables or a Secrets Manager (like GitHub Secrets) to prevent exposing them in source control." }
      ],
      selenium: [
        { q: "What is a DataProvider in TestNG?", a: "A `@DataProvider` is a method that returns a 2D array of objects (`Object[][]`). It passes data, row by row, into a `@Test` method, allowing you to execute the exact same test logic multiple times with different inputs." },
        { q: "How do you read data from an Excel file in Java?", a: "You use the Apache POI library. You write a utility method that parses the `.xlsx` file, extracts the rows and cells, and converts them into the `Object[][]` format expected by the TestNG DataProvider." },
        { q: "Why is JSON often preferred over Excel for test data today?", a: "JSON is plain text, making it extremely lightweight, natively supported by modern web APIs, and easy to review in Git Pull Requests (unlike binary Excel files which cause unreadable merge conflicts)." },
        { q: "How do you handle configuration data (like browser type or timeouts) in Selenium?", a: "Typically via a `config.properties` file. You use the native Java `Properties` class to load the file into an input stream and read the key-value pairs during the `@BeforeSuite` setup phase." },
        { q: "What is state leakage in data-driven testing?", a: "State leakage occurs when Test Iteration 1 modifies the application (e.g., adding an item to a cart) but doesn't clean up, causing Test Iteration 2 to fail because the cart isn't empty. Tests must be independent and reset state." }
      ],
      comparison: [
        { q: "Compare how Data-Driven Testing is architected in both tools.", a: "Playwright leverages native language loops (`for...of`) to programmatically spawn tests. Selenium relies on the TestNG framework's specific `@DataProvider` annotation pattern to inject variables into the test method." },
        { q: "Which format is easier to import out-of-the-box?", a: "JSON in Playwright. TypeScript/Node resolves `.json` files natively as objects. Java requires adding a parsing library like Jackson or Gson to map JSON files to Java POJO classes." },
        { q: "How do both tools integrate with CI/CD secrets?", a: "Both tools read from the operating system's environment variables. Playwright uses `process.env.VAR_NAME`, while Java uses `System.getenv(\"VAR_NAME\")`." },
        { q: "Compare the use of CSV files for test data.", a: "Both tools can use CSVs, but both require external parsing libraries. Playwright uses `csv-parse`, while Java uses `OpenCSV`. Due to this overhead, JSON is generally preferred in modern stacks." },
        { q: "If a data-driven loop has 10 items, and item 3 fails, what happens to the remaining 7?", a: "In both Playwright (using a loop over `test()`) and Selenium (using DataProvider), the framework treats each iteration as an isolated test case. Item 3 will be marked as failed, but items 4-10 will continue to execute." }
      ]
    },
    practiceTask: "Create a 'users.json' file with invalid login credentials. Write a data-driven test that loops through the JSON and asserts that the Coles login page displays an 'Invalid Credentials' error for each set."
  },
  {
    id: 12,
    title: "Lesson 12: Authentication & Session Handling",
    concept: "Bypassing login screens via cookies and tokens.",
    analogy: "Imagine a Woolworths employee swiping their ID card every single time they want to open the cash register, enter the stockroom, or use the scanner. It wastes too much time! Instead, they swipe once in the morning to get a 'Session Badge' (a cookie or token) that they wear all day. In automation, instead of writing code to log in at the start of every single test, we log in once, save the 'Session Badge', and give it to all other tests so they start already logged in.",
    flow: [
      "Run a Global Setup script before the main suite begins",
      "Navigate to the Coles Login page and submit credentials",
      "Wait for the Dashboard to load (confirming authentication)",
      "Extract the browser's Cookies and Local Storage to a saved file",
      "Inject this saved file into all subsequent test browsers so they start authenticated"
    ],
    dependentConcepts: [
      {
        title: "1. Cookies & Local Storage",
        desc: "The small pieces of data the browser uses to remember who you are after you log in.",
        playwright: `// Playwright automatically saves everything to a JSON file\nawait page.context().storageState({ path: 'auth.json' });`,
        selenium: `// Selenium requires manually extracting cookies from the driver\nSet<Cookie> cookies = driver.manage().getCookies();\n// Code to write cookies to a file...`
      },
      {
        title: "2. Global Setup",
        desc: "A script that runs exactly once before the entire test suite starts.",
        playwright: `// Configured in playwright.config.ts\nexport default defineConfig({\n  globalSetup: require.resolve('./global-setup.ts'),\n});`,
        selenium: `// Configured using TestNG @BeforeSuite\n@BeforeSuite\npublic void globalLogin() { /* login logic */ }`
      },
      {
        title: "3. Injecting State",
        desc: "Loading the saved session data into a brand new, empty browser instance.",
        playwright: `// Playwright injects the auth.json natively via config\nuse: { storageState: 'auth.json' }`,
        selenium: `// Selenium requires navigating to the domain, then adding cookies\ndriver.get("https://coles.com.au");\ndriver.manage().addCookie(new Cookie("session_id", "12345"));\ndriver.navigate().refresh();`
      },
      {
        title: "4. UI vs API Authentication",
        desc: "Logging in via the UI is slow. Advanced frameworks log in via a backend API request to get the token instantly.",
        playwright: `// Instant API Login\nconst response = await request.post('/api/login', { data: creds });\n// Save token from response...`,
        selenium: `// Requires libraries like RestAssured to make the POST request\nResponse res = RestAssured.given().body(creds).post("/api/login");`
      }
    ],
    pomAnalogy: "If you don't use session management, every single test must instantiate the `LoginPage` object and run the login method. It's like forcing the store manager to unlock the front doors for every individual customer! By handling authentication globally, your `CheckoutPage` tests can jump straight to checkout without worrying about login steps.",
    playwright: [
      {
        file: "utils/global-setup.ts",
        code: `import { chromium, FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // 1. Perform the UI login once
  await page.goto('https://www.coles.com.au/login');
  await page.fill('#username', 'testuser');
  await page.fill('#password', 'SecurePass1!');
  await page.click('#submit');
  
  // Wait for the dashboard to ensure the session cookie is set
  await page.waitForSelector('#user-dashboard');
  
  // 2. Save the cookies and local storage to a file
  await page.context().storageState({ path: 'auth.json' });
  await browser.close();
}
export default globalSetup;`
      },
      {
        file: "playwright.config.ts",
        code: `import { defineConfig } from '@playwright/test';

export default defineConfig({
  // Tell Playwright to run the setup script before any tests
  globalSetup: require.resolve('./utils/global-setup'),
  use: {
    // Inject the saved cookies into every new test automatically!
    storageState: 'auth.json',
    baseURL: 'https://www.coles.com.au',
  },
});`
      },
      {
        file: "tests/checkout.spec.ts",
        code: `import { test, expect } from '@playwright/test';

// Because of storageState, this test STARTS already logged in!
test('Checkout flow skips login', async ({ page }) => {
    // We go straight to the protected page
    await page.goto('/checkout');
    await expect(page.locator('.user-welcome')).toContainText('testuser');
});`
      }
    ],
    selenium: [
      {
        file: "src/test/java/utils/AuthUtils.java",
        code: `package utils;

import org.openqa.selenium.Cookie;
import org.openqa.selenium.WebDriver;
import java.util.Set;

public class AuthUtils {
    public static Set<Cookie> sessionCookies;

    // 1. Perform login and store cookies in memory
    public static void performGlobalLogin(WebDriver driver) {
        driver.get("https://www.coles.com.au/login");
        // ... login actions ...
        
        // Wait for dashboard
        // ... wait logic ...
        
        // 2. Save the cookies generated by the server
        sessionCookies = driver.manage().getCookies();
    }

    // 3. Inject cookies into a new driver
    public static void injectCookies(WebDriver driver) {
        if (sessionCookies != null) {
            for (Cookie cookie : sessionCookies) {
                driver.manage().addCookie(cookie);
            }
        }
    }
}`
      },
      {
        file: "src/test/java/tests/BaseTest.java",
        code: `package tests;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.annotations.*;
import utils.AuthUtils;

public class BaseTest {
    protected WebDriver driver;

    @BeforeSuite
    public void globalSetup() {
        WebDriver setupDriver = new ChromeDriver();
        AuthUtils.performGlobalLogin(setupDriver);
        setupDriver.quit();
    }

    @BeforeMethod
    public void testSetup() {
        driver = new ChromeDriver();
        // 1. Must navigate to domain before setting cookies!
        driver.get("https://www.coles.com.au");
        
        // 2. Inject the saved session
        AuthUtils.injectCookies(driver);
        
        // 3. Refresh to apply the authenticated state
        driver.navigate().refresh();
    }
}`
      }
    ],
    executionGuide: {
      playwright: [
        "Create 'global-setup.ts' in a 'utils' folder.",
        "Update 'playwright.config.ts' with the `globalSetup` and `storageState` properties.",
        "Run the tests: Playwright will automatically execute global-setup first, create 'auth.json', and then run your tests logged in."
      ],
      selenium: [
        "Create 'AuthUtils.java' in the 'utils' package.",
        "Update 'BaseTest.java' with `@BeforeSuite` logic.",
        "Run your TestNG suite. The first browser will flash to log in, and all subsequent browsers will magically bypass the login screen."
      ]
    },
    playwrightNoPom: {
      file: "tests/redundantLoginRaw.spec.ts",
      code: `import { test } from '@playwright/test';

// Anti-Pattern: Executing UI login inside every single test
test.beforeEach(async ({ page }) => {
    await page.goto('https://www.coles.com.au/login');
    await page.fill('#username', 'testuser');
    await page.fill('#password', 'SecurePass1!');
    await page.click('#submit');
    await page.waitForSelector('#user-dashboard');
});

test('Check cart', async ({ page }) => {
    // Navigates to cart after the slow beforeEach login
    await page.goto('/cart');
});`
    },
    seleniumNoPom: {
      file: "src/test/java/tests/RedundantLoginRaw.java",
      code: `package tests;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.annotations.BeforeMethod;

public class RedundantLoginRaw {
    WebDriver driver;

    // Anti-Pattern: Executing UI login inside every single test
    @BeforeMethod
    public void setup() {
        driver = new ChromeDriver();
        driver.get("https://www.coles.com.au/login");
        driver.findElement(By.id("username")).sendKeys("testuser");
        driver.findElement(By.id("password")).sendKeys("SecurePass1!");
        driver.findElement(By.id("submit")).click();
        // Wait for dashboard...
    }
}`
    },
    pomBenefitsSummary: [
      { title: "1. Massive Execution Speed Increase", desc: "UI logins are slow (typing, waiting for redirects, loading dashboards). If a login takes 5 seconds, and you have 100 tests using the Anti-Pattern, you waste over 8 minutes just logging in! Global session handling does it once, saving all that time." },
      { title: "2. Reduced Flakiness", desc: "Login pages often have CAPTCHAs, bot-protections, or rate limits. If your automation script hits the login endpoint 100 times in 2 minutes, Woolworths' security firewalls will block your test IP. Logging in once avoids triggering rate limits." },
      { title: "3. True Test Isolation", desc: "By injecting the state file, tests don't have to navigate through the entire UI journey just to reach the 'Checkout' page. They can navigate directly to the target URL, meaning a failure in the login UI won't falsely fail the Checkout tests." }
    ],
    differences: [
      { feature: "State Extraction", playwright: "Native one-liner: `storageState()` captures both cookies AND localStorage.", selenium: "Must manually iterate over `driver.manage().getCookies()`. LocalStorage requires JavascriptExecutor." },
      { feature: "State Injection", playwright: "Native zero-code via `playwright.config.ts`.", selenium: "Requires navigating to the URL, explicitly adding cookies, and refreshing the page." },
      { feature: "Multiple Roles", playwright: "Easily handled by saving multiple JSON files (e.g., `admin.json`, `customer.json`) and overriding `use` in `test.use()`.", selenium: "Requires managing multiple cookie Sets in Java memory." }
    ],
    interviewInsights: {
      playwright: [
        { q: "What does `storageState` capture?", a: "`storageState` captures both the cookies and the localStorage of the current browser context and saves them to a JSON file. This is crucial because modern React/Angular apps often store JWT tokens in localStorage, not just cookies." },
        { q: "How do you test two different user roles (Admin and Customer) in the same file?", a: "You can use `test.use({ storageState: 'adminAuth.json' });` at the `test.describe` level to override the global configuration for a specific block of tests." },
        { q: "What is `globalSetup` in Playwright?", a: "A configuration property pointing to a script that executes exactly once before all worker processes start. It is the perfect place to seed databases, start local servers, or perform global UI authentication." },
        { q: "Can you log in via an API request instead of the UI in Playwright?", a: "Yes. In the `globalSetup`, you can use the built-in `request.post()` API context to send credentials to the backend, receive the token, and manually construct the `storageState` JSON file. This is exponentially faster than a UI login." },
        { q: "What happens if the session cookie expires halfway through the test suite?", a: "The tests will start failing. To handle this, `globalSetup` should be configured to check if the `auth.json` file exists and if the token is still valid. If invalid or expired, it should trigger the login flow again." }
      ],
      selenium: [
        { q: "How do you retrieve cookies in Selenium?", a: "By using `driver.manage().getCookies()`, which returns a `Set<Cookie>` object containing all cookies for the current domain." },
        { q: "Why must you call `driver.get(url)` before adding cookies in Selenium?", a: "Browser security models prevent you from setting a cookie for a domain that the browser is not currently on. You must navigate to the target domain (e.g., Coles) first, add the cookie, and then refresh." },
        { q: "How do you handle LocalStorage in Selenium?", a: "Selenium's standard API only manages Cookies. To extract or set LocalStorage (often needed for modern JWT tokens), you must use the `JavascriptExecutor` to run `window.localStorage.setItem('key', 'value');`." },
        { q: "What is the difference between `@BeforeSuite` and `@BeforeMethod`?", a: "`@BeforeSuite` runs exactly once before the entire TestNG XML execution begins (perfect for Global Login). `@BeforeMethod` runs before every single `@Test` method (perfect for injecting the saved cookies into a fresh driver)." },
        { q: "How do you achieve API Login in a Selenium framework?", a: "Because Selenium does not have native API request capabilities, you must integrate a library like RestAssured or Apache HttpClient to make the POST request, parse the response for the token, and then inject it via Selenium's JavascriptExecutor." }
      ],
      comparison: [
        { q: "Compare how both tools manage LocalStorage data for authentication.", a: "Playwright captures and injects LocalStorage automatically via `storageState`. Selenium requires writing custom JavaScript injection wrappers because its native `Options` API only handles standard Cookies." },
        { q: "Which tool requires a page refresh to apply authentication?", a: "Selenium. You must load the domain, inject the cookie, and call `driver.navigate().refresh()` so the browser sends the cookie to the server. Playwright injects the state into the browser context *before* navigation occurs, requiring no refresh." },
        { q: "Compare the difficulty of API-based authentication.", a: "Playwright has a native `APIRequestContext` making it easy to send POST requests and parse JSON responses without third-party libraries. Selenium requires integrating heavy libraries like RestAssured to accomplish the same." },
        { q: "How do both tools isolate authenticated sessions in parallel execution?", a: "In Playwright, each worker's `BrowserContext` is given its own isolated copy of the `storageState`, preventing cross-pollution. In Selenium, as long as `ThreadLocal` is used, each WebDriver instance holds its own isolated cookie jar." },
        { q: "Is it possible to have multiple active sessions (e.g., a chat between User A and User B) in the same test?", a: "Yes. In Selenium, you must instantiate two separate `WebDriver` objects. In Playwright, you can instantiate two separate `BrowserContext` objects within the same test and assign them different `storageState` files." }
      ]
    },
    practiceTask: "Use Playwright's `globalSetup` to log into Woolworths and save the state. Then write a test that directly navigates to '/account/details' and verifies the user's name is displayed."
  },
  {
    id: 13,
    title: "Lesson 13: Advanced Topics (iFrames, Alerts, Upload)",
    concept: "Handling complex browser contexts and OS-level file systems.",
    analogy: "Think of an iFrame like a third-party EFTPOS machine sitting at the Woolworths checkout. It is physically inside Woolworths, but it operates on the bank's isolated system. You cannot scan a Woolworths barcode scanner on the EFTPOS machine! You must explicitly 'switch' your focus to the EFTPOS machine to type your PIN. Similarly, a JavaScript Alert is like a cashier unexpectedly asking 'Do you have a Rewards card?'—you must answer before doing anything else. A File Upload is like handing a physical, printed recipe to the Deli counter.",
    flow: [
      "Navigate to the Woolworths Careers portal",
      "Trigger and accept a JavaScript Alert popup",
      "Switch focus into the embedded 'Application Form' iFrame",
      "Locate the file input and upload a PDF Resume",
      "Submit the form inside the iFrame"
    ],
    dependentConcepts: [
      {
        title: "1. Handling JavaScript Alerts",
        desc: "Popups created by the browser (`alert()`, `confirm()`). They block the main page until answered.",
        playwright: `// Playwright auto-dismisses alerts! To ACCEPT, set a listener BEFORE the action:\npage.once('dialog', dialog => dialog.accept());\nawait page.click('#apply-btn'); // Triggers alert`,
        selenium: `// Selenium requires switching to the alert AFTER the action:\ndriver.findElement(By.id("apply-btn")).click();\nAlert alert = driver.switchTo().alert();\nalert.accept();`
      },
      {
        title: "2. Identifying iFrames",
        desc: "An <iframe> embeds an entirely separate HTML document into the current page.",
        playwright: `// Identify the frame using a specialized locator\nconst formFrame = page.frameLocator('#application-iframe');`,
        selenium: `// Explicitly switch the driver's context to the frame by ID/Name\ndriver.switchTo().frame("application-iframe");`
      },
      {
        title: "3. Interacting Inside the iFrame",
        desc: "Once located/switched, you execute normal actions constrained to the iFrame's DOM.",
        playwright: `// Chain locators directly off the frameLocator\nawait formFrame.locator('#first-name').fill('John');`,
        selenium: `// Normal interaction, because context is already switched\ndriver.findElement(By.id("first-name")).sendKeys("John");\n// CRITICAL: Switch back when done!\ndriver.switchTo().defaultContent();`
      },
      {
        title: "4. File Uploads",
        desc: "Bypassing the native Windows/Mac file explorer dialog.",
        playwright: `// Pass the absolute or relative file path natively\nawait page.locator('input[type="file"]').setInputFiles('resume.pdf');`,
        selenium: `// Send the absolute file path directly as keystrokes\ndriver.findElement(By.cssSelector("input[type='file']")).sendKeys("C:/resume.pdf");`
      }
    ],
    pomAnalogy: "If you hardcode frame switching in your main test script, it's like forcing the store manager to personally operate the EFTPOS machine for every customer. By using POM, we encapsulate the EFTPOS (iFrame) logic inside a dedicated `ApplicationFormPage` class. The main test simply says `appPage.fillDetails()`, completely hiding the complex context switching from the test script.",
    playwright: [
      {
        file: "pages/ApplicationFormPage.ts",
        code: `import { Page, Locator, FrameLocator } from '@playwright/test';

export class ApplicationFormPage {
    readonly page: Page;
    readonly applyBtn: Locator;
    readonly formFrame: FrameLocator;
    readonly nameInput: Locator;
    readonly resumeUpload: Locator;

    constructor(page: Page) {
        this.page = page;
        this.applyBtn = page.locator('#start-application-btn');
        
        // 1. Define the FrameLocator
        this.formFrame = page.frameLocator('#third-party-workday-iframe');
        
        // 2. Define locators INSIDE the frame by chaining
        this.nameInput = this.formFrame.locator('#applicant-name');
        this.resumeUpload = this.formFrame.locator('input[type="file"]');
    }

    async clickApplyWithAlert() {
        // Setup listener BEFORE triggering the alert
        this.page.once('dialog', dialog => dialog.accept());
        await this.applyBtn.click();
    }

    async uploadResumeAndSubmit(name: string, filePath: string) {
        // Playwright handles the frame piercing automatically here
        await this.nameInput.fill(name);
        
        // Uploads bypass the OS dialog
        await this.resumeUpload.setInputFiles(filePath);
    }
}`
      },
      {
        file: "tests/careers.spec.ts",
        code: `import { test, expect } from '@playwright/test';
import { ApplicationFormPage } from '../pages/ApplicationFormPage';

test('Woolworths Careers - iFrame and Upload', async ({ page }) => {
    const appPage = new ApplicationFormPage(page);
    await page.goto('https://careers.woolworths.com.au');
    
    // 1. Handle Alert seamlessly via POM
    await appPage.clickApplyWithAlert();
    
    // 2. Interact with iFrame and Upload seamlessly
    await appPage.uploadResumeAndSubmit('Jane Doe', 'test-data/resume.pdf');
});`
      }
    ],
    selenium: [
      {
        file: "src/main/java/pages/ApplicationFormPage.java",
        code: `package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

public class ApplicationFormPage {
    WebDriver driver;
    
    By applyBtn = By.id("start-application-btn");
    String frameId = "third-party-workday-iframe"; // Store ID for switching
    By nameInput = By.id("applicant-name"); // Inside frame
    By resumeUpload = By.cssSelector("input[type='file']"); // Inside frame

    public ApplicationFormPage(WebDriver driver) {
        this.driver = driver;
    }

    public void clickApplyWithAlert() {
        driver.findElement(applyBtn).click();
        // Switch to alert AFTER action
        driver.switchTo().alert().accept();
    }

    public void uploadResumeAndSubmit(String name, String filePath) {
        // 1. Explicitly switch context into the iFrame
        driver.switchTo().frame(frameId);
        
        // 2. Perform actions inside the frame
        driver.findElement(nameInput).sendKeys(name);
        
        // Upload bypasses OS dialog by sending file path
        driver.findElement(resumeUpload).sendKeys(filePath);
        
        // 3. CRITICAL: Switch back to main page context immediately
        driver.switchTo().defaultContent();
    }
}`
      },
      {
        file: "src/test/java/tests/CareersTest.java",
        code: `package tests;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import pages.ApplicationFormPage;

public class CareersTest {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        try {
            ApplicationFormPage appPage = new ApplicationFormPage(driver);
            driver.get("https://careers.woolworths.com.au");
            
            // 1. Handle Alert
            appPage.clickApplyWithAlert();
            
            // 2. Handle iFrame & Upload (Context switching hidden in POM)
            // Absolute path required for Selenium uploads
            appPage.uploadResumeAndSubmit("Jane Doe", "C:/test-data/resume.pdf");
            
        } finally {
            driver.quit();
        }
    }
}`
      }
    ],
    executionGuide: {
      playwright: [
        "Create 'ApplicationFormPage.ts' in the 'pages' folder.",
        "Create 'careers.spec.ts' in the 'tests' folder.",
        "Ensure a mock 'resume.pdf' exists in a 'test-data' folder.",
        "Run: npx playwright test tests/careers.spec.ts"
      ],
      selenium: [
        "Create 'ApplicationFormPage.java' in 'src/main/java/pages'.",
        "Create 'CareersTest.java' in 'src/test/java/tests'.",
        "Update the hardcoded file path to match your local Windows/Mac directory.",
        "Run the main method inside 'CareersTest.java'."
      ]
    },
    playwrightNoPom: {
      file: "tests/iframeRaw.spec.ts",
      code: `import { test } from '@playwright/test';

test('Raw iFrame handling', async ({ page }) => {
    await page.goto('https://careers.woolworths.com.au');

    // Alert handling mixed in
    page.once('dialog', dialog => dialog.accept());
    await page.locator('#start-application-btn').click();

    // Frame locator chained dynamically, hard to read
    await page.frameLocator('#third-party-workday-iframe')
              .locator('input[type="file"]')
              .setInputFiles('resume.pdf');
});`
    },
    seleniumNoPom: {
      file: "src/test/java/tests/IframeTestRaw.java",
      code: `package tests;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class IframeTestRaw {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        try {
            driver.get("https://careers.woolworths.com.au");

            driver.findElement(By.id("start-application-btn")).click();
            driver.switchTo().alert().accept();

            // Manual context switching in test
            driver.switchTo().frame("third-party-workday-iframe");
            driver.findElement(By.cssSelector("input[type='file']")).sendKeys("C:/resume.pdf");
            
            // Forgetting this next line is the #1 cause of iFrame bugs!
            driver.switchTo().defaultContent();
            
        } finally {
            driver.quit();
        }
    }
}`
    },
    pomBenefitsSummary: [
      { title: "1. Isolation of Context Switching", desc: "In the No POM Selenium script, `driver.switchTo().frame()` is exposed directly in the test. If a junior engineer forgets to add `defaultContent()` afterwards, every subsequent test step will fail. The POM encapsulates this risk entirely within the `uploadResumeAndSubmit()` method." },
      { title: "2. Reusable Event Listeners", desc: "Playwright requires alert listeners to be attached *before* the action. By placing `page.once('dialog')` inside the POM method, the test writer doesn't need to remember the chronological order of asynchronous JavaScript events." },
      { title: "3. Semantic Abstraction", desc: "The raw test requires you to know exactly how the HTML is structured (that the form is an iFrame). The POM test reads as pure business logic: 'Click Apply, Upload Resume'." }
    ],
    differences: [
      { feature: "iFrame Context", playwright: "Handled natively per locator via `frameLocator()`", selenium: "Requires stateful switching (`driver.switchTo().frame`)" },
      { feature: "Alert Timing", playwright: "Listener must be attached BEFORE trigger action", selenium: "Switch to alert AFTER trigger action" },
      { feature: "Default Alert Action", playwright: "Auto-dismisses unexpected alerts", selenium: "Throws `UnhandledAlertException`" }
    ],
    interviewInsights: {
      playwright: [
        { q: "How does Playwright handle unexpected JavaScript alerts?", a: "By default, Playwright automatically dismisses (cancels) all unexpected dialogs to prevent tests from hanging indefinitely. If you want to accept an alert or read its text, you must explicitly attach a `page.on('dialog')` listener." },
        { q: "Can Playwright interact with cross-origin iFrames?", a: "Yes. Unlike older tools, Playwright operates out-of-process and can seamlessly pierce cross-origin iFrames (like Stripe or PayPal embeds) using `frameLocator()`, bypassing standard browser CORS restrictions during testing." },
        { q: "How do you handle multiple tabs/popups triggered by a click?", a: "You use `Promise.all` to wait for the new page event while simultaneously triggering the click: `const [newPage] = await Promise.all([ context.waitForEvent('page'), page.getByText('Open Tab').click() ]);`" },
        { q: "How do you handle file uploads in Playwright?", a: "You use the `setInputFiles` method directly on the file input element: `await page.locator('input[type=\"file\"]').setInputFiles('path/to/file.pdf');` It bypasses the OS file dialog entirely." },
        { q: "What is the difference between `page.frame()` and `page.frameLocator()`?", a: "`page.frame()` is an older method that requires the frame to exist in the DOM immediately. `page.frameLocator()` creates a lazy-evaluating locator that auto-waits for the iFrame to appear, making it much more robust." }
      ],
      selenium: [
        { q: "What exception occurs if you interact with an element inside an iFrame without switching?", a: "You will receive a `NoSuchElementException`. Selenium only searches the current DOM context. If you are in the default content, it cannot 'see' inside the iFrame until you execute `driver.switchTo().frame()`." },
        { q: "How do you switch back to the main HTML page from an iFrame?", a: "You must use `driver.switchTo().defaultContent()`. If you are dealing with nested iFrames (an iFrame inside an iFrame), you can use `driver.switchTo().parentFrame()` to go up one level." },
        { q: "What happens if a Javascript alert appears unexpectedly in Selenium?", a: "Selenium will throw an `UnhandledAlertException` and instantly fail the test when it tries to execute the next WebDriver command." },
        { q: "How do you handle Window Tabs in Selenium?", a: "You must get the `windowHandles` (a Set of string IDs). You iterate through the set, check the title or URL, and use `driver.switchTo().window(handleId)` to change focus." },
        { q: "How do you handle file uploads in Selenium?", a: "If the element is an `<input type=\"file\">`, you bypass the OS window by sending the absolute file path directly to the element using `sendKeys(\"C:/path/file.pdf\")`." }
      ],
      comparison: [
        { q: "Compare how Selenium and Playwright handle context switching (iFrames).", a: "Selenium uses a stateful approach: you explicitly change the driver's focus (`switchTo`), and it remains there until changed back. Playwright uses a stateless, locator-chaining approach (`frameLocator`), meaning you never have to remember to switch back." },
        { q: "Which tool handles shadow DOMs better when dealing with third-party components?", a: "Playwright pierces open shadow DOMs automatically by default. Selenium historically required Javascript Executors to pierce the shadow root, though Selenium 4 introduced `getShadowRoot()`, it is still more verbose than Playwright." },
        { q: "Compare how both tools handle native OS file upload dialogs.", a: "Neither tool interacts well with native Windows/Mac OS dialogs. Both rely on finding the hidden `<input type=\"file\">` tag and injecting the file path directly (via `setInputFiles` in Playwright or `sendKeys` in Selenium)." },
        { q: "Compare Event handling (Alerts).", a: "Selenium blocks execution synchronously when an alert is present, requiring you to switch to it. Playwright handles alerts asynchronously via event listeners, automatically dismissing them if unhandled to prevent test hanging." },
        { q: "How do both tools handle File Downloads?", a: "In Selenium, you must configure ChromeOptions to set a default download directory, then write Java logic to poll the file system to check if the file arrived. Playwright has a native `const download = await page.waitForEvent('download'); await download.saveAs('path');` mechanism." }
      ]
    },
    practiceTask: "Expand the ApplicationFormPage class. Add a method that handles a file download event by clicking a 'Download Job Description' link and verifying the file was successfully saved to disk."
  },
  {
    id: 14,
    title: "Lesson 14: Hooks (Before/After)",
    concept: "Managing test preconditions and teardowns effectively.",
    analogy: "Think of Hooks like the opening and closing procedures of a Woolworths store. \n\n• 'Before All' is unlocking the main doors and turning on the lights at 6 AM (runs once). \n• 'Before Each' is a cashier wiping down the conveyor belt before every single customer (runs repeatedly). \n• 'After Each' is handing the customer their receipt (runs repeatedly). \n• 'After All' is locking the doors and turning off the power at midnight (runs once).",
    flow: [
      "BeforeAll: Initialize database connections / Start Global Driver",
      "BeforeEach: Navigate to the Woolworths Cart page and clear existing items",
      "Test 1: Add Milk to Cart -> Assert",
      "AfterEach: Take screenshot if test fails",
      "Test 2: Add Bread to Cart -> Assert",
      "AfterAll: Close browser / Generate Report"
    ],
    dependentConcepts: [
      {
        title: "1. Global Setup (Before All)",
        desc: "Executes exactly once before the entire suite or file begins.",
        playwright: `test.beforeAll(async () => {\n  // e.g., Setup database mock data\n  console.log('Store Opened');\n});`,
        selenium: `// TestNG Annotation\n@BeforeSuite\npublic void beforeSuite() {\n  // e.g., Initialize ExtentReports\n}`
      },
      {
        title: "2. Test Setup (Before Each)",
        desc: "Executes before every individual test case. Used to reset application state.",
        playwright: `test.beforeEach(async ({ page }) => {\n  await page.goto('https://coles.com.au');\n  // Ensures every test starts on the homepage\n});`,
        selenium: `// TestNG Annotation\n@BeforeMethod\npublic void beforeMethod() {\n  driver = new ChromeDriver();\n  driver.get("https://coles.com.au");\n}`
      },
      {
        title: "3. Test Teardown (After Each)",
        desc: "Executes after every individual test case. Used for cleanup or capturing evidence.",
        playwright: `test.afterEach(async ({ page }, testInfo) => {\n  if (testInfo.status !== testInfo.expectedStatus) {\n    console.log('Test failed, capturing trace');\n  }\n});`,
        selenium: `// TestNG Annotation\n@AfterMethod\npublic void afterMethod(ITestResult result) {\n  if (result.getStatus() == ITestResult.FAILURE) {\n    // capture screenshot logic\n  }\n  driver.quit();\n}`
      },
      {
        title: "4. Global Teardown (After All)",
        desc: "Executes exactly once after the entire suite finishes.",
        playwright: `test.afterAll(async () => {\n  console.log('Store Closed');\n  // e.g., Close database connection\n});`,
        selenium: `// TestNG Annotation\n@AfterSuite\npublic void afterSuite() {\n  extent.flush(); // Write the report\n}`
      }
    ],
    pomAnalogy: "If you don't use Hooks, you have to write `driver.get()` at the top of every test, and `driver.quit()` at the bottom of every test. If a test fails in the middle, it crashes before reaching `driver.quit()`, leaving zombie browsers open on your computer! Hooks guarantee that teardown procedures happen no matter what.",
    playwright: [
      {
        file: "tests/hooksExample.spec.ts",
        code: `import { test, expect } from '@playwright/test';

// test.describe groups related tests together
test.describe('Woolworths Cart Tests', () => {

    // Runs once before the group starts
    test.beforeAll(async () => {
        console.log('Starting Cart Test Suite');
    });

    // Runs before EVERY test
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.woolworths.com.au/cart');
        // Setup: Ensure cart is empty before testing
        await page.evaluate(() => window.localStorage.clear());
    });

    test('Add Milk to Cart', async ({ page }) => {
        // Test logic begins here safely
        await page.locator('#search').fill('Milk');
        // ... assertions ...
    });

    test('Add Bread to Cart', async ({ page }) => {
        // Starts with a fresh cart because of beforeEach!
        await page.locator('#search').fill('Bread');
        // ... assertions ...
    });

    // Runs after EVERY test, even if it failed
    test.afterEach(async ({ page }, testInfo) => {
        console.log(\`Finished test: \${testInfo.title} with status: \${testInfo.status}\`);
    });
});`
      }
    ],
    selenium: [
      {
        file: "src/test/java/tests/HooksExampleTest.java",
        code: `package tests;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.ITestResult;
import org.testng.annotations.*;

public class HooksExampleTest {
    WebDriver driver;

    // Runs once before the class starts
    @BeforeClass
    public void beforeClass() {
        System.out.println("Starting Cart Test Suite");
    }

    // Runs before EVERY test
    @BeforeMethod
    public void setup() {
        driver = new ChromeDriver();
        driver.get("https://www.woolworths.com.au/cart");
        // Setup: Ensure cart is empty
        driver.manage().deleteAllCookies(); 
    }

    @Test
    public void testAddMilk() {
        // Test logic safely isolated
        System.out.println("Testing Milk...");
    }

    @Test
    public void testAddBread() {
        // Starts with a fresh browser because of BeforeMethod!
        System.out.println("Testing Bread...");
    }

    // Runs after EVERY test, even if it failed
    @AfterMethod(alwaysRun = true) // alwaysRun ensures execution on failure
    public void teardown(ITestResult result) {
        System.out.println("Finished test: " + result.getName() + " with status: " + result.getStatus());
        if (driver != null) {
            driver.quit(); // Guaranteed cleanup
        }
    }
}`
      }
    ],
    executionGuide: {
      playwright: [
        "Create 'hooksExample.spec.ts' in your 'tests' folder.",
        "Run the test: npx playwright test tests/hooksExample.spec.ts",
        "Observe the console logs to see the strict execution order."
      ],
      selenium: [
        "Create 'HooksExampleTest.java' in your 'tests' package.",
        "Run the class via TestNG.",
        "Observe the console output to see how the Hooks wrap around the @Test methods."
      ]
    },
    playwrightNoPom: {
      file: "tests/noHooksRaw.spec.ts",
      code: `import { test, expect } from '@playwright/test';

// Anti-Pattern: Duplicating setup code in every test
test('Add Milk', async ({ page }) => {
    // Duplicated setup
    await page.goto('https://www.woolworths.com.au/cart');
    await page.evaluate(() => window.localStorage.clear());
    
    await page.locator('#search').fill('Milk');
});

test('Add Bread', async ({ page }) => {
    // Duplicated setup
    await page.goto('https://www.woolworths.com.au/cart');
    await page.evaluate(() => window.localStorage.clear());
    
    await page.locator('#search').fill('Bread');
});`
    },
    seleniumNoPom: {
      file: "src/test/java/tests/NoHooksTestRaw.java",
      code: `package tests;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.annotations.Test;

public class NoHooksTestRaw {
    
    // Anti-Pattern: Duplicating setup and teardown in every test
    @Test
    public void testAddMilk() {
        WebDriver driver = new ChromeDriver(); // Duplicated
        driver.get("https://www.woolworths.com.au/cart"); // Duplicated
        
        System.out.println("Testing Milk...");
        
        driver.quit(); // Risk: If test fails above, this never executes!
    }

    @Test
    public void testAddBread() {
        WebDriver driver = new ChromeDriver(); // Duplicated
        driver.get("https://www.woolworths.com.au/cart"); // Duplicated
        
        System.out.println("Testing Bread...");
        
        driver.quit(); // Risk: Zombie browsers
    }
}`
    },
    pomBenefitsSummary: [
      { title: "1. Preventing Zombie Processes", desc: "In the raw Selenium approach, if an assertion fails, the script immediately aborts. It never reaches `driver.quit()`. Over 100 tests, this leaves 100 hidden Chrome instances running in the background, crashing your PC. Hooks (`@AfterMethod`) are guaranteed to run regardless of test pass/fail status." },
      { title: "2. The DRY Principle", desc: "Don't Repeat Yourself. If Woolworths changes their cart URL from `/cart` to `/checkout/basket`, a framework without hooks requires you to update 50 different test files. A framework using `BeforeEach` requires exactly one line of code to be updated." },
      { title: "3. Clean Test State", desc: "Tests must be independent. Test B should never fail just because Test A left an item in the cart. Hooks guarantee that every test starts with a completely wiped, sterile environment, eliminating cross-test contamination." }
    ],
    differences: [
      { feature: "Fixture Scope", playwright: "The `page` fixture is naturally scoped to the test block. No manual browser instantiation needed.", selenium: "Driver scope must be managed manually via global variables or ThreadLocal in Base Classes." },
      { feature: "Teardown Guarantee", playwright: "Browser context closes automatically after the test block, regardless of failure.", selenium: "Must use `@AfterMethod(alwaysRun = true)` to guarantee driver closure." },
      { feature: "Grouping", playwright: "Uses `test.describe` blocks to scope before/after hooks to specific groups of tests.", selenium: "Uses TestNG XML `<groups>` or Java Class-level annotations (`@BeforeClass`)." }
    ],
    interviewInsights: {
      playwright: [
        { q: "What is the execution order of Playwright hooks?", a: "1. `beforeAll` (runs once per worker), 2. `beforeEach`, 3. `test`, 4. `afterEach`, 5. `afterAll`." },
        { q: "Can you have multiple `beforeEach` hooks in a single file?", a: "Yes. They will be executed in the order they are declared in the file. You can have a global `beforeEach` at the file level, and a specific `beforeEach` inside a `test.describe` block." },
        { q: "What is the difference between a Test fixture and a Worker fixture in Playwright?", a: "Test fixtures (like `page`, `context`) are set up and torn down for every individual test. Worker fixtures (like `browser`) are set up once per worker process and shared across all tests running in that specific worker to save time." },
        { q: "How do you access test metadata (like pass/fail status) inside a hook?", a: "Playwright injects `testInfo` as the second argument into hooks: `test.afterEach(async ({ page }, testInfo) => { if (testInfo.status === 'failed') { ... } });`" },
        { q: "If a `beforeEach` hook fails, what happens to the test?", a: "The test is immediately marked as failed, and the actual test body is skipped. The `afterEach` hook will still execute." }
      ],
      selenium: [
        { q: "What is the execution order of TestNG setup annotations?", a: "1. `@BeforeSuite`, 2. `@BeforeTest`, 3. `@BeforeClass`, 4. `@BeforeMethod`." },
        { q: "What happens if an assertion fails inside an `@AfterMethod`?", a: "If code inside the teardown hook fails (e.g., failed to take a screenshot), it will mask the original test result and usually mark the teardown as a failure, making debugging difficult. Wrap teardown logic in try/catch blocks." },
        { q: "What does the `alwaysRun = true` parameter do in TestNG?", a: "If a `@BeforeMethod` fails, TestNG skips the test and skips the `@AfterMethod`. Setting `@AfterMethod(alwaysRun = true)` forces TestNG to run the teardown regardless of preceding failures, which is crucial for `driver.quit()`." },
        { q: "Where is the best place to initialize ExtentReports in a TestNG framework?", a: "Inside the `@BeforeSuite` hook, because the reporting engine only needs to be initialized exactly once before any tests across any classes begin executing." },
        { q: "How do you pass variables from a `@BeforeMethod` to a `@Test`?", a: "Typically by storing them as class-level instance variables (e.g., `protected WebDriver driver;`). In parallel execution, you must ensure these variables are thread-safe." }
      ],
      comparison: [
        { q: "Compare how both tools guarantee browser closure after a failure.", a: "Playwright handles this automatically natively. Because the `page` fixture is bound to the test context, it is destroyed when the context ends. Selenium explicitly requires an `@AfterMethod` containing `driver.quit()`." },
        { q: "How do both tools group tests to apply specific hooks?", a: "Playwright uses `test.describe('Group', () => { ... })` to create nested scopes. TestNG uses Java Classes, or the `groups = {\"smoke\"}` parameter in annotations combined with `<groups>` tags in the `testng.xml`." },
        { q: "Compare how both tools access the result of the test during teardown.", a: "Playwright passes the `TestInfo` object into the `afterEach` hook. TestNG passes the `ITestResult` object into the `@AfterMethod` hook. Both allow you to check if the status equals 'FAILED'." },
        { q: "Can hooks be used to retry failed tests?", a: "No, hooks are strictly for setup and teardown. Both frameworks have separate mechanisms (Playwright config `retries` or TestNG `IRetryAnalyzer`) to handle test re-execution." },
        { q: "Where should database seeding occur?", a: "Database seeding (creating users/data needed for the test) should occur in `BeforeAll` or `BeforeSuite` to ensure data exists before any UI interactions attempt to find it." }
      ]
    },
    practiceTask: "Write a Playwright `test.describe` block containing two tests. Add a `test.afterEach` hook that uses `testInfo` to print the execution time of each test to the console."
  },
  {
    id: 15,
    title: "Lesson 15: Retry Logic & Dynamic Elements",
    concept: "Making your framework resilient to network instability and changing DOMs.",
    analogy: "Retry Logic: If a Woolworths EFTPOS machine says 'Network Timeout', you don't instantly abandon your groceries (Fail the test). You pull your card out and try swiping one more time (Retries) before giving up. Dynamic Elements: Imagine looking for a Woolworths 'On Sale' sign. On Monday, the sign's barcode is 'sale-123'. On Tuesday, it changes to 'sale-456'. If you search for the exact barcode, you will fail on Tuesday. Instead, you search dynamically for any sign that *starts with* 'sale-'.",
    flow: [
      "Configure the framework to automatically retry failed tests 2 times",
      "Test attempts to click a dynamically generated 'Promotion' button",
      "Network spikes, the button doesn't load in time, Test fails (Attempt 1)",
      "Framework intercepts failure and restarts the test with a clean state",
      "Test finds the dynamic button using partial matching and passes (Attempt 2)"
    ],
    dependentConcepts: [
      {
        title: "1. Global Retry Configuration",
        desc: "Instructing the test runner to re-execute a failing test automatically.",
        playwright: `// In playwright.config.ts\nexport default defineConfig({\n  retries: 2 // Retries failing tests twice\n});`,
        selenium: `// Requires writing a custom class implementing IRetryAnalyzer\n// and attaching it to tests via @Test(retryAnalyzer = Retry.class)`
      },
      {
        title: "2. Dynamic Selectors (Starts With / Ends With)",
        desc: "Locating elements when the ID changes every time the page refreshes (e.g., id='btn-a8f9').",
        playwright: `// CSS Prefix matching (^= means starts with)\nawait page.locator('[id^="promo-btn-"]').click();\n// CSS Suffix matching ($= means ends with)\nawait page.locator('[id$="-submit"]').click();`,
        selenium: `// XPath Prefix matching\ndriver.findElement(By.xpath("//*[starts-with(@id, 'promo-btn-')]"));\n// CSS Prefix matching\ndriver.findElement(By.cssSelector("[id^='promo-btn-']"));`
      },
      {
        title: "3. Locating by Text Contains",
        desc: "Finding elements when the exact text varies (e.g., 'Welcome, John' vs 'Welcome, Jane').",
        playwright: `// Playwright handles partial text natively\nawait page.locator('text=Welcome,');\n// Or using regex\nawait expect(page.locator('.greeting')).toHaveText(/Welcome.*/);`,
        selenium: `// Using XPath contains()\ndriver.findElement(By.xpath("//*[contains(text(), 'Welcome,')]"));`
      },
      {
        title: "4. Step-Level Retries (Playwright Only)",
        desc: "Retrying a specific assertion block without restarting the entire test.",
        playwright: `// expect.toPass auto-retries the block until it succeeds or times out\nawait expect(async () => {\n  const res = await page.request.get('/api/status');\n  expect(res.ok()).toBeTruthy();\n}).toPass();`,
        selenium: `// Requires manually writing a while-loop or using FluentWait\n// with ignored exceptions.`
      }
    ],
    pomAnalogy: "If you don't centralize your dynamic locators in a Page Object, you will have messy `starts-with` XPaths scattered across your entire test suite. By keeping them in the POM, the Test Script just reads `homePage.clickPromoButton()`, totally oblivious to the fact that the underlying ID is constantly changing under the hood.",
    playwright: [
      {
        file: "playwright.config.ts",
        code: `import { defineConfig } from '@playwright/test';

// Best Practice: Handle flakiness globally
export default defineConfig({
  // Retry failing tests twice on CI, but don't retry locally to speed up debugging
  retries: process.env.CI ? 2 : 0,
});`
      },
      {
        file: "pages/HomePage.ts",
        code: `import { Page, Locator } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly dynamicPromoBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        // The ID changes every reload (e.g., id="promo-9948", id="promo-1234")
        // We use the CSS prefix selector (^=) to match the static part
        this.dynamicPromoBtn = page.locator('[id^="promo-"]');
    }

    async clickPromotion() {
        await this.dynamicPromoBtn.click();
    }
}`
      }
    ],
    selenium: [
      {
        file: "src/test/java/utils/RetryAnalyzer.java",
        code: `package utils;

import org.testng.IRetryAnalyzer;
import org.testng.ITestResult;

// Selenium/TestNG requires custom logic to handle retries
public class RetryAnalyzer implements IRetryAnalyzer {
    private int count = 0;
    private static final int maxTry = 2; // Retry twice

    @Override
    public boolean retry(ITestResult iTestResult) {
        if (!iTestResult.isSuccess()) { // If test fails
            if (count < maxTry) {
                count++;
                return true; // Tells TestNG to re-run the test
            }
        }
        return false; // Stop retrying
    }
}`
      },
      {
        file: "src/main/java/pages/HomePage.java",
        code: `package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

public class HomePage {
    WebDriver driver;
    
    // The ID changes every reload (e.g., id="promo-9948", id="promo-1234")
    // We use an XPath starts-with function to match the static part
    By dynamicPromoBtn = By.xpath("//*[starts-with(@id, 'promo-')]");

    public HomePage(WebDriver driver) {
        this.driver = driver;
    }

    public void clickPromotion() {
        driver.findElement(dynamicPromoBtn).click();
    }
}`
      }
    ],
    executionGuide: {
      playwright: [
        "Update 'playwright.config.ts' with the `retries` setting.",
        "Create the POM with dynamic locators.",
        "Run the test. If it fails, Playwright will automatically log 'Retry #1' in the console and restart."
      ],
      selenium: [
        "Create 'RetryAnalyzer.java' in the 'utils' package.",
        "In your Test class, attach it: `@Test(retryAnalyzer = RetryAnalyzer.class)`.",
        "Run the TestNG class. TestNG will report 'Retrying test' if an assertion fails."
      ]
    },
    playwrightNoPom: {
      file: "tests/antiPattern.spec.ts",
      code: `import { test } from '@playwright/test';

test('Anti-pattern dynamic locator', async ({ page }) => {
    await page.goto('https://www.coles.com.au');
    
    // ANTI-PATTERN: Hardcoding an ID that was copied from Chrome DevTools today.
    // Tomorrow, the ID will change to "promo-8888" and this test will permanently break!
    await page.locator('#promo-1234').click();
});`
    },
    seleniumNoPom: {
      file: "src/test/java/tests/AntiPatternTestRaw.java",
      code: `package tests;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.annotations.Test;

public class AntiPatternTestRaw {
    
    @Test
    public void testHardcodedId() {
        WebDriver driver = new ChromeDriver();
        driver.get("https://www.coles.com.au");
        
        // ANTI-PATTERN: Hardcoding an ID that was copied from Chrome DevTools today.
        // Tomorrow, the ID will change to "promo-8888" and this test will permanently break!
        driver.findElement(By.id("promo-1234")).click();
        
        driver.quit();
    }
}`
    },
    pomBenefitsSummary: [
      { title: "1. Preventing False Failures", desc: "Network spikes happen. If the Woolworths server takes 10 seconds to respond instead of 2 seconds, a test without Retry Logic will fail and wake up an engineer at 3 AM. Retry logic catches this 'flake', re-runs the test, and passes, saving massive amounts of debugging time." },
      { title: "2. Future-Proofing Locators", desc: "Modern web frameworks (like React) generate IDs dynamically (e.g., `id=\"button-hash8f72\"`). If you hardcode `button-hash8f72`, the test breaks on the next deployment. Using CSS `^=` (starts with) ensures your script survives framework rebuilds." },
      { title: "3. Clean Test Reports", desc: "In Playwright, if a test fails on Attempt 1 but passes on Attempt 2, the report marks it as 'Flaky', not 'Failed'. This allows stakeholders to see the suite passed, while giving engineers a specific tag to investigate later." }
    ],
    differences: [
      { feature: "Retry Setup", playwright: "Configured globally in `playwright.config.ts`.", selenium: "Requires implementing an `IRetryAnalyzer` interface." },
      { feature: "Report Tagging", playwright: "Automatically tags tests as 'Flaky' if they pass on a retry.", selenium: "TestNG marks them as 'Skipped' (Attempt 1) and 'Passed' (Attempt 2)." },
      { feature: "Block-Level Retries", playwright: "Supports `expect.toPass()` for retrying isolated code blocks.", selenium: "Requires custom loops or `FluentWait` logic." }
    ],
    interviewInsights: {
      playwright: [
        { q: "What is a 'Flaky' test in Playwright reporting?", a: "A flaky test is a test that failed on its first execution but successfully passed on a subsequent retry. It does not fail the CI/CD pipeline, but it is flagged in the HTML report so engineers know it needs optimization." },
        { q: "How do you retry a single code block without restarting the whole test?", a: "You can wrap the code inside `await expect(async () => { ... }).toPass();`. Playwright will repeatedly execute just that block of code until it succeeds or reaches the timeout." },
        { q: "How do you select an element based on its text content?", a: "You can use `page.getByText('Submit')` for exact matches, or `page.locator('text=Submit')` for substring matches. You can also use regular expressions: `page.getByText(/sub.*/i)`." },
        { q: "What does the CSS selector `[id^='test-']` do?", a: "The `^=` operator means 'starts with'. It will locate any element whose ID attribute begins with 'test-', which is vital for locating dynamically generated React elements." },
        { q: "How do you handle retries differently in CI versus Local execution?", a: "You use environment variables in the config file: `retries: process.env.CI ? 2 : 0`. This allows CI to overcome network flakes, while keeping local debugging fast by failing instantly." }
      ],
      selenium: [
        { q: "How do you implement Retry Logic in TestNG?", a: "You must create a Java class that implements the `IRetryAnalyzer` interface and overrides the `retry()` method to return `true` if the retry limit hasn't been reached. You then attach it to your tests using `@Test(retryAnalyzer = MyRetry.class)`." },
        { q: "How can you apply a RetryAnalyzer to all tests globally in TestNG?", a: "Instead of adding the annotation to every single `@Test` method, you implement an `IAnnotationTransformer` interface. This allows you to programmatically inject the RetryAnalyzer into all tests during the suite startup." },
        { q: "How do you locate dynamic elements in Selenium using XPath?", a: "You use XPath functions like `starts-with` and `contains`. Example: `//div[starts-with(@id, 'promo-')]` or `//button[contains(@class, 'active')]`." },
        { q: "What happens to the TestNG report when a test is retried?", a: "By default, TestNG records the failed attempt as 'Skipped' and the final successful attempt as 'Passed'. This can sometimes skew reporting metrics if not handled properly by a custom reporter like ExtentReports." },
        { q: "Is it better to use `starts-with` XPath or CSS prefix `^=`?", a: "CSS selectors (`[id^='promo-']`) are natively parsed by the browser engine and are generally faster and less brittle than XPath evaluation, making them the preferred choice for dynamic attributes." }
      ],
      comparison: [
        { q: "Compare how Playwright and Selenium implement test retries.", a: "Playwright has retry logic built directly into its core runner architecture via the config file. Selenium does not have native retry logic; it completely relies on the test runner (like TestNG or JUnit) to implement custom retry interfaces." },
        { q: "How do both tools handle locating elements by partial text?", a: "Playwright has built-in text engines (`getByText` or `text=...`). Selenium relies entirely on XPath for text locating (`//*[contains(text(), '...')]`), as CSS selectors cannot match inner HTML text." },
        { q: "Why should you avoid XPath when dealing with dynamic elements?", a: "Absolute XPaths (`/html/body/div[2]/span`) break if a single element is added to the DOM. Relative XPaths are better, but CSS Selectors are faster and natively designed to handle attribute matching (`^=`, `$=`, `*=`)." },
        { q: "If an element's ID changes every time the page loads, how do you locate it in both frameworks?", a: "You find stable, non-dynamic properties. For example, if it's the only button with a specific class, use `By.className`. If the ID always starts the same, use CSS `[id^='staticPart']`. Both frameworks use the exact same CSS/XPath strategies for this." },
        { q: "Compare debugging a flaky test.", a: "In Selenium, you generally have to rely on logs and screenshots to guess why it flaked. In Playwright, if a test flakes, the Trace Viewer captures the exact DOM state of both the failed attempt and the successful retry, making root cause analysis trivial." }
      ]
    },
    practiceTask: "Inspect the Woolworths homepage. Find an element that looks dynamic. Write a locator using CSS 'starts-with' (`^=`) or 'ends-with' (`$=`) to locate it resiliently."
  },
  { id: 16, title: "Lesson 16: API Testing Integration", concept: "Mixing UI testing with Backend API validation.", isStub: true },
  { id: 17, title: "Lesson 17: CI/CD Integration", concept: "Running tests automatically in GitHub Actions/Jenkins.", isStub: true },
  { id: 18, title: "Lesson 18: Interview Masterclass", concept: "A curated list of advanced SDET interview scenarios.", isStub: true }
];


// --- COMPONENTS ---

const highlightSyntax = (code) => {
  if (!code) return { __html: '' };
  
  // 1. Escape HTML characters first
  let html = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  
  let tokens = [];
  let tokenIndex = 0;
  
  // Safe token replacing to prevent regex overlapping
  const saveToken = (str, color, italic = false) => {
     const token = `«tkn${tokenIndex++}»`;
     const style = italic ? `color: ${color}; font-style: italic;` : `color: ${color};`;
     tokens.push({ token, html: `<span style="${style}">${str}</span>` });
     return token;
  };

  // Strings (Processed first so URLs don't break comments)
  html = html.replace(/('[^']*'|"[^"]*"|`[^`]*`)/g, match => saveToken(match, '#a5d6ff'));
  
  // Comments
  html = html.replace(/(\/\/.*$)/gm, match => saveToken(match, '#8b949e', true));

  // Keywords
  const keywords = /\b(import|from|const|let|var|async|await|test|expect|public|static|void|class|new|try|finally|if|else|return|boolean|int|String|package|readonly|export|for|of|protected|private)\b/g;
  html = html.replace(keywords, match => saveToken(match, '#ff7b72'));

  // Classes
  const classes = /\b([A-Z][a-zA-Z0-9_]*)\b/g;
  html = html.replace(classes, match => saveToken(match, '#79c0ff'));

  // Methods
  const methods = /\b([a-z_][a-zA-Z0-9_]*)(?=\()/g;
  html = html.replace(methods, match => {
    if (['if', 'for', 'while', 'catch', 'switch'].includes(match)) return match;
    return saveToken(match, '#d2a8ff');
  });

  // Restore tokens in reverse order
  tokens.reverse().forEach((t) => {
     html = html.split(t.token).join(t.html);
  });

  return { __html: html };
};

const FolderTree = ({ items }) => (
  <div className="font-mono text-sm bg-[#0d1117] text-slate-300 p-4 rounded-lg border border-slate-700">
    {items.map((item, idx) => (
      <div 
        key={idx} 
        className={`flex items-center gap-2 py-1 ${item.highlight ? 'bg-blue-900/30 -mx-2 px-2 border-l-2 border-blue-400' : ''}`}
        style={{ paddingLeft: `${item.depth * 20 + (item.highlight ? 8 : 0)}px` }}
      >
        {item.type === 'folder' ? <Folder size={16} className="text-blue-400" /> : 
         item.type === 'config' ? <FileJson size={16} className="text-yellow-400" /> :
         <FileCode2 size={16} className="text-slate-400" />}
        <span className={item.highlight ? 'text-white font-semibold' : ''}>{item.name}</span>
      </div>
    ))}
  </div>
);

const CodeBlock = ({ file, code, collapsible = false, defaultCollapsed = false }) => {
  const [copied, setCopied] = useState(false);
  const [collapsed, setCollapsed] = useState(collapsible ? defaultCollapsed : false);

  const handleCopy = () => {
    const textArea = document.createElement("textarea");
    textArea.value = code;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {}
    document.body.removeChild(textArea);
  };

  return (
    <div className="bg-[#1e1e2e] rounded-xl overflow-hidden shadow-lg border border-slate-700 mb-4 transition-all duration-300">
      <div className="flex justify-between items-center px-4 py-2 bg-[#181825] border-b border-slate-700">
        <div className="flex items-center gap-2">
          {collapsible && (
            <button 
              onClick={() => setCollapsed(!collapsed)} 
              className="text-slate-400 hover:text-white bg-slate-800 p-0.5 rounded transition-colors mr-1"
              title={collapsed ? "Expand Code" : "Collapse Code"}
            >
              {collapsed ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
            </button>
          )}
          <Code2 size={16} className="text-blue-400" />
          <span className="text-sm font-mono text-slate-300">{file}</span>
        </div>
        <button 
          onClick={handleCopy}
          className="text-slate-400 hover:text-white transition-colors p-1 flex items-center gap-1 text-xs bg-[#24292e] rounded px-2 py-1"
        >
          {copied ? <><Check size={14} className="text-green-400"/> Copied</> : <><Copy size={14} /> Copy</>}
        </button>
      </div>
      {!collapsed && (
        <pre className="p-4 overflow-x-auto text-sm font-mono text-slate-300 bg-[#0d1117] m-0" dangerouslySetInnerHTML={highlightSyntax(code)} />
      )}
    </div>
  );
};

const ExecutionGuide = ({ title, steps, color }) => (
  <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 mt-6 text-white shadow-md">
    <h3 className={`text-lg font-bold flex items-center gap-2 mb-4 border-b border-slate-700 pb-3 ${color === 'blue' ? 'text-blue-400' : 'text-green-400'}`}>
      <PlayCircle size={20} /> Execution Guide: {title}
    </h3>
    <ol className="space-y-4">
      {steps.map((step, idx) => (
        <li key={idx} className="flex gap-4 items-start">
          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${color === 'blue' ? 'bg-blue-900/50 text-blue-300' : 'bg-green-900/50 text-green-300'}`}>
            {idx + 1}
          </div>
          <p className="text-slate-300 text-sm font-medium leading-relaxed">
            {step.split('npx playwright').map((part, i, arr) => 
              i === arr.length - 1 ? part : <span key={i}>{part}<code className="bg-slate-900 text-pink-400 px-2 py-1 rounded font-mono select-all mx-1 border border-slate-700">npx playwright{arr[i+1]}</code></span>
            )}
          </p>
        </li>
      ))}
    </ol>
  </div>
);

const AlgorithmFlow = ({ steps }) => (
  <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 mb-8 transition-colors">
    <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
      <MonitorPlay size={20} className="text-blue-600 dark:text-blue-400" />
      Visual Execution Flow
    </h3>
    <div className="flex flex-col gap-2 relative">
      <div className="absolute left-[15px] top-4 bottom-4 w-0.5 bg-blue-100 dark:bg-slate-700 z-0 transition-colors"></div>
      {steps.map((step, index) => (
        <div key={index} className="flex items-center gap-4 z-10">
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-md flex-shrink-0">
            {index + 1}
          </div>
          <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 px-4 py-3 rounded-lg flex-1 shadow-sm font-medium text-slate-700 dark:text-slate-300 transition-colors">
            {step}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const LessonView = ({ lesson, frameworkFocus }) => {
  const [mobileTab, setMobileTab] = useState('playwright'); 
  const showPlaywright = frameworkFocus === 'both' || frameworkFocus === 'playwright';
  const showSelenium = frameworkFocus === 'both' || frameworkFocus === 'selenium';
  const gridClass = frameworkFocus === 'both' ? "grid grid-cols-1 md:grid-cols-2 gap-6" : "max-w-3xl mx-auto space-y-6";

  if (lesson.isStub) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-12 text-center h-full">
        <BookOpen size={48} className="text-slate-300 dark:text-slate-600 mb-4" />
        <h2 className="text-2xl font-bold text-slate-700 dark:text-slate-300 mb-2">{lesson.title}</h2>
        <p className="text-slate-500 dark:text-slate-400 max-w-md mb-6">{lesson.concept}</p>
        <div className="bg-slate-100 dark:bg-slate-800 rounded-lg px-6 py-3 font-semibold text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
          Module Unlocks in Next Phase
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto pb-24">
      <header className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-blue-200 dark:border-blue-800/50 transition-colors">
          <Briefcase size={14} /> End-to-End Scenario
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4 leading-tight transition-colors">
          {lesson.title}
        </h1>
        {lesson.analogy && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-800/80 border border-blue-100 dark:border-slate-700 rounded-xl p-6 shadow-sm transition-colors">
            <h3 className="flex items-center gap-2 font-bold text-blue-900 dark:text-blue-400 mb-2">
              <Lightbulb size={20} className="text-amber-500" /> Real-World Analogy
            </h3>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg transition-colors whitespace-pre-wrap">
              {lesson.analogy}
            </p>
          </div>
        )}
      </header>

      {lesson.flow && <AlgorithmFlow steps={lesson.flow} />}

      {/* Framework Setup & Folder Structure */}
      {lesson.setup && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6 border-b border-slate-200 dark:border-slate-700 pb-2 transition-colors">Project Setup & Folder Structure</h2>
          
          {frameworkFocus === 'both' && (
            <div className="flex md:hidden bg-slate-200 dark:bg-slate-800 p-1 rounded-lg mb-4 transition-colors">
              <button onClick={() => setMobileTab('playwright')} className={`flex-1 py-2 rounded-md font-semibold text-sm transition-colors ${mobileTab === 'playwright' ? 'bg-white dark:bg-slate-700 shadow text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400'}`}>Playwright Setup</button>
              <button onClick={() => setMobileTab('selenium')} className={`flex-1 py-2 rounded-md font-semibold text-sm transition-colors ${mobileTab === 'selenium' ? 'bg-white dark:bg-slate-700 shadow text-green-600 dark:text-green-400' : 'text-slate-500 dark:text-slate-400'}`}>Selenium Setup</button>
            </div>
          )}

          <div className={gridClass}>
            <div className={`${!showPlaywright || (frameworkFocus === 'both' && mobileTab !== 'playwright') ? 'hidden md:block' : 'block'} ${frameworkFocus !== 'both' && !showPlaywright ? '!hidden' : ''} bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden transition-colors`}>
              <div className="bg-blue-50 dark:bg-blue-900/20 px-6 py-4 border-b border-blue-100 dark:border-slate-700 flex items-center gap-2 transition-colors">
                <Terminal size={18} className="text-blue-600 dark:text-blue-400" />
                <h3 className="font-bold text-blue-900 dark:text-blue-300">{lesson.setup.playwright.title}</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4 mb-6">
                  {lesson.setup.playwright.steps.map((step, idx) => (
                    <div key={idx} className="flex gap-3">
                      <div className="w-6 h-6 rounded bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-500 dark:text-slate-400 mt-0.5">{idx + 1}</div>
                      <div>
                        <code className="bg-slate-100 dark:bg-slate-900 text-pink-600 dark:text-pink-400 px-2 py-0.5 rounded text-sm font-mono block w-fit mb-1 border border-slate-200 dark:border-slate-700">{step.cmd}</code>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <h4 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">Resulting Folder Structure</h4>
                <FolderTree items={lesson.setup.playwright.folderStructure} />
              </div>
            </div>

            <div className={`${!showSelenium || (frameworkFocus === 'both' && mobileTab !== 'selenium') ? 'hidden md:block' : 'block'} ${frameworkFocus !== 'both' && !showSelenium ? '!hidden' : ''} bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden transition-colors`}>
              <div className="bg-green-50 dark:bg-green-900/20 px-6 py-4 border-b border-green-100 dark:border-slate-700 flex items-center gap-2 transition-colors">
                <Terminal size={18} className="text-green-600 dark:text-green-400" />
                <h3 className="font-bold text-green-900 dark:text-green-300">{lesson.setup.selenium.title}</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4 mb-6">
                  {lesson.setup.selenium.steps.map((step, idx) => (
                    <div key={idx} className="flex gap-3">
                      <div className="w-6 h-6 rounded bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-500 dark:text-slate-400 mt-0.5">{idx + 1}</div>
                      <div>
                        <code className="bg-slate-100 dark:bg-slate-900 text-pink-600 dark:text-pink-400 px-2 py-0.5 rounded text-sm font-mono block w-fit mb-1 border border-slate-200 dark:border-slate-700">{step.cmd}</code>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <h4 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">Resulting Folder Structure</h4>
                <FolderTree items={lesson.setup.selenium.folderStructure} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Dependent Concepts Section */}
      {lesson.dependentConcepts && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6 border-b border-slate-200 dark:border-slate-700 pb-2 transition-colors">Building Blocks: Dependent Concepts</h2>
          <div className="space-y-6">
            {lesson.dependentConcepts.map((concept, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden transition-colors">
                <div className="bg-slate-50 dark:bg-slate-800/50 px-6 py-4 border-b border-slate-200 dark:border-slate-700 transition-colors">
                  <h3 className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                    <span className="bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 w-6 h-6 rounded-full flex items-center justify-center text-sm">{idx + 1}</span>
                    {concept.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mt-2 font-medium">{concept.desc}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 bg-[#0d1117]">
                  {showPlaywright && (
                    <div className={`p-5 border-b md:border-b-0 ${showSelenium ? 'md:border-r border-slate-800' : ''}`}>
                      <div className="text-xs text-blue-400 mb-3 font-semibold uppercase tracking-wider">Playwright (TS)</div>
                      <pre className="text-sm font-mono whitespace-pre-wrap text-slate-300" dangerouslySetInnerHTML={highlightSyntax(concept.playwright)} />
                    </div>
                  )}
                  {showSelenium && (
                    <div className="p-5">
                      <div className="text-xs text-green-400 mb-3 font-semibold uppercase tracking-wider">Selenium (Java)</div>
                      <pre className="text-sm font-mono whitespace-pre-wrap text-slate-300" dangerouslySetInnerHTML={highlightSyntax(concept.selenium)} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Framework Implementation Code Section */}
      {(lesson.playwright || lesson.selenium) && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6 border-b border-slate-200 dark:border-slate-700 pb-2 transition-colors">Main Framework Implementation</h2>
          
          {lesson.pomAnalogy && (
            <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800/50 rounded-xl p-5 mb-6 flex items-start gap-4 transition-colors">
              <LayoutTemplate size={24} className="text-purple-600 dark:text-purple-400 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-purple-900 dark:text-purple-300 mb-1">Why Page Object Model (POM) / Best Practices?</h4>
                <p className="text-purple-800 dark:text-purple-200/80 text-sm leading-relaxed">{lesson.pomAnalogy}</p>
              </div>
            </div>
          )}

          {frameworkFocus === 'both' && (
            <div className="flex md:hidden bg-slate-200 dark:bg-slate-800 p-1 rounded-lg mb-4 transition-colors">
              <button onClick={() => setMobileTab('playwright')} className={`flex-1 py-2 rounded-md font-semibold text-sm transition-colors ${mobileTab === 'playwright' ? 'bg-white dark:bg-slate-700 shadow text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400'}`}>Playwright (TS)</button>
              <button onClick={() => setMobileTab('selenium')} className={`flex-1 py-2 rounded-md font-semibold text-sm transition-colors ${mobileTab === 'selenium' ? 'bg-white dark:bg-slate-700 shadow text-green-600 dark:text-green-400' : 'text-slate-500 dark:text-slate-400'}`}>Selenium (Java)</button>
            </div>
          )}

          <div className={gridClass}>
            {lesson.playwright && (
              <div className={`${!showPlaywright || (frameworkFocus === 'both' && mobileTab !== 'playwright') ? 'hidden md:block' : 'block'} ${frameworkFocus !== 'both' && !showPlaywright ? '!hidden' : ''}`}>
                <h3 className="font-bold text-blue-600 dark:text-blue-400 mb-3 flex items-center gap-2 text-lg">
                  <span className="w-3 h-3 rounded-full bg-blue-500 inline-block"></span> Playwright (TypeScript)
                </h3>
                {lesson.playwright.map((fileObj, idx) => (
                  <CodeBlock key={idx} file={fileObj.file} code={fileObj.code} />
                ))}
                {lesson.executionGuide?.playwright && (
                  <ExecutionGuide title="Playwright" steps={lesson.executionGuide.playwright} color="blue" />
                )}
              </div>
            )}
            
            {lesson.selenium && (
              <div className={`${!showSelenium || (frameworkFocus === 'both' && mobileTab !== 'selenium') ? 'hidden md:block' : 'block'} ${frameworkFocus !== 'both' && !showSelenium ? '!hidden' : ''}`}>
                <h3 className="font-bold text-green-600 dark:text-green-400 mb-3 flex items-center gap-2 text-lg">
                  <span className="w-3 h-3 rounded-full bg-green-500 inline-block"></span> Selenium (Java)
                </h3>
                {lesson.selenium.map((fileObj, idx) => (
                  <CodeBlock key={idx} file={fileObj.file} code={fileObj.code} />
                ))}
                {lesson.executionGuide?.selenium && (
                  <ExecutionGuide title="Selenium" steps={lesson.executionGuide.selenium} color="green" />
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main Framework Implementation (Without POM / Anti-pattern) */}
      {lesson.playwrightNoPom && lesson.seleniumNoPom && (
        <div className="mb-12 pt-8 border-t border-slate-200 dark:border-slate-700 transition-colors">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6 border-b border-slate-200 dark:border-slate-700 pb-2 transition-colors">Anti-Pattern: Raw Implementation</h2>
          
          <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-800/50 rounded-xl p-5 mb-6 flex items-start gap-4 transition-colors">
            <Info size={24} className="text-orange-500 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-bold text-orange-900 dark:text-orange-300 mb-1">The "Messy Supermarket" Approach</h4>
              <p className="text-orange-800 dark:text-orange-200/80 text-sm leading-relaxed">
                This is what the code looks like when we DO NOT use best architectural practices. It works for one test, but becomes a nightmare to manage when you have 100 tests! Expand the code blocks below to see.
              </p>
            </div>
          </div>

          {frameworkFocus === 'both' && (
            <div className="flex md:hidden bg-slate-200 dark:bg-slate-800 p-1 rounded-lg mb-4 transition-colors">
              <button onClick={() => setMobileTab('playwright')} className={`flex-1 py-2 rounded-md font-semibold text-sm transition-colors ${mobileTab === 'playwright' ? 'bg-white dark:bg-slate-700 shadow text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400'}`}>Playwright (TS)</button>
              <button onClick={() => setMobileTab('selenium')} className={`flex-1 py-2 rounded-md font-semibold text-sm transition-colors ${mobileTab === 'selenium' ? 'bg-white dark:bg-slate-700 shadow text-green-600 dark:text-green-400' : 'text-slate-500 dark:text-slate-400'}`}>Selenium (Java)</button>
            </div>
          )}

          <div className={`${gridClass} mb-8`}>
            <div className={`${!showPlaywright || (frameworkFocus === 'both' && mobileTab !== 'playwright') ? 'hidden md:block' : 'block'} ${frameworkFocus !== 'both' && !showPlaywright ? '!hidden' : ''}`}>
              <h3 className="font-bold text-blue-600 dark:text-blue-400 mb-3 flex items-center gap-2 text-lg">
                <span className="w-3 h-3 rounded-full bg-blue-500 inline-block"></span> Playwright (Anti-Pattern)
              </h3>
              <CodeBlock file={lesson.playwrightNoPom.file} code={lesson.playwrightNoPom.code} collapsible={true} defaultCollapsed={true} />
            </div>
            
            <div className={`${!showSelenium || (frameworkFocus === 'both' && mobileTab !== 'selenium') ? 'hidden md:block' : 'block'} ${frameworkFocus !== 'both' && !showSelenium ? '!hidden' : ''}`}>
              <h3 className="font-bold text-green-600 dark:text-green-400 mb-3 flex items-center gap-2 text-lg">
                <span className="w-3 h-3 rounded-full bg-green-500 inline-block"></span> Selenium (Anti-Pattern)
              </h3>
              <CodeBlock file={lesson.seleniumNoPom.file} code={lesson.seleniumNoPom.code} collapsible={true} defaultCollapsed={true} />
            </div>
          </div>

          {/* POM Benefits Summary */}
          {lesson.pomBenefitsSummary && (
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-900/80 dark:to-indigo-900/80 rounded-xl p-6 shadow-lg text-white border border-blue-500/20">
              <h3 className="text-xl font-bold flex items-center gap-2 mb-5">
                <CheckCircle2 size={24} className="text-green-400" /> 
                Summary: Why are Best Practices so effective?
              </h3>
              <ul className="space-y-4">
                {lesson.pomBenefitsSummary.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-4 bg-white/10 dark:bg-black/20 p-4 rounded-lg border border-white/10 dark:border-white/5">
                    <div className="mt-1.5 bg-green-400 w-2 h-2 rounded-full shrink-0 shadow-[0_0_8px_rgba(74,222,128,0.5)]"></div>
                    <div>
                      <h4 className="font-bold text-green-300 mb-1.5 text-base tracking-wide">{benefit.title}</h4>
                      <p className="text-indigo-100 dark:text-slate-300 text-sm leading-relaxed">
                        {benefit.desc.split(/(`[^`]+`)/).map((part, i) => 
                          part.startsWith('`') && part.endsWith('`') 
                            ? <code key={i} className="bg-indigo-900/50 text-pink-300 px-1.5 py-0.5 rounded font-mono text-xs border border-indigo-800/50 mx-0.5">{part.slice(1, -1)}</code>
                            : part
                        )}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Differences Table */}
      {lesson.differences && frameworkFocus === 'both' && (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden mb-8 transition-colors">
          <div className="bg-slate-50 dark:bg-slate-800/50 px-6 py-4 border-b border-slate-200 dark:border-slate-700 transition-colors">
            <h3 className="font-bold text-slate-800 dark:text-slate-200 text-lg flex items-center gap-2">
              <CheckCircle2 size={20} className="text-indigo-600 dark:text-indigo-400" /> Key Differences
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-900/30 text-slate-500 dark:text-slate-400 text-sm uppercase transition-colors">
                  <th className="px-6 py-3 font-semibold">Feature</th>
                  <th className="px-6 py-3 font-semibold text-blue-600 dark:text-blue-400">Playwright</th>
                  <th className="px-6 py-3 font-semibold text-green-600 dark:text-green-400">Selenium</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                {lesson.differences.map((diff, i) => (
                  <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-700 dark:text-slate-300">{diff.feature}</td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{diff.playwright}</td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{diff.selenium}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Expanded Interview Section */}
      {lesson.interviewInsights && (
        <div className="mb-12 bg-slate-800 dark:bg-slate-900 rounded-xl shadow-lg border border-slate-700 dark:border-slate-800 overflow-hidden transition-colors">
          <div className="bg-slate-900 dark:bg-black/50 px-6 py-5 border-b border-slate-700 dark:border-slate-800 flex items-center justify-between transition-colors">
            <h3 className="text-xl font-bold flex items-center gap-2 text-indigo-300">
              <UserCheck size={24} /> SDET Interview Insights
            </h3>
            <span className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded hidden sm:block">Scroll for more</span>
          </div>
          
          <div className="p-6 max-h-[600px] overflow-y-auto space-y-8 scroll-smooth">
            {/* Playwright Qs */}
            {(frameworkFocus === 'both' || frameworkFocus === 'playwright') && lesson.interviewInsights.playwright && (
              <div>
                <h4 className="text-blue-400 font-bold uppercase tracking-wider mb-4 border-b border-slate-700 pb-2 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500"></div> Playwright Focus</h4>
                <div className="space-y-4">
                  {lesson.interviewInsights.playwright.map((insight, idx) => (
                    <div key={idx} className="bg-slate-700/30 dark:bg-slate-800/50 rounded-lg p-4 border border-slate-600/50 dark:border-slate-700/50 transition-colors">
                      <p className="font-semibold text-slate-200 mb-2">Q: {insight.q}</p>
                      <p className="text-slate-400 text-sm leading-relaxed border-l-2 border-blue-500 pl-3"><span className="font-bold text-white">A:</span> {insight.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Selenium Qs */}
            {(frameworkFocus === 'both' || frameworkFocus === 'selenium') && lesson.interviewInsights.selenium && (
              <div>
                <h4 className="text-green-400 font-bold uppercase tracking-wider mb-4 border-b border-slate-700 pb-2 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500"></div> Selenium Focus</h4>
                <div className="space-y-4">
                  {lesson.interviewInsights.selenium.map((insight, idx) => (
                    <div key={idx} className="bg-slate-700/30 dark:bg-slate-800/50 rounded-lg p-4 border border-slate-600/50 dark:border-slate-700/50 transition-colors">
                      <p className="font-semibold text-slate-200 mb-2">Q: {insight.q}</p>
                      <p className="text-slate-400 text-sm leading-relaxed border-l-2 border-green-500 pl-3"><span className="font-bold text-white">A:</span> {insight.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Comparison Qs */}
            {frameworkFocus === 'both' && lesson.interviewInsights.comparison && (
              <div>
                <h4 className="text-purple-400 font-bold uppercase tracking-wider mb-4 border-b border-slate-700 pb-2 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-purple-500"></div> Framework Comparison</h4>
                <div className="space-y-4">
                  {lesson.interviewInsights.comparison.map((insight, idx) => (
                    <div key={idx} className="bg-slate-700/30 dark:bg-slate-800/50 rounded-lg p-4 border border-slate-600/50 dark:border-slate-700/50 transition-colors">
                      <p className="font-semibold text-slate-200 mb-2">Q: {insight.q}</p>
                      <p className="text-slate-400 text-sm leading-relaxed border-l-2 border-purple-500 pl-3"><span className="font-bold text-white">A:</span> {insight.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {lesson.practiceTask && (
        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 border border-indigo-100 dark:border-indigo-800/50 shadow-sm h-fit transition-colors">
          <h3 className="text-xl font-bold flex items-center gap-2 mb-4 text-indigo-900 dark:text-indigo-300">
            <Code2 size={24} /> Practice Task
          </h3>
          <p className="text-indigo-800 dark:text-indigo-200 font-medium mb-4">
            {lesson.practiceTask}
          </p>
          <div className="bg-white dark:bg-slate-800 px-4 py-3 rounded-lg border border-indigo-200 dark:border-indigo-700 text-sm text-indigo-600 dark:text-indigo-400 font-semibold flex items-center justify-between shadow-sm cursor-pointer hover:bg-indigo-50 dark:hover:bg-slate-700 transition-colors">
            <span>Open VS Code to begin</span>
            <ArrowRight size={16} />
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  const [activeLesson, setActiveLesson] = useState(LESSONS[0]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [frameworkFocus, setFrameworkFocus] = useState('both'); 

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className={`absolute inset-0 flex font-sans overflow-hidden ${isDarkMode ? 'dark bg-slate-900' : 'bg-slate-50'}`}>
      
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-slate-900/50 dark:bg-black/60 z-40 lg:hidden backdrop-blur-sm transition-all" onClick={() => setIsSidebarOpen(false)} />
      )}

      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-900 dark:bg-black text-white transition-colors">
          <div>
            <h1 className="font-bold text-lg tracking-tight flex items-center gap-2">
              <Layers size={18} className="text-indigo-400" /> QA Automation
            </h1>
            <p className="text-xs text-indigo-300 font-medium mt-0.5">Zero to Hero Masterclass</p>
          </div>
          <button className="lg:hidden text-slate-300 hover:text-white bg-white/10 p-1.5 rounded" onClick={() => setIsSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          <h2 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3 px-2">Curriculum Modules</h2>
          <nav className="space-y-1 pb-10">
            {LESSONS.map((lesson) => (
              <button
                key={lesson.id}
                onClick={() => { setActiveLesson(lesson); setIsSidebarOpen(false); }}
                className={`w-full text-left px-3 py-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-between group ${activeLesson.id === lesson.id ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs transition-colors shrink-0 ${activeLesson.id === lesson.id ? 'bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200' : 'bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400'}`}>
                    {lesson.id}
                  </div>
                  <span className="truncate max-w-[180px]">{lesson.title.split(':')[0]}</span>
                </div>
                {lesson.isStub && <span className="text-[10px] font-bold text-amber-600 bg-amber-100 dark:bg-amber-900/40 dark:text-amber-400 px-1.5 py-0.5 rounded ml-2 shrink-0">Soon</span>}
                {!lesson.isStub && <ChevronRight size={16} className={`transition-transform shrink-0 ${activeLesson.id === lesson.id ? 'text-blue-500 dark:text-blue-400 translate-x-1' : 'text-slate-400 dark:text-slate-600 opacity-0 group-hover:opacity-100'}`} />}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-full overflow-hidden relative bg-slate-50 dark:bg-slate-900 transition-colors">
        <header className="flex items-center justify-between p-3 md:p-4 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 z-10 transition-colors shadow-sm">
          <div className="flex items-center gap-3">
            <button onClick={() => setIsSidebarOpen(true)} className="p-2 -ml-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg lg:hidden transition-colors">
              <Menu size={24} />
            </button>
            <span className="font-bold text-slate-800 dark:text-slate-100 hidden md:inline-block">Curriculum Workspace</span>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto justify-end">
            <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-lg border border-slate-200 dark:border-slate-700 shadow-inner">
              <button 
                onClick={() => setFrameworkFocus('playwright')} 
                className={`px-3 py-1.5 text-xs md:text-sm font-semibold rounded-md transition-all ${frameworkFocus === 'playwright' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'}`}
              >
                <span className="hidden sm:inline">Focus</span> Playwright
              </button>
              <button 
                onClick={() => setFrameworkFocus('both')} 
                className={`px-3 py-1.5 text-xs md:text-sm font-semibold rounded-md transition-all ${frameworkFocus === 'both' ? 'bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'}`}
              >
                Compare
              </button>
              <button 
                onClick={() => setFrameworkFocus('selenium')} 
                className={`px-3 py-1.5 text-xs md:text-sm font-semibold rounded-md transition-all ${frameworkFocus === 'selenium' ? 'bg-white dark:bg-slate-700 text-green-600 dark:text-green-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'}`}
              >
                <span className="hidden sm:inline">Focus</span> Selenium
              </button>
            </div>

            <button 
              onClick={() => setIsDarkMode(!isDarkMode)} 
              className="p-2 text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-all flex-shrink-0"
              title="Toggle Theme"
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12 scroll-smooth relative custom-scrollbar">
          <LessonView lesson={activeLesson} frameworkFocus={frameworkFocus} />
        </div>
      </main>
    </div>
  );
}