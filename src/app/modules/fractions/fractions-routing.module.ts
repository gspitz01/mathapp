import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FractionsHomeComponent } from './fractions-home/fractions-home.component';
import { SimplifyFractionComponent } from './simplify-fraction/simplify-fraction.component';
import { QUIZ_NAMES } from 'src/app/core/domain/models/constants';
import { FRACTION_ADDITION_LEVEL_ORDER, FRACTION_DIVISION_LEVEL_ORDER, FRACTION_MULTIPLICATION_LEVEL_ORDER,
  FRACTION_SUBTRACTION_LEVEL_ORDER } from 'src/app/core/domain/models/fractions/fraction-round-levels';
import { FractionQuizViewComponent } from './fraction-quiz-view/fraction-quiz-view.component';

const routes: Routes = [
  { path: '', children: [
    { path: 'addition', component: FractionQuizViewComponent,
      data: {
        startingLevel: 0,
        startingTime: 60,
        levelOrder: FRACTION_ADDITION_LEVEL_ORDER,
        quizName: QUIZ_NAMES[4],
        title: 'Fraction Addition'
      }
    },
    { path: 'division', component: FractionQuizViewComponent,
      data: {
        startingLevel: 0,
        startingTime: 60,
        levelOrder: FRACTION_DIVISION_LEVEL_ORDER,
        quizName: QUIZ_NAMES[5],
        title: 'Fraction Division'
      }
    },
    { path: 'multiplication', component: FractionQuizViewComponent,
      data: {
        startingLevel: 0,
        startingTime: 60,
        levelOrder: FRACTION_MULTIPLICATION_LEVEL_ORDER,
        quizName: QUIZ_NAMES[6],
        title: 'Fraction Multiplication'
      }
    },
    { path: 'subtraction', component: FractionQuizViewComponent,
      data: {
        startingLevel: 0,
        startingTime: 60,
        levelOrder: FRACTION_SUBTRACTION_LEVEL_ORDER,
        quizName: QUIZ_NAMES[7],
        title: 'Fraction Subtraction'
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
