/**
 * Types representing university student self-development features.
 */

export type MajorCategory = 'technology' | 'business' | 'humanities' | 'art' | 'general';

export interface Milestone {
  id: string;
  year: '1학년 (Freshman)' | '2학년 (Sophomore)' | '3학년 (Junior)' | '4학년 (Senior)';
  title: string;
  description: string;
  category: MajorCategory;
  tags: string[];
}

export interface Habit {
  id: string;
  title: string;
  desc: string;
  frequency: string;
  completedDays: boolean[]; // Array representing 7 days of the current week
}

export interface ResourceLink {
  name: string;
  type: 'book' | 'tool' | 'community' | 'course';
  url: string;
  description: string;
  badge?: string;
}

export interface Question {
  id: number;
  text: string;
  options: {
    text: string;
    score: Record<string, number>; // Maps persona ID to points
  }[];
}

export interface SelfDevPersona {
  id: string;
  title: string;
  sub: string;
  tagline: string;
  description: string;
  traits: string[];
  tips: string[];
  recommendedActivity: string;
}
