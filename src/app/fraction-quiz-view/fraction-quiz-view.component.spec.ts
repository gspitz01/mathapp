import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FractionQuizViewComponent } from './fraction-quiz-view.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Seconds } from '../seconds';

describe('FractionQuizViewComponent', () => {
  let component: FractionQuizViewComponent;
  let fixture: ComponentFixture<FractionQuizViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FractionQuizViewComponent ],
      imports: [
        ReactiveFormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FractionQuizViewComponent);
    component = fixture.componentInstance;
    component.startingTime = new Seconds(20);
    component.startingLevel = 1;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
