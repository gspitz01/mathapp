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

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'basics', component: BasicsComponent },
  { path: 'fractions', component: FractionsComponent },
  { path: 'basic-addition', component: BasicAdditionComponent },
  { path: 'basic-subtraction', component: BasicSubtractionComponent },
  { path: 'basic-multiplication', component: BasicMultiplicationComponent },
  { path: 'basic-division', component: BasicDivisionComponent },
  { path: 'fraction-addition', component: FractionAdditionComponent },
  { path: 'fraction-subtraction', component: FractionSubtractionComponent },
  { path: 'fraction-multiplication', component: FractionMultiplicationComponent },
  { path: 'fraction-division', component: FractionDivisionComponent },
  { path: 'fraction-lcd', component: FractionLcdComponent }
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
