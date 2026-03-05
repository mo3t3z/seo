import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { 
  PageHeaderComponent, 
  DateRangePickerComponent,
  LoadingStateComponent,
  EmptyStateComponent 
} from '../../../shared/components';
import { SeoService } from '../../../core/services';
import { PageAnalytics, DateRange } from '../../../core/models';

@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatChipsModule,
    MatTooltipModule,
    PageHeaderComponent,
    DateRangePickerComponent,
    LoadingStateComponent,
    EmptyStateComponent
  ],
  templateUrl: './pages.component.html',
  styleUrl: './pages.component.scss'
})
export class PagesComponent implements OnInit {
  private readonly seoService = inject(SeoService);

  // State
  isLoading = true;
  currentRange!: DateRange;

  // Data
  pages: PageAnalytics[] = [];
  sortedPages: PageAnalytics[] = [];

  // Table
  displayedColumns: string[] = ['page', 'sessions', 'bounceRate', 'avgTime', 'seoScore'];

  ngOnInit(): void {
    // Initial load triggered by date range picker
  }

  onDateRangeChange(range: DateRange): void {
    this.currentRange = range;
    this.loadPages();
  }

  loadPages(): void {
    this.isLoading = true;
    this.seoService.getPages(this.currentRange).subscribe({
      next: (pages) => {
        this.pages = pages;
        this.sortedPages = [...pages];
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  sortData(sort: Sort): void {
    const data = [...this.pages];
    if (!sort.active || sort.direction === '') {
      this.sortedPages = data;
      return;
    }

    this.sortedPages = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'page': return this.compare(a.page, b.page, isAsc);
        case 'sessions': return this.compare(a.sessions, b.sessions, isAsc);
        case 'bounceRate': return this.compare(a.bounceRate, b.bounceRate, isAsc);
        case 'avgTime': return this.compare(a.avgTime, b.avgTime, isAsc);
        case 'seoScore': return this.compare(a.seoScore, b.seoScore, isAsc);
        default: return 0;
      }
    });
  }

  private compare(a: string | number, b: string | number, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  getScoreColor(score: number): string {
    if (score >= 80) return 'score-high';
    if (score >= 70) return 'score-medium';
    return 'score-low';
  }

  hasIssue(score: number): boolean {
    return score < 70;
  }

  getIssueTooltip(score: number): string {
    if (score < 50) return 'Critical SEO issues detected';
    if (score < 70) return 'SEO improvements recommended';
    return '';
  }
}
