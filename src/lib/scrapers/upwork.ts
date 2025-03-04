import * as cheerio from 'cheerio';
import { ScrapedJob, Scraper } from './types';

export class UpworkScraper implements Scraper {
  private readonly baseUrl = 'https://www.upwork.com/nx/jobs/search/?q=developer&sort=recency';
  
  async scrape(): Promise<ScrapedJob[]> {
    try {
      const response = await fetch(this.baseUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      });

      const html = await response.text();
      const $ = cheerio.load(html);
      const jobs: ScrapedJob[] = [];

      $('.job-tile').each((index, element) => {
        const title = $(element).find('.job-title').text().trim();
        const description = $(element).find('.job-description').text().trim();
        const url = 'https://www.upwork.com' + $(element).find('a').attr('href');
        
        const budgetText = $(element).find('.budget').text().trim();
        const budget = this.parseBudget(budgetText);
        
        const techStackText = $(element).find('.skills-list').text().trim();
        const techStack = techStackText.split(',').map(skill => skill.trim());

        jobs.push({
          title,
          description,
          budget,
          techStack,
          url,
          postedAt: new Date(), // You might want to parse the actual date from the page
        });
      });

      return jobs;
    } catch (error) {
      console.error('Error scraping Upwork:', error);
      return [];
    }
  }

  private parseBudget(budgetText: string): ScrapedJob['budget'] | undefined {
    // Example: "$500-$1000"
    const match = budgetText.match(/\$(\d+)-\$(\d+)/);
    if (match) {
      return {
        min: parseInt(match[1]),
        max: parseInt(match[2]),
        currency: 'USD'
      };
    }
    return undefined;
  }
} 