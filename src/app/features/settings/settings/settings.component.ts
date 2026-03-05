import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { PageHeaderComponent } from '../../../shared/components';
import { SiteSettings } from '../../../core/models';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    PageHeaderComponent
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly snackBar = inject(MatSnackBar);

  settingsForm!: FormGroup;
  isSaving = false;

  timezones: string[] = [
    'UTC',
    'America/New_York',
    'America/Los_Angeles',
    'Europe/London',
    'Europe/Paris',
    'Asia/Tokyo',
    'Asia/Shanghai',
    'Australia/Sydney'
  ];

  languages: { code: string; name: string }[] = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'ja', name: 'Japanese' },
    { code: 'zh', name: 'Chinese' }
  ];

  ngOnInit(): void {
    this.initForm();
    this.loadSettings();
  }

  private initForm(): void {
    this.settingsForm = this.fb.group({
      siteUrl: ['', [Validators.required, Validators.pattern(/^https?:\/\/.+/)]],
      gaPropertyId: ['', [Validators.required, Validators.pattern(/^G-[A-Z0-9]+$|^UA-\d+-\d+$/)]],
      gscProperty: ['', [Validators.required, Validators.pattern(/^https?:\/\/.+/)]],
      timezone: ['UTC', Validators.required],
      language: ['en', Validators.required]
    });
  }

  private loadSettings(): void {
    // Load demo settings
    const demoSettings: SiteSettings = {
      siteUrl: 'https://example.com',
      gaPropertyId: 'G-ABC123XYZ',
      gscProperty: 'https://example.com/',
      timezone: 'America/New_York',
      language: 'en'
    };
    
    this.settingsForm.patchValue(demoSettings);
  }

  getErrorMessage(field: string): string {
    const control = this.settingsForm.get(field);
    
    if (control?.hasError('required')) {
      return 'This field is required';
    }
    
    if (control?.hasError('pattern')) {
      switch (field) {
        case 'siteUrl':
        case 'gscProperty':
          return 'Please enter a valid URL (https://...)';
        case 'gaPropertyId':
          return 'Please enter a valid GA Property ID (G-XXXXX or UA-XXXXX-X)';
        default:
          return 'Invalid format';
      }
    }
    
    return '';
  }

  onSave(): void {
    if (this.settingsForm.valid) {
      this.isSaving = true;
      
      // Simulate save delay
      setTimeout(() => {
        this.isSaving = false;
        this.snackBar.open('Settings saved (demo)', 'Close', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'bottom'
        });
      }, 500);
    } else {
      this.settingsForm.markAllAsTouched();
    }
  }

  onReset(): void {
    this.loadSettings();
    this.snackBar.open('Settings reset to defaults', 'Close', {
      duration: 2000,
      horizontalPosition: 'end',
      verticalPosition: 'bottom'
    });
  }
}
