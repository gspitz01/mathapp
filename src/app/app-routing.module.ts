import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuardService } from './core/services/auth-guard.service';
import { LoginComponent } from './login/login.component';
import { StatsViewComponent } from './stats-view/stats-view.component';
import { CONTENT_ROUTES } from './shared/routes/content.routes';
import { ContentLayoutComponent } from './layouts/content-layout/content-layout.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'stats/:id', component: StatsViewComponent, canActivate: [AuthGuardService] },
  { path: 'stats', component: StatsViewComponent, canActivate: [AuthGuardService] },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '', component: ContentLayoutComponent, children: CONTENT_ROUTES }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
