import { NextResponse } from 'next/server';
import type { JobFilters } from '@/types/job';

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
    

    return NextResponse.json({messgae: "Hello"});
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return NextResponse.json({ error: 'Failed to fetch jobs' }, { status: 500 });
  }
} 