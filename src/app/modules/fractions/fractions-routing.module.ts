import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FractionsHomeComponent } from './fractions-home/fractions-home.component';
import { FractionAdditionComponent } from './fraction-addition/fraction-addition.component';
import { FractionDivisionComponent } from './fraction-division/fraction-division.component';
import { FractionMultiplicationComponent } from './fraction-multiplication/fraction-multiplication.component';
import { FractionSubtractionComponent } from './fraction-subtraction/fraction-subtraction.component';
import { SimplifyFractionComponent } from './simplify-fraction/simplify-fraction.component';
import { GREATEST_COMMON_FACTOR_LEVEL_ORDER } from 'src/app/core/domain/models/fractions/gcf-round-levels';
import { QUIZ_NAMES } from 'src/app/core/domain/models/constants';
import { BasicQuizViewComponent } from 'src/app/shared/components/basic-quiz-view/basic-quiz-view.component';

const routes: Routes = [
  { path: '', children: [
    { path: 'addition', component: FractionAdditionComponent },
    { path: 'division', component: FractionDivisionComponent },
    { path: 'multiplication', component: FractionMultiplicationComponent },
    { path: 'subtraction', component: FractionSubtractionComponent },
    { path: 'gcf', component: BasicQuizViewComponent,
      data: {
        startingLevel: 0,
        startingTime: 60,
        levelOrder: GREATEST_COMMON_FACTOR_LEVEL_ORDER,
        quizName: QUIZ_NAMES[8],
        title: 'Greatest Common Factor'
      }
    },
    { path: 'simplify', component: SimplifyFractionComponent },
    { path: '', component: FractionsHomeComponent }
  ]}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class FractionsRoutingModule { }
