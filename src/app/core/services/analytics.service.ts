import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { DateRange, Kpi, TrafficPoint, PageRow } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private readonly MOCK_DELAY = 600;

  getKpis(range: DateRange): Observable<Kpi[]> {
    const kpis: Kpi[] = [
      {
        label: 'Organic Traffic',
        value: '24,567',
        delta: 12.5,
        deltaLabel: 'vs previous period',
        icon: 'trending_up',
        tooltip: 'Total organic search sessions'
      },
      {
        label: 'Clicks',
        value: '18,234',
        delta: 8.3,
        deltaLabel: 'vs previous period',
        icon: 'ads_click',
        tooltip: 'Total clicks from search results'
      },
      {
        label: 'CTR',
        value: '3.42%',
        delta: -2.1,
        deltaLabel: 'vs previous period',
        icon: 'percent',
        tooltip: 'Click-through rate from impressions'
      },
      {
        label: 'Avg Position',
        value: '15.7',
        delta: 4.2,
        deltaLabel: 'vs previous period',
        icon: 'leaderboard',
        tooltip: 'Average ranking position in search'
      }
    ];
    return of(kpis).pipe(delay(this.MOCK_DELAY));
  }

  getTraffic(range: DateRange): Observable<TrafficPoint[]> {
    const points: TrafficPoint[] = this.generateTrafficData(range);
    return of(points).pipe(delay(this.MOCK_DELAY));
  }

  getTopPages(range: DateRange): Observable<PageRow[]> {
    const pages: PageRow[] = [
      { url: '/blog/seo-guide-2024', clicks: 4523, impressions: 89456, ctr: 5.06, position: 8.2 },
      { url: '/services/technical-seo', clicks: 3421, impressions: 67234, ctr: 5.09, position: 6.5 },
      { url: '/blog/keyword-research', clicks: 2987, impressions: 54321, ctr: 5.50, position: 7.1 },
      { url: '/tools/site-audit', clicks: 2654, impressions: 48765, ctr: 5.44, position: 9.3 },
      { url: '/blog/link-building', clicks: 2345, impressions: 43210, ctr: 5.43, position: 10.2 },
      { url: '/services/content-strategy', clicks: 2123, impressions: 39876, ctr: 5.33, position: 11.5 },
      { url: '/blog/local-seo-tips', clicks: 1987, impressions: 36543, ctr: 5.44, position: 12.8 },
      { url: '/case-studies/ecommerce', clicks: 1876, impressions: 34567, ctr: 5.43, position: 13.2 },
      { url: '/resources/seo-checklist', clicks: 1654, impressions: 31234, ctr: 5.29, position: 14.7 },
      { url: '/blog/mobile-seo', clicks: 1432, impressions: 28976, ctr: 4.94, position: 15.9 }
    ];
    return of(pages).pipe(delay(this.MOCK_DELAY));
  }

  private generateTrafficData(range: DateRange): TrafficPoint[] {
    const points: TrafficPoint[] = [];
    const days = this.getDaysDiff(range);
    const startDate = new Date(range.start);

    for (let i = 0; i < days; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      
      const baseValue = 800 + Math.random() * 400;
      const weekendFactor = date.getDay() === 0 || date.getDay() === 6 ? 0.6 : 1;
      
      points.push({
        date: date.toISOString().split('T')[0],
        sessions: Math.round(baseValue * weekendFactor),
        users: Math.round(baseValue * weekendFactor * 0.85),
        pageviews: Math.round(baseValue * weekendFactor * 2.3)
      });
    }
    return points;
  }

  private getDaysDiff(range: DateRange): number {
    const diffTime = Math.abs(range.end.getTime() - range.start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 30;
  }
}
