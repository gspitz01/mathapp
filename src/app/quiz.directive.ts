import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appQuiz]'
})
export class QuizDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
