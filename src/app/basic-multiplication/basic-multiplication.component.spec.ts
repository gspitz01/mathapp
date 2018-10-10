import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicMultiplicationComponent } from './basic-multiplication.component';

describe('BasicMultiplicationComponent', () => {
  let component: BasicMultiplicationComponent;
  let fixture: ComponentFixture<BasicMultiplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicMultiplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicMultiplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
