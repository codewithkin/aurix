import { NextResponse } from 'next/server';
import type { Job, JobFilters } from '@/types/job';
import { UpworkScraper } from '@/lib/scrapers/upwork';
import { WeWorkRemotelyScraper } from '@/lib/scrapers/weworkremotely';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const filters: JobFilters = {
    platform: searchParams.get('platform')?.split(','),
    techStack: searchParams.get('techStack')?.split(','),
    budgetMin: searchParams.get('budgetMin') ? parseInt(searchParams.get('budgetMin')!) : undefined,
    budgetMax: searchParams.get('budgetMax') ? parseInt(searchParams.get('budgetMax')!) : undefined,
    keywords: searchParams.get('keywords')?.split(','),
  };

  try {
    const scrapers = {
      'Upwork': new UpworkScraper(),
      'WeWorkRemotely': new WeWorkRemotelyScraper(),
    };

    let allJobs: Job[] = [];
    const platforms = filters.platform || Object.keys(scrapers);

    // Scrape jobs from selected platforms
    await Promise.all(
      platforms.map(async (platform) => {
        if (platform in scrapers) {
          const scraper = scrapers[platform as keyof typeof scrapers];
          const scrapedJobs = await scraper.scrape();
          
          // Convert scraped jobs to Job type
          const jobs = scrapedJobs.map((job, index) => ({
            id: `${platform}-${index}`,
            ...job,
            platform: platform as Job['platform'],
          }));

          allJobs = [...allJobs, ...jobs];
        }
      })
    );

    // Apply filters
    let filteredJobs = allJobs;

    if (filters.techStack?.length) {
      filteredJobs = filteredJobs.filter(job => 
        job.techStack.some(tech => 
          filters.techStack!.includes(tech)
        )
      );
    }

    if (filters.budgetMin) {
      filteredJobs = filteredJobs.filter(job => 
        job.budget?.min ? job.budget.min >= filters.budgetMin! : true
      );
    }

    if (filters.budgetMax) {
      filteredJobs = filteredJobs.filter(job => 
        job.budget?.max ? job.budget.max <= filters.budgetMax! : true
      );
    }

    if (filters.keywords?.length) {
      filteredJobs = filteredJobs.filter(job => 
        filters.keywords!.some(keyword => 
          job.title.toLowerCase().includes(keyword.toLowerCase()) ||
          job.description.toLowerCase().includes(keyword.toLowerCase())
        )
      );
    }

    return NextResponse.json(filteredJobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return NextResponse.json({ error: 'Failed to fetch jobs' }, { status: 500 });
  }
} 