import { Component, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { Seconds } from './seconds';
import { QuizViewComponent } from './quiz-view/quiz-view.component';
import { QuizDirective } from './quiz.directive';

const defaultTime = new Seconds(20);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Arithmetizer';
  @ViewChild(QuizDirective) quizHost: QuizDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  linkClick(linkName: string) {
    switch(linkName) {
      case 'Addition':
        this.createQuizComponent(1, defaultTime);
        break;
      case 'Subtraction':
        this.createQuizComponent(6, defaultTime);
        break;
      case 'Multiplication':
        this.createQuizComponent(11, defaultTime);
        break;
      case 'Division':
        this.createQuizComponent(16, defaultTime);
        break;
      case 'Fraction Addition':
        this.createQuizComponent(21, defaultTime);
        break;
      case 'Fraction Subtraction':
        this.createQuizComponent(21, defaultTime);
        break;
      case 'Fraction Multiplication':
        this.createQuizComponent(21, defaultTime);
        break;
      case 'Fraction Division':
        this.createQuizComponent(21, defaultTime);
        break;

    }
  }

  createQuizComponent(level, time) {
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(QuizViewComponent);
    let viewContainerRef = this.quizHost.viewContainerRef;
    viewContainerRef.clear();
    let componentRef = viewContainerRef.createComponent(componentFactory);
    componentRef.instance.startingLevel = level;
    componentRef.instance.startingTime = time;
  }
}
