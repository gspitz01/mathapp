import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { FractionsHomeComponent } from './fractions-home/fractions-home.component';
import { FractionAdditionComponent } from './fraction-addition/fraction-addition.component';
import { FractionDivisionComponent } from './fraction-division/fraction-division.component';
import { FractionExplanationViewComponent } from './fraction-explanation-view/fraction-explanation-view.component';
import { FractionLcdComponent } from './fraction-lcd/fraction-lcd.component';
import { FractionQuizViewComponent } from './fraction-quiz-view/fraction-quiz-view.component';
import { FractionSubtractionComponent } from './fraction-subtraction/fraction-subtraction.component';
import { SimplifyFractionComponent } from './simplify-fraction/simplify-fraction.component';
import { FractionsRoutingModule } from './/fractions-routing.module';
import { FractionMultiplicationComponent } from './fraction-multiplication/fraction-multiplication.component';

@NgModule({
  imports: [
    CommonModule,
    FractionsRoutingModule,
    SharedModule
  ],
  declarations: [
    FractionsHomeComponent,
    FractionAdditionComponent,
    FractionDivisionComponent,
    FractionMultiplicationComponent,
    FractionExplanationViewComponent,
    FractionLcdComponent,
    FractionQuizViewComponent,
    FractionSubtractionComponent,
    SimplifyFractionComponent
  ]
})
export class FractionsModule { }
