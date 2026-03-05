import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { DateRange, AiRecommendation, ReportSummary } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AiInsightsService {
  private readonly MOCK_DELAY = 600;

  getRecommendations(range: DateRange): Observable<AiRecommendation[]> {
    const recommendations: AiRecommendation[] = [
      {
        id: 'rec-001',
        title: 'Optimize meta descriptions for top 10 pages',
        priority: 'high',
        category: 'content',
        bullets: [
          'Current meta descriptions are too short (under 120 characters)',
          'Add action-oriented language to improve CTR'
        ],
        details: 'Analysis shows that pages with optimized meta descriptions have 23% higher CTR. Focus on pages: /blog/seo-guide-2024, /services/technical-seo, /blog/keyword-research. Include primary keywords naturally and add compelling calls-to-action.'
      },
      {
        id: 'rec-002',
        title: 'Fix broken internal links on 5 pages',
        priority: 'high',
        category: 'technical',
        bullets: [
          '12 broken internal links detected across the site',
          'Most linked to deprecated URLs from recent migration'
        ],
        details: 'Broken links negatively impact user experience and SEO. Pages affected: /blog/local-seo-tips, /resources/seo-checklist, /blog/mobile-seo. Update links to point to current URLs or implement 301 redirects.'
      },
      {
        id: 'rec-003',
        title: 'Add internal links to orphan pages',
        priority: 'medium',
        category: 'internal-linking',
        bullets: [
          '8 pages have fewer than 3 internal links pointing to them',
          'These pages receive 45% less organic traffic'
        ],
        details: 'Orphan pages are difficult for search engines to discover and rank. Add contextual internal links from high-authority pages to distribute link equity. Focus on /case-studies/ecommerce and /tools/site-audit.'
      },
      {
        id: 'rec-004',
        title: 'Improve Core Web Vitals on mobile',
        priority: 'medium',
        category: 'technical',
        bullets: [
          'LCP exceeds 2.5s on 15 pages',
          'CLS issues detected on pages with lazy-loaded images'
        ],
        details: 'Core Web Vitals are a ranking factor. Optimize images, implement proper image dimensions, and defer non-critical JavaScript. Consider using a CDN for faster asset delivery.'
      },
      {
        id: 'rec-005',
        title: 'Create content clusters for target keywords',
        priority: 'low',
        category: 'content',
        bullets: [
          'Keyword cannibalization detected for "seo tools" across 3 pages',
          'Consolidate content into comprehensive pillar pages'
        ],
        details: 'Multiple pages competing for the same keyword dilutes ranking potential. Create a main pillar page for "seo tools" and link supporting content to establish topical authority.'
      },
      {
        id: 'rec-006',
        title: 'Implement schema markup for articles',
        priority: 'low',
        category: 'technical',
        bullets: [
          'Only 40% of blog posts have Article schema',
          'Rich snippets can improve CTR by up to 30%'
        ],
        details: 'Add structured data markup (JSON-LD) to all blog posts. Include author, publish date, and featured image. This helps search engines understand content and display rich results.'
      }
    ];
    return of(recommendations).pipe(delay(this.MOCK_DELAY));
  }

  getWeeklyReport(): Observable<ReportSummary> {
    const report: ReportSummary = {
      title: 'Weekly Performance Report',
      highlights: [
        'Organic traffic increased by 12.5% week-over-week',
        'Top performing page: /blog/seo-guide-2024 (+234 clicks)',
        '3 new keywords entered top 10 positions',
        'Mobile traffic share increased to 45%',
        'Average session duration improved by 18 seconds'
      ],
      totalClicks: 18234,
      totalImpressions: 532456,
      avgCtr: 3.42,
      avgPosition: 15.7
    };
    return of(report).pipe(delay(this.MOCK_DELAY));
  }

  getMonthlyReport(): Observable<ReportSummary> {
    const report: ReportSummary = {
      title: 'Monthly Performance Report',
      highlights: [
        'Organic traffic grew 28% compared to last month',
        'New content generated 12,456 new sessions',
        'Technical improvements reduced bounce rate by 8%',
        '15 keywords moved to page 1 positions',
        'Backlink profile grew by 45 new referring domains'
      ],
      totalClicks: 72936,
      totalImpressions: 2129824,
      avgCtr: 3.42,
      avgPosition: 14.2
    };
    return of(report).pipe(delay(this.MOCK_DELAY));
  }
}
