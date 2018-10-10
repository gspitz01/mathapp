import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicAdditionComponent } from './basic-addition.component';

describe('BasicAdditionComponent', () => {
  let component: BasicAdditionComponent;
  let fixture: ComponentFixture<BasicAdditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicAdditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicAdditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
