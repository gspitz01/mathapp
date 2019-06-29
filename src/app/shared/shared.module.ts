import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatCardModule, MatListModule } from '@angular/material';

import { RouterCardsViewComponent } from './components/router-cards-view/router-cards-view.component';
import { BasicQuizViewComponent } from './components/basic-quiz-view/basic-quiz-view.component';
import { BaseQuizViewComponent } from './components/base-quiz-view/base-quiz-view.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatListModule
  ],
  declarations: [
    RouterCardsViewComponent,
    BasicQuizViewComponent,
    BaseQuizViewComponent
  ],
  exports: [
    RouterCardsViewComponent,
    BasicQuizViewComponent,
    FormsModule,
    ReactiveFormsModule,
    MatListModule
  ]
})
export class SharedModule { }
