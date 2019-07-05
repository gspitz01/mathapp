import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { BasicsHomeComponent } from './basics-home/basics-home.component';
import { BasicsRoutingModule } from './/basics-routing.module';
import { BasicMultiplicationHomeComponent } from './basic-multiplication-home/basic-multiplication-home.component';
import { BasicDivisionHomeComponent } from './basic-division-home/basic-division-home.component';
import { ExponentiationHomeComponent } from './exponentiation-home/exponentiation-home.component';

@NgModule({
  imports: [
    CommonModule,
    BasicsRoutingModule,
    SharedModule
  ],
  declarations: [
    BasicsHomeComponent,
    BasicMultiplicationHomeComponent,
    BasicDivisionHomeComponent,
    ExponentiationHomeComponent,
  ]
})
export class BasicsModule { }
