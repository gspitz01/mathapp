import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule, MatCardModule } from '@angular/material';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { BasicQuizViewComponent } from './basic-quiz-view/basic-quiz-view.component';
import { QuizDirective } from './quiz.directive';
import { HomeComponent } from './home/home.component';
import { BasicsComponent } from './basics/basics.component';
import { FractionsComponent } from './fractions/fractions.component';

import { AppRoutingModule } from './/app-routing.module';
import { FractionQuizViewComponent } from './fraction-quiz-view/fraction-quiz-view.component';
import { BasicAdditionComponent } from './basic-addition/basic-addition.component';
import { BasicSubtractionComponent } from './basic-subtraction/basic-subtraction.component';
import { BasicMultiplicationComponent } from './basic-multiplication/basic-multiplication.component';
import { BasicDivisionComponent } from './basic-division/basic-division.component';
import { FractionAdditionComponent } from './fraction-addition/fraction-addition.component';
import { FractionSubtractionComponent } from './fraction-subtraction/fraction-subtraction.component';
import { FractionMultiplicationComponent } from './fraction-multiplication/fraction-multiplication.component';
import { FractionDivisionComponent } from './fraction-division/fraction-division.component';
import { FractionLcdComponent } from './fraction-lcd/fraction-lcd.component';
import { RouterCardsViewComponent } from './router-cards-view/router-cards-view.component';
import { FractionExplanationViewComponent } from './fraction-explanation-view/fraction-explanation-view.component';

@NgModule({
  declarations: [
    AppComponent,
    BasicQuizViewComponent,
    QuizDirective,
    HomeComponent,
    BasicsComponent,
    FractionsComponent,
    FractionQuizViewComponent,
    BasicAdditionComponent,
    BasicSubtractionComponent,
    BasicMultiplicationComponent,
    BasicDivisionComponent,
    FractionAdditionComponent,
    FractionSubtractionComponent,
    FractionMultiplicationComponent,
    FractionDivisionComponent,
    FractionLcdComponent,
    RouterCardsViewComponent,
    FractionExplanationViewComponent
  ],
  entryComponents: [
    BasicQuizViewComponent,
    FractionQuizViewComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase, 'math-app'),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
