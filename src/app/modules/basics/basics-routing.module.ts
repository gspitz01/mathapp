import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BasicsHomeComponent } from './basics-home/basics-home.component';
import { BasicAdditionComponent } from './basic-addition/basic-addition.component';
import { BasicDivisionComponent } from './basic-division/basic-division.component';
import { BasicMultiplicationComponent } from './basic-multiplication/basic-multiplication.component';
import { BasicSubtractionComponent } from './basic-subtraction/basic-subtraction.component';

const routes: Routes = [
  { path: '', children: [
    { path: 'addition', component: BasicAdditionComponent },
    { path: 'division', component: BasicDivisionComponent },
    { path: 'multiplication', component: BasicMultiplicationComponent },
    { path: 'subtraction', component: BasicSubtractionComponent },
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
