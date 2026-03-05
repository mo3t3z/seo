import { Routes } from '@angular/router';

export const PAGES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/pages.component').then(m => m.PagesComponent)
  }
];
