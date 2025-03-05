import { NextResponse } from "next/server";
import { RequestQueue, PlaywrightCrawler } from "crawlee";

// Define job listing structure
interface JobListing {
  title: string;
  url: string;
  description: string;
  budget: string;
  client_info: string;
}

export async function GET(req: Request): Promise<NextResponse> {
  try {
    // Extract search term from request URL query parameter
    const { searchParams } = new URL(req.url);
    const searchTerm: string = searchParams.get("q") || "web developer"; // Default to "web developer"
    console.log(`🔍 Searching Upwork for: ${searchTerm}`);

    // Initialize the request queue
    const requestQueue = await RequestQueue.open();

    // Prepare the URL with the search term (URL-encoded for safe query parameters)
    const searchUrl = `https://www.upwork.com/search/jobs/?q=${encodeURIComponent(searchTerm)}`;

    // Add the initial search URL to the queue
    await requestQueue.addRequest({ url: searchUrl });

    const jobs = [];

    // Initialize the PlaywrightCrawler
    const crawler = new PlaywrightCrawler({
      requestQueue,
      requestHandler: async ({ page }) => {
        console.log(`🕷️ Scraping: ${page.url}`);

        // Wait for the job cards to render
        await page.waitForSelector(".job-tile");

        // Get the job's details
        const data = await page.$$eval(".job-tile-title", (element: any) => {
          element.map((el: any) => {console.log(el.textContent)})
        })
      },
      async handleFailedRequestFunction({ request }) {
        console.error(`❌ Failed to scrape: ${request.url}`);
      },
    });

    // Run the crawler
    await crawler.run();

    // After crawling, return the job listings as a JSON response
    return NextResponse.json({ jobs: crawler.getData() });

  } catch (error) {
    console.error("❌ Scraper error:", error);
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 },
    );
  }
}
