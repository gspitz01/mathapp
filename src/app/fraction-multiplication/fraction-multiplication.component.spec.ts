import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FractionMultiplicationComponent } from './fraction-multiplication.component';

describe('FractionMultiplicationComponent', () => {
  let component: FractionMultiplicationComponent;
  let fixture: ComponentFixture<FractionMultiplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FractionMultiplicationComponent ]
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
