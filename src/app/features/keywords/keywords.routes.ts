import { Routes } from '@angular/router';

export const KEYWORDS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./keywords/keywords.component').then(m => m.KeywordsComponent)
  }
];
