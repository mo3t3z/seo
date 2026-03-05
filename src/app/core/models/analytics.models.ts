export interface Kpi {
  label: string;
  value: string;
  delta: number;
  deltaLabel: string;
  icon: string;
  tooltip: string;
}

export interface TrafficPoint {
  date: string;
  sessions: number;
  users: number;
  pageviews: number;
}

export interface PageRow {
  url: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

export interface KeywordRow {
  keyword: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
  trend: 'up' | 'down' | 'stable';
  trendPercent: number;
  intent: KeywordIntent;
  isBrand: boolean;
}

export type KeywordIntent = 'informational' | 'commercial' | 'navigational';

export interface AiRecommendation {
  id: string;
  title: string;
  priority: 'high' | 'medium' | 'low';
  category: 'content' | 'technical' | 'internal-linking';
  bullets: string[];
  details: string;
}

export interface DateRange {
  start: Date;
  end: Date;
  preset: DateRangePreset;
}

export type DateRangePreset = '7d' | '30d' | '90d' | 'custom';

export interface PageAnalytics {
  page: string;
  sessions: number;
  bounceRate: number;
  avgTime: string;
  seoScore: number;
}

export interface ReportSummary {
  title: string;
  highlights: string[];
  totalClicks: number;
  totalImpressions: number;
  avgCtr: number;
  avgPosition: number;
}

export interface SiteSettings {
  siteUrl: string;
  gaPropertyId: string;
  gscProperty: string;
  timezone: string;
  language: string;
}

export interface KeywordFilters {
  intent: KeywordIntent | null;
  isBrand: boolean | null;
  search: string;
}
