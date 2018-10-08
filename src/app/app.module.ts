import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { QuizViewComponent } from './quiz-view/quiz-view.component';
import { QuizDirective } from './quiz.directive';

@NgModule({
  declarations: [
    AppComponent,
    QuizViewComponent,
    QuizDirective
  ],
  entryComponents: [
    QuizViewComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
