import { Routes } from "@angular/router";

export const CONTENT_ROUTES: Routes = [
  {
    path: 'basics',
    loadChildren: '../../modules/basics/basics.module#BasicsModule'
  },
  {
    path: 'fractions',
    loadChildren: '../../modules/fractions/fractions.module#FractionsModule'
  }
];
