import rawData from './mockData.json';
import { PRData } from '../types';

const mockData = rawData as PRData[];

export async function fetchPRs(): Promise<PRData[]> {
  // fake delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  return mockData;
}
