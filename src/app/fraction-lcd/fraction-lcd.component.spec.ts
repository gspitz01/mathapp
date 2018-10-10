import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FractionLcdComponent } from './fraction-lcd.component';

describe('FractionLcdComponent', () => {
  let component: FractionLcdComponent;
  let fixture: ComponentFixture<FractionLcdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FractionLcdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FractionLcdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
