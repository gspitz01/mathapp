import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FractionExplanationViewComponent } from './fraction-explanation-view.component';

describe('FractionExplanationViewComponent', () => {
  let component: FractionExplanationViewComponent;
  let fixture: ComponentFixture<FractionExplanationViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FractionExplanationViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FractionExplanationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
