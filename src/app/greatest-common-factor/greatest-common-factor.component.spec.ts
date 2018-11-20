import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GreatestCommonFactorComponent } from './greatest-common-factor.component';

describe('GreatestCommonFactorComponent', () => {
  let component: GreatestCommonFactorComponent;
  let fixture: ComponentFixture<GreatestCommonFactorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GreatestCommonFactorComponent ]
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
