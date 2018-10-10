import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material';

import { AppComponent } from './app.component';
import { BasicQuizViewComponent } from './basic-quiz-view/basic-quiz-view.component';
import { QuizDirective } from './quiz.directive';
import { HomeComponent } from './home/home.component';
import { BasicsComponent } from './basics/basics.component';
import { FractionsComponent } from './fractions/fractions.component';

import { AppRoutingModule } from './/app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    BasicQuizViewComponent,
    QuizDirective,
    HomeComponent,
    BasicsComponent,
    FractionsComponent
  ],
  entryComponents: [
    BasicQuizViewComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
