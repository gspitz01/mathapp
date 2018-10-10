import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FractionSubtractionComponent } from './fraction-subtraction.component';

describe('FractionSubtractionComponent', () => {
  let component: FractionSubtractionComponent;
  let fixture: ComponentFixture<FractionSubtractionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FractionSubtractionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FractionSubtractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
