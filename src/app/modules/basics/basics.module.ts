import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { BasicsHomeComponent } from './basics-home/basics-home.component';
import { BasicAdditionComponent } from './basic-addition/basic-addition.component';
import { BasicDivisionComponent } from './basic-division/basic-division.component';
import { BasicMultiplicationComponent } from './basic-multiplication/basic-multiplication.component';
import { BasicSubtractionComponent } from './basic-subtraction/basic-subtraction.component';
import { BasicsRoutingModule } from './/basics-routing.module';
import { BasicMultiplicationHomeComponent } from './basic-multiplication-home/basic-multiplication-home.component';
import { BasicDivisionHomeComponent } from './basic-division-home/basic-division-home.component';
import { ExponentiationComponent } from './exponentiation/exponentiation.component';
import { ExponentiationHomeComponent } from './exponentiation-home/exponentiation-home.component';
import { LeastCommonMultipleComponent } from './least-common-multiple/least-common-multiple.component';

@NgModule({
  imports: [
    CommonModule,
    BasicsRoutingModule,
    SharedModule
  ],
  declarations: [
    BasicsHomeComponent,
    BasicAdditionComponent,
    BasicDivisionComponent,
    BasicMultiplicationComponent,
    BasicSubtractionComponent,
    BasicMultiplicationHomeComponent,
    BasicDivisionHomeComponent,
    ExponentiationComponent,
    ExponentiationHomeComponent,
    LeastCommonMultipleComponent
  ]
})
export class BasicsModule { }
