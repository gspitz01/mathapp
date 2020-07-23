import { Routes } from '@angular/router';

export const CONTENT_ROUTES: Routes = [
  {
    path: 'fundamentals',
    loadChildren: () => import('../../modules/basics/basics.module').then(m => m.BasicsModule)
  },
  {
    path: 'fractions',
    loadChildren: () => import('../../modules/fractions/fractions.module').then(m => m.FractionsModule)
  },
  {
    path: 'stats',
    loadChildren: () => import('../../modules/stats/stats.module').then(m => m.StatsModule)
  }
];
