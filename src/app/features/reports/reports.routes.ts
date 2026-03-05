import { Routes } from '@angular/router';

export const REPORTS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./reports/reports.component').then(m => m.ReportsComponent)
  }
];
