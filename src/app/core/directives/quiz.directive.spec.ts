import { QuizDirective } from './quiz.directive';

describe('QuizDirective', () => {
  it('should create an instance', () => {
    const spyViewContainerRef = jasmine.createSpyObj('ViewContainerRef', ['clear', 'createComponent']);
    const directive = new QuizDirective(spyViewContainerRef);
    expect(directive).toBeTruthy();
  });
});
