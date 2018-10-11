import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FractionSubtractionComponent } from './fraction-subtraction.component';
import { FractionQuizViewComponent } from '../fraction-quiz-view/fraction-quiz-view.component';
import { FractionExplanationViewComponent } from '../fraction-explanation-view/fraction-explanation-view.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('FractionSubtractionComponent', () => {
  let component: FractionSubtractionComponent;
  let fixture: ComponentFixture<FractionSubtractionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FractionSubtractionComponent,
        FractionQuizViewComponent,
        FractionExplanationViewComponent
      ],
      imports: [
        ReactiveFormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FractionSubtractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
