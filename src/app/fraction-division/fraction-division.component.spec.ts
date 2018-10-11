import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FractionDivisionComponent } from './fraction-division.component';
import { FractionQuizViewComponent } from '../fraction-quiz-view/fraction-quiz-view.component';
import { FractionExplanationViewComponent } from '../fraction-explanation-view/fraction-explanation-view.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('FractionDivisionComponent', () => {
  let component: FractionDivisionComponent;
  let fixture: ComponentFixture<FractionDivisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FractionDivisionComponent,
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
    fixture = TestBed.createComponent(FractionDivisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
