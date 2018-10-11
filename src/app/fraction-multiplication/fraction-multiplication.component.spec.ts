import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FractionMultiplicationComponent } from './fraction-multiplication.component';
import { FractionQuizViewComponent } from '../fraction-quiz-view/fraction-quiz-view.component';
import { FractionExplanationViewComponent } from '../fraction-explanation-view/fraction-explanation-view.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('FractionMultiplicationComponent', () => {
  let component: FractionMultiplicationComponent;
  let fixture: ComponentFixture<FractionMultiplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FractionMultiplicationComponent,
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
    fixture = TestBed.createComponent(FractionMultiplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
