import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicSubtractionComponent } from './basic-subtraction.component';
import { BasicQuizViewComponent } from '../basic-quiz-view/basic-quiz-view.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('BasicSubtractionComponent', () => {
  let component: BasicSubtractionComponent;
  let fixture: ComponentFixture<BasicSubtractionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BasicSubtractionComponent,
        BasicQuizViewComponent
      ],
      imports: [
        ReactiveFormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicSubtractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
