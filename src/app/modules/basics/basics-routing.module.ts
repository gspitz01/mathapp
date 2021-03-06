import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BasicsHomeComponent } from './basics-home/basics-home.component';
import { BasicMultiplicationHomeComponent } from './basic-multiplication-home/basic-multiplication-home.component';
import { BasicDivisionHomeComponent } from './basic-division-home/basic-division-home.component';
import { ExponentiationHomeComponent } from './exponentiation-home/exponentiation-home.component';
import { QUIZ_NAMES, PLURAL_NUMBER_NAMES, NUMBER_NAMES, ORDINAL_NUMBER_NAMES } from 'src/app/core/domain/models/constants';
import { BasicQuizViewComponent } from 'src/app/shared/components/basic-quiz-view/basic-quiz-view.component';
import { BASIC_MULTIPLICATION_LEVEL_ORDER } from 'src/app/core/domain/models/basics/basic-multiplication-round-levels';
import { BASIC_DIVISION_LEVEL_ORDER } from 'src/app/core/domain/models/basics/basic-division-round-levels';
import { EXPONENTIATION_LEVEL_ORDER } from 'src/app/core/domain/models/basics/exponentiation-round-levels';
import { LCM_LEVEL_ORDER } from 'src/app/core/domain/models/basics/lcm-round-levels';
import { COMBINATION_LEVEL_ORDER } from 'src/app/core/domain/models/basics/combination-round-levels';
import { BASIC_ADDITION_LEVEL_ORDER } from 'src/app/core/domain/models/basics/basic-addition-round-levels';
import { BASIC_SUBTRACTION_LEVEL_ORDER } from 'src/app/core/domain/models/basics/basic-subtraction-round-levels';
import { GREATEST_COMMON_FACTOR_LEVEL_ORDER } from 'src/app/core/domain/models/basics/gcf-round-levels';

const routes: Routes = [
  { path: '', children: [
    { path: 'combination', component: BasicQuizViewComponent,
      data: {
        startingLevel: 0,
        startingTime: 60,
        levelOrder: COMBINATION_LEVEL_ORDER,
        quizName: QUIZ_NAMES[12],
        title: 'Combination'
      }
    },
    { path: 'addition', component: BasicQuizViewComponent,
      data: {
        startingLevel: 0,
        startingTime: 60,
        levelOrder: BASIC_ADDITION_LEVEL_ORDER,
        quizName: QUIZ_NAMES[0],
        title: 'Addition'
      }
    },
    { path: 'division/:roundName', component: BasicQuizViewComponent,
      data: {
        startingLevel: 0,
        startingTime: 60,
        levelOrder: BASIC_DIVISION_LEVEL_ORDER,
        quizName: QUIZ_NAMES[1],
        title: 'Division',
        roundNamesArray: NUMBER_NAMES,
        defaultRoundIndex: 0,
        defaultRoundName: 'two'
      }
    },
    { path: 'division', component: BasicDivisionHomeComponent },
    { path: 'multiplication/:roundName', component: BasicQuizViewComponent,
      data: {
        startingLevel: 0,
        startingTime: 60,
        levelOrder: BASIC_MULTIPLICATION_LEVEL_ORDER,
        quizName: QUIZ_NAMES[2],
        title: 'Multiplication',
        roundNamesArray: PLURAL_NUMBER_NAMES,
        defaultRoundIndex: 0,
        defaultRoundName: 'twos'
      }
    },
    { path: 'multiplication', component: BasicMultiplicationHomeComponent },
    { path: 'subtraction', component: BasicQuizViewComponent,
      data: {
        startingLevel: 0,
        startingTime: 60,
        levelOrder: BASIC_SUBTRACTION_LEVEL_ORDER,
        quizName: QUIZ_NAMES[3],
        title: 'Subtraction'
      }
    },
    { path: 'exponentiation/:roundName', component: BasicQuizViewComponent,
      data: {
        startingLevel: 0,
        startingTime: 60,
        levelOrder: EXPONENTIATION_LEVEL_ORDER,
        quizName: QUIZ_NAMES[10],
        title: 'Exponentiation',
        roundNamesArray: ORDINAL_NUMBER_NAMES,
        defaultRoundIndex: 0,
        defaultRoundName: 'second'
      }
    },
    { path: 'exponentiation', component: ExponentiationHomeComponent },
    { path: 'lcm', component: BasicQuizViewComponent,
      data: {
        startingLevel: 0,
        startingTime: 60,
        levelOrder: LCM_LEVEL_ORDER,
        quizName: QUIZ_NAMES[11],
        title: 'Least Common Multiple',
      }
    },
    { path: 'gcf', component: BasicQuizViewComponent,
      data: {
        startingLevel: 0,
        startingTime: 60,
        levelOrder: GREATEST_COMMON_FACTOR_LEVEL_ORDER,
        quizName: QUIZ_NAMES[8],
        title: 'Greatest Common Factor'
      }
    },
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
