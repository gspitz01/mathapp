import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FractionAdditionComponent } from './fraction-addition.component';
import { FractionQuizViewComponent } from '../fraction-quiz-view/fraction-quiz-view.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FractionExplanationViewComponent } from '../fraction-explanation-view/fraction-explanation-view.component';

describe('FractionAdditionComponent', () => {
  let component: FractionAdditionComponent;
  let fixture: ComponentFixture<FractionAdditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FractionAdditionComponent,
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
    fixture = TestBed.createComponent(FractionAdditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
