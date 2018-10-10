import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicSubtractionComponent } from './basic-subtraction.component';

describe('BasicSubtractionComponent', () => {
  let component: BasicSubtractionComponent;
  let fixture: ComponentFixture<BasicSubtractionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicSubtractionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicSubtractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
