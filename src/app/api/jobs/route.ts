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



    return NextResponse.json({message: "hi"});
  } catch (error) {
    console.error("❌ Scraper error:", error);
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 },
    );
  }
}
