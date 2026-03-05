import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { 
  PageHeaderComponent, 
  DateRangePickerComponent,
  LoadingStateComponent,
  EmptyStateComponent 
} from '../../../shared/components';
import { SeoService } from '../../../core/services';
import { KeywordRow, DateRange, KeywordFilters, KeywordIntent } from '../../../core/models';

@Component({
  selector: 'app-keywords',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatChipsModule,
    MatButtonToggleModule,
    PageHeaderComponent,
    DateRangePickerComponent,
    LoadingStateComponent,
    EmptyStateComponent
  ],
  templateUrl: './keywords.component.html',
  styleUrl: './keywords.component.scss'
})
export class KeywordsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  private readonly seoService = inject(SeoService);

  // State
  isLoading = true;
  currentRange!: DateRange;

  // Data
  keywords: KeywordRow[] = [];
  filteredKeywords: KeywordRow[] = [];
  pagedKeywords: KeywordRow[] = [];

  // Filters
  searchQuery = '';
  selectedIntent: KeywordIntent | null = null;
  selectedBrand: boolean | null = null;

  // Table
  displayedColumns: string[] = ['keyword', 'clicks', 'impressions', 'ctr', 'position', 'trend'];

  // Pagination
  pageSize = 10;
  pageIndex = 0;

  ngOnInit(): void {
    // Initial load triggered by date range picker
  }

  onDateRangeChange(range: DateRange): void {
    this.currentRange = range;
    this.loadKeywords();
  }

  loadKeywords(): void {
    this.isLoading = true;
    const filters: KeywordFilters = {
      search: this.searchQuery,
      intent: this.selectedIntent,
      isBrand: this.selectedBrand
    };

    this.seoService.getKeywords(this.currentRange, filters).subscribe({
      next: (keywords) => {
        this.keywords = keywords;
        this.filteredKeywords = keywords;
        this.updatePage();
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  onSearch(): void {
    this.applyFilters();
  }

  onIntentChange(intent: KeywordIntent | null): void {
    this.selectedIntent = this.selectedIntent === intent ? null : intent;
    this.applyFilters();
  }

  onBrandChange(isBrand: boolean | null): void {
    this.selectedBrand = this.selectedBrand === isBrand ? null : isBrand;
    this.applyFilters();
  }

  private applyFilters(): void {
    let filtered = [...this.keywords];

    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(k => k.keyword.toLowerCase().includes(query));
    }

    if (this.selectedIntent) {
      filtered = filtered.filter(k => k.intent === this.selectedIntent);
    }

    if (this.selectedBrand !== null) {
      filtered = filtered.filter(k => k.isBrand === this.selectedBrand);
    }

    this.filteredKeywords = filtered;
    this.pageIndex = 0;
    this.updatePage();
  }

  sortData(sort: Sort): void {
    const data = [...this.filteredKeywords];
    if (!sort.active || sort.direction === '') {
      this.filteredKeywords = [...this.keywords];
      this.applyFilters();
      return;
    }

    this.filteredKeywords = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'keyword': return this.compare(a.keyword, b.keyword, isAsc);
        case 'clicks': return this.compare(a.clicks, b.clicks, isAsc);
        case 'impressions': return this.compare(a.impressions, b.impressions, isAsc);
        case 'ctr': return this.compare(a.ctr, b.ctr, isAsc);
        case 'position': return this.compare(a.position, b.position, isAsc);
        case 'trend': return this.compare(a.trendPercent, b.trendPercent, isAsc);
        default: return 0;
      }
    });
    this.updatePage();
  }

  private compare(a: string | number, b: string | number, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  onPageChange(event: { pageIndex: number; pageSize: number }): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePage();
  }

  private updatePage(): void {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.pagedKeywords = this.filteredKeywords.slice(start, end);
  }

  getTrendIcon(trend: string): string {
    switch (trend) {
      case 'up': return 'trending_up';
      case 'down': return 'trending_down';
      default: return 'trending_flat';
    }
  }

  getTrendClass(trend: string): string {
    switch (trend) {
      case 'up': return 'trend-up';
      case 'down': return 'trend-down';
      default: return 'trend-stable';
    }
  }

  isIntentSelected(intent: KeywordIntent): boolean {
    return this.selectedIntent === intent;
  }

  isBrandSelected(isBrand: boolean): boolean {
    return this.selectedBrand === isBrand;
  }
}
