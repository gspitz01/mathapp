import { Routes } from "@angular/router";

export const CONTENT_ROUTES: Routes = [
  {
    path: 'fundamentals',
    loadChildren: './modules/basics/basics.module#BasicsModule'
  },
  {
    path: 'fractions',
    loadChildren: './modules/fractions/fractions.module#FractionsModule'
  },
  {
    path: 'stats',
    loadChildren: './modules/stats/stats.module#StatsModule'
  }
];
