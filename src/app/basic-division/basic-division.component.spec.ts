import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicDivisionComponent } from './basic-division.component';
import { BasicQuizViewComponent } from '../basic-quiz-view/basic-quiz-view.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('BasicDivisionComponent', () => {
  let component: BasicDivisionComponent;
  let fixture: ComponentFixture<BasicDivisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BasicDivisionComponent,
        BasicQuizViewComponent
      ],
      imports: [
        ReactiveFormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicDivisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
