import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-error-state',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  template: `
    <div class="error-state" role="alert">
      <mat-icon class="error-icon">error_outline</mat-icon>
      <h3 class="error-title">{{ title }}</h3>
      @if (message) {
        <p class="error-message">{{ message }}</p>
      }
      @if (showRetry) {
        <button mat-stroked-button color="primary" (click)="retry.emit()" aria-label="Retry">
          <mat-icon>refresh</mat-icon>
          Retry
        </button>
      }
    </div>
  `,
  styles: [`
    .error-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 48px;
      text-align: center;
    }
    
    .error-icon {
      font-size: 64px;
      width: 64px;
      height: 64px;
      color: #f44336;
      margin-bottom: 16px;
    }
    
    .error-title {
      margin: 0 0 8px;
      font-size: 1.125rem;
      font-weight: 500;
      color: #333;
    }
    
    .error-message {
      margin: 0 0 16px;
      color: #666;
      font-size: 0.875rem;
      max-width: 300px;
    }
  `]
})
export class ErrorStateComponent {
  @Input() title = 'Something went wrong';
  @Input() message = 'Please try again later.';
  @Input() showRetry = true;
  @Output() retry = new EventEmitter<void>();
}
