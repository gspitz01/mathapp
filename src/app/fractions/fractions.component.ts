import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { Seconds } from '../seconds';
import { QuizDirective } from '../quiz.directive';
import { FractionQuizViewComponent } from '../fraction-quiz-view/fraction-quiz-view.component';

const defaultTime = new Seconds(60);

@Component({
  selector: 'app-fractions',
  templateUrl: './fractions.component.html',
  styleUrls: ['./fractions.component.scss']
})
export class FractionsComponent implements OnInit {

  @ViewChild(QuizDirective) quizHost: QuizDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
  }

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
    }
  }

  createQuizComponent(level, time) {
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(FractionQuizViewComponent);
    let viewContainerRef = this.quizHost.viewContainerRef;
    viewContainerRef.clear();
    let componentRef = viewContainerRef.createComponent(componentFactory);
    componentRef.instance.startingLevel = level;
    componentRef.instance.startingTime = time;
  }


}
