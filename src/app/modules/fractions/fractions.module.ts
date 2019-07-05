import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { FractionsHomeComponent } from './fractions-home/fractions-home.component';
import { FractionExplanationViewComponent } from './fraction-explanation-view/fraction-explanation-view.component';
import { FractionQuizViewComponent } from './fraction-quiz-view/fraction-quiz-view.component';
import { SimplifyFractionComponent } from './simplify-fraction/simplify-fraction.component';
import { FractionsRoutingModule } from './/fractions-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FractionsRoutingModule,
    SharedModule
  ],
  declarations: [
    FractionsHomeComponent,
    FractionExplanationViewComponent,
    FractionQuizViewComponent,
    SimplifyFractionComponent
  ]
})
export class FractionsModule { }
