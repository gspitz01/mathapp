import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterCardsViewComponent } from './router-cards-view.component';

describe('RouterCardsViewComponent', () => {
  let component: RouterCardsViewComponent;
  let fixture: ComponentFixture<RouterCardsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouterCardsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouterCardsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
