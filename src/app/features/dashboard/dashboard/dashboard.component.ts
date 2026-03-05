import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';
import { 
  PageHeaderComponent, 
  MetricCardComponent, 
  DateRangePickerComponent,
  LoadingStateComponent,
  EmptyStateComponent,
  ErrorStateComponent
} from '../../../shared/components';
import { 
  AnalyticsService, 
  AiInsightsService 
} from '../../../core/services';
import { 
  Kpi, 
  TrafficPoint, 
  PageRow, 
  AiRecommendation, 
  DateRange 
} from '../../../core/models';
import { RecommendationDialogComponent } from './recommendation-dialog/recommendation-dialog.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatSortModule,
    MatChipsModule,
    MatDialogModule,
    MatSnackBarModule,
    BaseChartDirective,
    PageHeaderComponent,
    MetricCardComponent,
    DateRangePickerComponent,
    LoadingStateComponent,
    EmptyStateComponent,
    ErrorStateComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  private readonly analyticsService = inject(AnalyticsService);
  private readonly aiInsightsService = inject(AiInsightsService);
  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);

  // State
  isLoadingKpis = true;
  isLoadingTraffic = true;
  isLoadingPages = true;
  isLoadingRecommendations = true;
  hasError = false;

  // Data
  kpis: Kpi[] = [];
  trafficData: TrafficPoint[] = [];
  topPages: PageRow[] = [];
  recommendations: AiRecommendation[] = [];
  currentRange!: DateRange;

  // Table
  displayedColumns: string[] = ['url', 'clicks', 'impressions', 'ctr', 'position'];
  sortedPages: PageRow[] = [];

  // Chart
  chartType: ChartType = 'line';
  chartData: ChartConfiguration['data'] = {
    labels: [],
    datasets: []
  };
  chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top'
      },
      tooltip: {
        mode: 'index',
        intersect: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    },
    elements: {
      line: {
        tension: 0.4
      },
      point: {
        radius: 2,
        hoverRadius: 6
      }
    }
  };

  ngOnInit(): void {
    // Initial load triggered by date range picker
  }

  onDateRangeChange(range: DateRange): void {
    this.currentRange = range;
    this.loadData();
  }

  loadData(): void {
    this.hasError = false;
    this.loadKpis();
    this.loadTraffic();
    this.loadTopPages();
    this.loadRecommendations();
  }

  private loadKpis(): void {
    this.isLoadingKpis = true;
    this.analyticsService.getKpis(this.currentRange).subscribe({
      next: (kpis) => {
        this.kpis = kpis;
        this.isLoadingKpis = false;
      },
      error: () => {
        this.isLoadingKpis = false;
        this.hasError = true;
      }
    });
  }

  private loadTraffic(): void {
    this.isLoadingTraffic = true;
    this.analyticsService.getTraffic(this.currentRange).subscribe({
      next: (data) => {
        this.trafficData = data;
        this.updateChart();
        this.isLoadingTraffic = false;
      },
      error: () => {
        this.isLoadingTraffic = false;
        this.hasError = true;
      }
    });
  }

  private loadTopPages(): void {
    this.isLoadingPages = true;
    this.analyticsService.getTopPages(this.currentRange).subscribe({
      next: (pages) => {
        this.topPages = pages;
        this.sortedPages = [...pages];
        this.isLoadingPages = false;
      },
      error: () => {
        this.isLoadingPages = false;
        this.hasError = true;
      }
    });
  }

  private loadRecommendations(): void {
    this.isLoadingRecommendations = true;
    this.aiInsightsService.getRecommendations(this.currentRange).subscribe({
      next: (recs) => {
        this.recommendations = recs;
        this.isLoadingRecommendations = false;
      },
      error: () => {
        this.isLoadingRecommendations = false;
        this.hasError = true;
      }
    });
  }

  private updateChart(): void {
    this.chartData = {
      labels: this.trafficData.map(p => this.formatDate(p.date)),
      datasets: [
        {
          label: 'Sessions',
          data: this.trafficData.map(p => p.sessions),
          borderColor: '#3f51b5',
          backgroundColor: 'rgba(63, 81, 181, 0.1)',
          fill: true
        },
        {
          label: 'Users',
          data: this.trafficData.map(p => p.users),
          borderColor: '#ff4081',
          backgroundColor: 'rgba(255, 64, 129, 0.1)',
          fill: true
        }
      ]
    };
  }

  private formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }

  sortData(sort: Sort): void {
    const data = [...this.topPages];
    if (!sort.active || sort.direction === '') {
      this.sortedPages = data;
      return;
    }

    this.sortedPages = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'url': return this.compare(a.url, b.url, isAsc);
        case 'clicks': return this.compare(a.clicks, b.clicks, isAsc);
        case 'impressions': return this.compare(a.impressions, b.impressions, isAsc);
        case 'ctr': return this.compare(a.ctr, b.ctr, isAsc);
        case 'position': return this.compare(a.position, b.position, isAsc);
        default: return 0;
      }
    });
  }

  private compare(a: string | number, b: string | number, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  getPriorityColor(priority: string): string {
    switch (priority) {
      case 'high': return 'warn';
      case 'medium': return 'accent';
      case 'low': return 'primary';
      default: return 'primary';
    }
  }

  getCategoryLabel(category: string): string {
    switch (category) {
      case 'content': return 'Content';
      case 'technical': return 'Technical';
      case 'internal-linking': return 'Internal Linking';
      default: return category;
    }
  }

  openRecommendation(rec: AiRecommendation): void {
    this.dialog.open(RecommendationDialogComponent, {
      width: '500px',
      data: rec
    });
  }

  onExport(): void {
    this.snackBar.open('Export started (demo)', 'Close', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'bottom'
    });
  }

  onRefresh(): void {
    this.loadData();
    this.snackBar.open('Data refreshed', 'Close', {
      duration: 2000,
      horizontalPosition: 'end',
      verticalPosition: 'bottom'
    });
  }
}
