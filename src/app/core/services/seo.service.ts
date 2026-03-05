import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { DateRange, KeywordRow, KeywordFilters, PageAnalytics } from '../models';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private readonly MOCK_DELAY = 600;

  private readonly mockKeywords: KeywordRow[] = [
    { keyword: 'seo tools', clicks: 4523, impressions: 89456, ctr: 5.06, position: 8.2, trend: 'up', trendPercent: 12.5, intent: 'commercial', isBrand: false },
    { keyword: 'technical seo audit', clicks: 3421, impressions: 67234, ctr: 5.09, position: 6.5, trend: 'up', trendPercent: 8.3, intent: 'informational', isBrand: false },
    { keyword: 'keyword research guide', clicks: 2987, impressions: 54321, ctr: 5.50, position: 7.1, trend: 'stable', trendPercent: 0.5, intent: 'informational', isBrand: false },
    { keyword: 'seo-ia platform', clicks: 2654, impressions: 48765, ctr: 5.44, position: 1.3, trend: 'up', trendPercent: 25.2, intent: 'navigational', isBrand: true },
    { keyword: 'best seo software', clicks: 2345, impressions: 43210, ctr: 5.43, position: 10.2, trend: 'down', trendPercent: -3.4, intent: 'commercial', isBrand: false },
    { keyword: 'on-page seo checklist', clicks: 2123, impressions: 39876, ctr: 5.33, position: 11.5, trend: 'up', trendPercent: 15.7, intent: 'informational', isBrand: false },
    { keyword: 'local seo strategies', clicks: 1987, impressions: 36543, ctr: 5.44, position: 12.8, trend: 'down', trendPercent: -7.2, intent: 'informational', isBrand: false },
    { keyword: 'seo ranking factors', clicks: 1876, impressions: 34567, ctr: 5.43, position: 13.2, trend: 'stable', trendPercent: 1.1, intent: 'informational', isBrand: false },
    { keyword: 'ecommerce seo tips', clicks: 1654, impressions: 31234, ctr: 5.29, position: 14.7, trend: 'up', trendPercent: 9.8, intent: 'informational', isBrand: false },
    { keyword: 'mobile seo optimization', clicks: 1432, impressions: 28976, ctr: 4.94, position: 15.9, trend: 'down', trendPercent: -4.5, intent: 'informational', isBrand: false },
    { keyword: 'seo content writing', clicks: 1298, impressions: 26543, ctr: 4.89, position: 16.4, trend: 'up', trendPercent: 6.7, intent: 'commercial', isBrand: false },
    { keyword: 'backlink analysis tool', clicks: 1145, impressions: 24321, ctr: 4.71, position: 17.2, trend: 'stable', trendPercent: 0.3, intent: 'commercial', isBrand: false },
    { keyword: 'google search console guide', clicks: 1023, impressions: 22456, ctr: 4.56, position: 18.1, trend: 'up', trendPercent: 11.2, intent: 'informational', isBrand: false },
    { keyword: 'schema markup tutorial', clicks: 987, impressions: 21234, ctr: 4.65, position: 19.3, trend: 'down', trendPercent: -2.8, intent: 'informational', isBrand: false },
    { keyword: 'seo-ia login', clicks: 876, impressions: 19876, ctr: 4.41, position: 1.1, trend: 'up', trendPercent: 18.9, intent: 'navigational', isBrand: true }
  ];

  getKeywords(range: DateRange, filters: KeywordFilters): Observable<KeywordRow[]> {
    let filtered = [...this.mockKeywords];

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(k => k.keyword.toLowerCase().includes(searchLower));
    }

    if (filters.intent) {
      filtered = filtered.filter(k => k.intent === filters.intent);
    }

    if (filters.isBrand !== null) {
      filtered = filtered.filter(k => k.isBrand === filters.isBrand);
    }

    return of(filtered).pipe(delay(this.MOCK_DELAY));
  }

  getPages(range: DateRange): Observable<PageAnalytics[]> {
    const pages: PageAnalytics[] = [
      { page: '/blog/seo-guide-2024', sessions: 4523, bounceRate: 32.5, avgTime: '4:32', seoScore: 92 },
      { page: '/services/technical-seo', sessions: 3421, bounceRate: 28.7, avgTime: '5:12', seoScore: 88 },
      { page: '/blog/keyword-research', sessions: 2987, bounceRate: 35.2, avgTime: '3:45', seoScore: 85 },
      { page: '/tools/site-audit', sessions: 2654, bounceRate: 41.3, avgTime: '2:58', seoScore: 78 },
      { page: '/blog/link-building', sessions: 2345, bounceRate: 38.9, avgTime: '4:01', seoScore: 72 },
      { page: '/services/content-strategy', sessions: 2123, bounceRate: 45.6, avgTime: '2:34', seoScore: 65 },
      { page: '/blog/local-seo-tips', sessions: 1987, bounceRate: 52.1, avgTime: '2:12', seoScore: 58 },
      { page: '/case-studies/ecommerce', sessions: 1876, bounceRate: 29.4, avgTime: '6:23', seoScore: 94 },
      { page: '/resources/seo-checklist', sessions: 1654, bounceRate: 44.7, avgTime: '3:17', seoScore: 81 },
      { page: '/blog/mobile-seo', sessions: 1432, bounceRate: 48.2, avgTime: '2:45', seoScore: 69 }
    ];
    return of(pages).pipe(delay(this.MOCK_DELAY));
  }
}
