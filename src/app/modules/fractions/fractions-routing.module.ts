import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FractionsHomeComponent } from './fractions-home/fractions-home.component';
import { FractionAdditionComponent } from './fraction-addition/fraction-addition.component';
import { FractionDivisionComponent } from './fraction-division/fraction-division.component';
import { FractionMultiplicationComponent } from './fraction-multiplication/fraction-multiplication.component';
import { FractionSubtractionComponent } from './fraction-subtraction/fraction-subtraction.component';
import { GreatestCommonFactorComponent } from './greatest-common-factor/greatest-common-factor.component';
import { SimplifyFractionComponent } from './simplify-fraction/simplify-fraction.component';

const routes: Routes = [
  { path: '', children: [
    { path: 'addition', component: FractionAdditionComponent },
    { path: 'division', component: FractionDivisionComponent },
    { path: 'multiplication', component: FractionMultiplicationComponent },
    { path: 'subtraction', component: FractionSubtractionComponent },
    { path: 'gcf', component: GreatestCommonFactorComponent },
    { path: 'simplify', component: SimplifyFractionComponent },
    { path: '', component: FractionsHomeComponent }
  ]}
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class FractionsRoutingModule { }
