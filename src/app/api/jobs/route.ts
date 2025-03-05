import { NextResponse } from "next/server";
import { Actor } from "apify";
import playwright from "playwright";

interface JobListing {
  title: string;
  url: string;
  description: string;
  budget: string;
  client_info: string;
}

export async function GET(req: Request): Promise<NextResponse> {
  try {
    // Extract search term from request URL
    const { searchParams } = new URL(req.url);
    const searchTerm: string = searchParams.get("q") || "web developer";
    console.log(`🔍 Searching Upwork for: ${searchTerm}`);

    await Actor.init();

    const formattedSearchTerm = encodeURIComponent(searchTerm);
    const JOB_SEARCH_URL = `https://www.upwork.com/nx/search/jobs/?q=${formattedSearchTerm}&sort=recency`;

    const browser = await playwright.chromium.launch({ headless: true });
    const page = await browser.newPage();

    console.log("🌍 Navigating to Upwork Jobs...");
    await page.goto(JOB_SEARCH_URL, { waitUntil: "networkidle" });

    // Wait for job listings to load
    await page.waitForSelector("section.air3-card-list");

    const jobs: JobListing[] = await page.evaluate(() => {
      const jobCards = document.querySelectorAll("section.air3-card-list");
      const jobListings: JobListing[] = [];

      jobCards.forEach((job) => {
        const titleElement = job.querySelector("h2 a");
        const descriptionElement = job.querySelector("div.job-tile-description");
        const budgetElement = job.querySelector("strong[data-test='budget-price']");
        const clientElement = job.querySelector("div[data-test='client-info']");

        jobListings.push({
          title: titleElement ? titleElement.innerText.trim() : "No title",
          url: titleElement ? titleElement.href : "#",
          description: descriptionElement ? descriptionElement.innerText.trim() : "No description",
          budget: budgetElement ? budgetElement.innerText.trim() : "N/A",
          client_info: clientElement ? clientElement.innerText.trim() : "N/A",
        });
      });

      return jobListings;
    });

    console.log(`✅ Found ${jobs.length} jobs for '${searchTerm}'`);

    await browser.close();
    await Actor.exit();

    return NextResponse.json({ searchTerm, jobs }, { status: 200 });
  } catch (error) {
    console.error("❌ Scraper error:", error);
    return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 });
  }
}