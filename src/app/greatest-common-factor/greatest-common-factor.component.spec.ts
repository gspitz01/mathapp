import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { MatListModule } from '@angular/material';

import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import { GreatestCommonFactorComponent } from './greatest-common-factor.component';
import { BasicQuizViewComponent } from '../basic-quiz-view/basic-quiz-view.component';
import { MockAngularFireDataBase, MockAngularFireAuth } from '../test-constants';

describe('GreatestCommonFactorComponent', () => {
  let component: GreatestCommonFactorComponent;
  let fixture: ComponentFixture<GreatestCommonFactorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        GreatestCommonFactorComponent,
        BasicQuizViewComponent
      ],
      imports: [
        ReactiveFormsModule,
        MatListModule
      ],
      providers: [
        { provide: AngularFireDatabase, useClass: MockAngularFireDataBase },
        { provide: AngularFireAuth, useClass: MockAngularFireAuth }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GreatestCommonFactorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
