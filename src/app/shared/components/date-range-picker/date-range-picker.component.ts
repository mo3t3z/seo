import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { DateRange, DateRangePreset } from '../../../core/models';

@Component({
  selector: 'app-date-range-picker',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule
  ],
  templateUrl: './date-range-picker.component.html',
  styleUrl: './date-range-picker.component.scss'
})
export class DateRangePickerComponent implements OnInit {
  @Output() rangeChange = new EventEmitter<DateRange>();

  selectedPreset: DateRangePreset = '30d';
  customStart: Date | null = null;
  customEnd: Date | null = null;
  showCustomPicker = false;

  ngOnInit(): void {
    this.emitRange();
  }

  onPresetChange(preset: DateRangePreset): void {
    this.selectedPreset = preset;
    this.showCustomPicker = preset === 'custom';
    
    if (preset !== 'custom') {
      this.emitRange();
    }
  }

  onCustomRangeChange(): void {
    if (this.customStart && this.customEnd) {
      this.emitRange();
    }
  }

  private emitRange(): void {
    const range = this.calculateRange();
    this.rangeChange.emit(range);
  }

  private calculateRange(): DateRange {
    const end = new Date();
    let start: Date;

    switch (this.selectedPreset) {
      case '7d':
        start = new Date();
        start.setDate(start.getDate() - 7);
        break;
      case '30d':
        start = new Date();
        start.setDate(start.getDate() - 30);
        break;
      case '90d':
        start = new Date();
        start.setDate(start.getDate() - 90);
        break;
      case 'custom':
        start = this.customStart ?? new Date();
        return {
          start,
          end: this.customEnd ?? end,
          preset: 'custom'
        };
      default:
        start = new Date();
        start.setDate(start.getDate() - 30);
    }

    return { start, end, preset: this.selectedPreset };
  }
}
