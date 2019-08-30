import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CONTENT_ROUTES } from './shared/routes/content.routes';
import { ContentLayoutComponent } from './layouts/content-layout/content-layout.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuardService } from './core/services/auth-guard.service';
import { BasicQuizViewComponent } from './shared/components/basic-quiz-view/basic-quiz-view.component';
import { BaselineRoundLevel } from './core/domain/models/baseline/baseline-round-level';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'baseline', component: BasicQuizViewComponent,
    data: {
      startingLevel: 0,
      startingTime: 120,
      levelOrder: [new BaselineRoundLevel('Baseline Test', 20)],
      quizName: 'Baseline Test',
      title: 'Baseline Test',
      displayTarget: false,
      displayLevel: false
    }
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '', component: ContentLayoutComponent, children: CONTENT_ROUTES, canActivate: [AuthGuardService] },
  { path: '**', component: PageNotFoundComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
