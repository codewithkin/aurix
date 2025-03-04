export interface Job {
  id: string;
  title: string;
  description: string;
  platform: 'Upwork' | 'AngelList' | 'WeWorkRemotely' | 'IndieHackers' | 'YC';
  budget?: {
    min: number;
    max: number;
    currency: string;
  };
  techStack: string[];
  postedAt: Date;
  url: string;
}

export type JobFilters = {
  platform?: string[];
  techStack?: string[];
  budgetMin?: number;
  budgetMax?: number;
  keywords?: string[];
}; 