import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-metric-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './metric-card.component.html',
  styleUrl: './metric-card.component.scss'
})
export class MetricCardComponent {
  @Input({ required: true }) icon = '';
  @Input({ required: true }) label = '';
  @Input({ required: true }) value = '';
  @Input() delta = 0;
  @Input() tooltip = '';

  get isPositive(): boolean {
    return this.delta >= 0;
  }

  get deltaDisplay(): string {
    const sign = this.delta >= 0 ? '+' : '';
    return `${sign}${this.delta}%`;
  }
}
