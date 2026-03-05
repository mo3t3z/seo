import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { 
  PageHeaderComponent, 
  MetricCardComponent,
  LoadingStateComponent 
} from '../../../shared/components';
import { AiInsightsService } from '../../../core/services';
import { ReportSummary } from '../../../core/models';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSnackBarModule,
    PageHeaderComponent,
    MetricCardComponent,
    LoadingStateComponent
  ],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent implements OnInit {
  private readonly aiInsightsService = inject(AiInsightsService);
  private readonly snackBar = inject(MatSnackBar);

  // State
  isLoadingWeekly = true;
  isLoadingMonthly = true;

  // Data
  weeklyReport: ReportSummary | null = null;
  monthlyReport: ReportSummary | null = null;

  // Insights
  insights: string[] = [
    'Mobile traffic has grown 15% this week, consider optimizing mobile experience further.',
    'Blog posts published on Tuesdays receive 23% more engagement.',
    'Pages with videos have 45% lower bounce rate.',
    'Internal linking improvements led to 12% more page views per session.',
    'Long-form content (2000+ words) ranks 40% better for competitive keywords.'
  ];

  ngOnInit(): void {
    this.loadWeeklyReport();
    this.loadMonthlyReport();
  }

  private loadWeeklyReport(): void {
    this.isLoadingWeekly = true;
    this.aiInsightsService.getWeeklyReport().subscribe({
      next: (report) => {
        this.weeklyReport = report;
        this.isLoadingWeekly = false;
      },
      error: () => {
        this.isLoadingWeekly = false;
      }
    });
  }

  private loadMonthlyReport(): void {
    this.isLoadingMonthly = true;
    this.aiInsightsService.getMonthlyReport().subscribe({
      next: (report) => {
        this.monthlyReport = report;
        this.isLoadingMonthly = false;
      },
      error: () => {
        this.isLoadingMonthly = false;
      }
    });
  }

  onExportPdf(): void {
    this.snackBar.open('Export started (demo)', 'Close', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'bottom'
    });
  }
}
