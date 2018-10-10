import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FractionDivisionComponent } from './fraction-division.component';

describe('FractionDivisionComponent', () => {
  let component: FractionDivisionComponent;
  let fixture: ComponentFixture<FractionDivisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FractionDivisionComponent ]
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
