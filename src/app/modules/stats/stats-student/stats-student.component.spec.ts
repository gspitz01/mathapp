import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatListModule } from '@angular/material';

import { StatsStudentComponent } from './stats-student.component';

describe('StatsStudentComponent', () => {
  let component: StatsStudentComponent;
  let fixture: ComponentFixture<StatsStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatsStudentComponent ],
      imports: [
        MatListModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
