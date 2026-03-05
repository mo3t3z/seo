import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AiRecommendation } from '../../../../core/models';

@Component({
  selector: 'app-recommendation-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatSnackBarModule
  ],
  template: `
    <h2 mat-dialog-title>{{ data.title }}</h2>
    <mat-dialog-content>
      <div class="chips">
        <mat-chip [class]="'priority-' + data.priority">
          {{ data.priority | titlecase }} Priority
        </mat-chip>
        <mat-chip>{{ getCategoryLabel(data.category) }}</mat-chip>
      </div>
      
      <h4>Key Points</h4>
      <ul class="bullets">
        @for (bullet of data.bullets; track bullet) {
          <li>{{ bullet }}</li>
        }
      </ul>
      
      <h4>Details</h4>
      <p class="details">{{ data.details }}</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Close</button>
      <button mat-raised-button color="primary" (click)="onApply()">
        <mat-icon>check</mat-icon>
        Apply (Demo)
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    .chips {
      display: flex;
      gap: 8px;
      margin-bottom: 16px;
    }
    
    .priority-high {
      background-color: #ffebee !important;
      color: #c62828 !important;
    }
    
    .priority-medium {
      background-color: #fff3e0 !important;
      color: #ef6c00 !important;
    }
    
    .priority-low {
      background-color: #e3f2fd !important;
      color: #1565c0 !important;
    }
    
    h4 {
      margin: 16px 0 8px;
      font-weight: 500;
      color: #333;
    }
    
    .bullets {
      margin: 0;
      padding-left: 20px;
      
      li {
        margin-bottom: 4px;
        line-height: 1.5;
        color: #666;
      }
    }
    
    .details {
      color: #666;
      line-height: 1.6;
      font-size: 0.875rem;
    }
    
    mat-dialog-actions button mat-icon {
      font-size: 18px;
      width: 18px;
      height: 18px;
      margin-right: 4px;
    }
  `]
})
export class RecommendationDialogComponent {
  readonly data = inject<AiRecommendation>(MAT_DIALOG_DATA);
  private readonly dialogRef = inject(MatDialogRef<RecommendationDialogComponent>);
  private readonly snackBar = inject(MatSnackBar);

  getCategoryLabel(category: string): string {
    switch (category) {
      case 'content': return 'Content';
      case 'technical': return 'Technical';
      case 'internal-linking': return 'Internal Linking';
      default: return category;
    }
  }

  onApply(): void {
    this.snackBar.open('Recommendation applied (demo)', 'Close', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'bottom'
    });
    this.dialogRef.close();
  }
}
