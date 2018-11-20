import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BasicsComponent } from './basics/basics.component';
import { FractionsComponent } from './fractions/fractions.component';
import { BasicAdditionComponent } from './basic-addition/basic-addition.component';
import { BasicSubtractionComponent } from './basic-subtraction/basic-subtraction.component';
import { BasicMultiplicationComponent } from './basic-multiplication/basic-multiplication.component';
import { BasicDivisionComponent } from './basic-division/basic-division.component';
import { FractionAdditionComponent } from './fraction-addition/fraction-addition.component';
import { FractionSubtractionComponent } from './fraction-subtraction/fraction-subtraction.component';
import { FractionMultiplicationComponent } from './fraction-multiplication/fraction-multiplication.component';
import { FractionDivisionComponent } from './fraction-division/fraction-division.component';
import { FractionLcdComponent } from './fraction-lcd/fraction-lcd.component';
import { AuthGuardService } from './auth-guard.service';
import { LoginComponent } from './login/login.component';
import { StatsViewComponent } from './stats-view/stats-view.component';
import { GreatestCommonFactorComponent } from './greatest-common-factor/greatest-common-factor.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'basics', component: BasicsComponent, canActivate: [AuthGuardService] },
  { path: 'fractions', component: FractionsComponent, canActivate: [AuthGuardService] },
  { path: 'basic-addition', component: BasicAdditionComponent, canActivate: [AuthGuardService] },
  { path: 'basic-subtraction', component: BasicSubtractionComponent, canActivate: [AuthGuardService] },
  { path: 'basic-multiplication', component: BasicMultiplicationComponent, canActivate: [AuthGuardService] },
  { path: 'basic-division', component: BasicDivisionComponent, canActivate: [AuthGuardService] },
  { path: 'fraction-addition', component: FractionAdditionComponent, canActivate: [AuthGuardService] },
  { path: 'fraction-subtraction', component: FractionSubtractionComponent, canActivate: [AuthGuardService] },
  { path: 'fraction-multiplication', component: FractionMultiplicationComponent, canActivate: [AuthGuardService] },
  { path: 'fraction-division', component: FractionDivisionComponent, canActivate: [AuthGuardService] },
  { path: 'fraction-lcd', component: FractionLcdComponent, canActivate: [AuthGuardService] },
  { path: 'gcf', component: GreatestCommonFactorComponent, canActivate: [AuthGuardService] },
  { path: 'stats', component: StatsViewComponent, canActivate: [AuthGuardService] },
  { path: 'stats/:id', component: StatsViewComponent, canActivate: [AuthGuardService] }
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
