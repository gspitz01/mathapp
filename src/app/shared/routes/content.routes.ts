import { Routes } from "@angular/router";
import { StatsGuardService } from "src/app/core/services/stats-guard.service";

export const CONTENT_ROUTES: Routes = [
  {
    path: 'basics',
    loadChildren: './modules/basics/basics.module#BasicsModule'
  },
  {
    path: 'fractions',
    loadChildren: './modules/fractions/fractions.module#FractionsModule'
  },
  {
    path: 'stats',
    loadChildren: './modules/stats/stats.module#StatsModule',
    canActivate: [StatsGuardService]
  }
];
