import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicAdditionComponent } from './basic-addition.component';
import { BasicQuizViewComponent } from '../basic-quiz-view/basic-quiz-view.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('BasicAdditionComponent', () => {
  let component: BasicAdditionComponent;
  let fixture: ComponentFixture<BasicAdditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BasicAdditionComponent,
        BasicQuizViewComponent
      ],
      imports: [
        ReactiveFormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicAdditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
