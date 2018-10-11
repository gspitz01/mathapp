import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicsComponent } from './basics.component';
import { RouterCardsViewComponent } from '../router-cards-view/router-cards-view.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatCardModule } from '@angular/material';

describe('BasicsComponent', () => {
  let component: BasicsComponent;
  let fixture: ComponentFixture<BasicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BasicsComponent,
        RouterCardsViewComponent
      ],
      imports: [
        RouterTestingModule,
        MatCardModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
