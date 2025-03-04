import * as cheerio from 'cheerio';
import { ScrapedJob, Scraper } from './types';

export class WeWorkRemotelyScraper implements Scraper {
  private readonly baseUrl = 'https://weworkremotely.com/remote-jobs/search?term=developer';

  async scrape(): Promise<ScrapedJob[]> {
    try {
      const response = await fetch(this.baseUrl);
      const html = await response.text();
      const $ = cheerio.load(html);
      const jobs: ScrapedJob[] = [];

      $('.feature').each((_, element) => {
        const title = $(element).find('.title').text().trim();
        const description = $(element).find('.description').text().trim();
        const url = 'https://weworkremotely.com' + $(element).find('a').attr('href');
        
        const techStackText = $(element).find('.technologies').text().trim();
        const techStack = techStackText.split(',').map(tech => tech.trim());

        jobs.push({
          title,
          description,
          techStack,
          url,
          postedAt: new Date(), // Parse actual date if available
        });
      });

      return jobs;
    } catch (error) {
      console.error('Error scraping WeWorkRemotely:', error);
      return [];
    }
  }
} 