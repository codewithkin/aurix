export interface ScrapedJob {
  title: string;
  description: string;
  budget?: {
    min: number;
    max: number;
    currency: string;
  };
  techStack: string[];
  url: string;
  postedAt: Date;
}

export interface Scraper {
  scrape(): Promise<ScrapedJob[]>;
} 