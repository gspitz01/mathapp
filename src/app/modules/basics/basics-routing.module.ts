import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BasicsHomeComponent } from './basics-home/basics-home.component';
import { BasicAdditionComponent } from './basic-addition/basic-addition.component';
import { BasicDivisionComponent } from './basic-division/basic-division.component';
import { BasicMultiplicationComponent } from './basic-multiplication/basic-multiplication.component';
import { BasicSubtractionComponent } from './basic-subtraction/basic-subtraction.component';
import { BasicMultiplicationHomeComponent } from './basic-multiplication-home/basic-multiplication-home.component';
import { BasicDivisionHomeComponent } from './basic-division-home/basic-division-home.component';
import { BasicExponentiationHomeComponent } from './basic-exponentiation-home/basic-exponentiation-home.component';
import { BasicExponentiationComponent } from './basic-exponentiation/basic-exponentiation.component';
import { LeastCommonMultipleComponent } from './least-common-multiple/least-common-multiple.component';

const routes: Routes = [
  { path: '', children: [
    { path: 'addition', component: BasicAdditionComponent },
    { path: 'division/:roundName', component: BasicDivisionComponent },
    { path: 'division', component: BasicDivisionHomeComponent },
    { path: 'multiplication/:roundName', component: BasicMultiplicationComponent },
    { path: 'multiplication', component: BasicMultiplicationHomeComponent },
    { path: 'subtraction', component: BasicSubtractionComponent },
    { path: 'exponentiation/:roundName', component: BasicExponentiationComponent },
    { path: 'exponentiation', component: BasicExponentiationHomeComponent },
    { path: 'lcm', component: LeastCommonMultipleComponent },
    { path: '', component: BasicsHomeComponent }
  ]}

];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class BasicsRoutingModule { }
