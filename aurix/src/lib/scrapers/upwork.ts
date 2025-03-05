import { Actor } from "apify";
import playwright from "playwright";

await Actor.init();

// Get search term from Apify input
const input = await Actor.getInput();
const searchTerm = input?.searchTerm || "web developer"; // Default if empty

console.log(`🔍 Searching for jobs related to: ${searchTerm}`);

// Format the search term for Upwork URL
const formattedSearchTerm = encodeURIComponent(searchTerm);
const JOB_SEARCH_URL = `https://www.upwork.com/nx/search/jobs/?q=${formattedSearchTerm}&sort=recency`;

const browser = await playwright.chromium.launch({ headless: true });
const page = await browser.newPage();

console.log("🌍 Navigating to Upwork Jobs...");
await page.goto(JOB_SEARCH_URL, { waitUntil: "networkidle" });

// Wait for job listings to load
await page.waitForSelector("section.air3-card-hover");

const jobs = await page.evaluate(() => {
  const jobCards = document.querySelectorAll("section.air3-card-hover");
  const jobListings = [];

  jobCards.forEach((job) => {
    const titleElement = job.querySelector("h2 a");
    const descriptionElement = job.querySelector("div.job-tile-description");
    const budgetElement = job.querySelector("strong[data-test='budget-price']");
    const clientElement = job.querySelector("div[data-test='client-info']");

    jobListings.push({
      title: titleElement ? titleElement.innerText.trim() : "No title",
      url: titleElement ? titleElement.href : "#",
      description: descriptionElement
        ? descriptionElement.innerText.trim()
        : "No description",
      budget: budgetElement ? budgetElement.innerText.trim() : "N/A",
      client_info: clientElement ? clientElement.innerText.trim() : "N/A",
    });
  });

  return jobListings;
});

console.log(`✅ Scraped ${jobs.length} jobs for '${searchTerm}'`);

// Store results in Apify Dataset (accessible via API)
await Actor.pushData({ searchTerm, jobs });

await browser.close();
await Actor.exit();
