import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterCardsViewComponent } from './router-cards-view.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatCardModule } from '@angular/material';

describe('RouterCardsViewComponent', () => {
  let component: RouterCardsViewComponent;
  let fixture: ComponentFixture<RouterCardsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouterCardsViewComponent ],
      imports: [
        RouterTestingModule,
        MatCardModule
      ]
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
