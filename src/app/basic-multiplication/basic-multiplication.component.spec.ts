import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicMultiplicationComponent } from './basic-multiplication.component';
import { BasicQuizViewComponent } from '../basic-quiz-view/basic-quiz-view.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('BasicMultiplicationComponent', () => {
  let component: BasicMultiplicationComponent;
  let fixture: ComponentFixture<BasicMultiplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BasicMultiplicationComponent,
        BasicQuizViewComponent
      ],
      imports: [
        ReactiveFormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicMultiplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
