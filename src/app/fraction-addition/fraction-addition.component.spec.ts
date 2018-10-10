import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FractionAdditionComponent } from './fraction-addition.component';

describe('FractionAdditionComponent', () => {
  let component: FractionAdditionComponent;
  let fixture: ComponentFixture<FractionAdditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FractionAdditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FractionAdditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
