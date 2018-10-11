import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FractionsComponent } from './fractions.component';
import { FractionExplanationViewComponent } from '../fraction-explanation-view/fraction-explanation-view.component';
import { RouterCardsViewComponent } from '../router-cards-view/router-cards-view.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatCardModule } from '@angular/material';

describe('FractionsComponent', () => {
  let component: FractionsComponent;
  let fixture: ComponentFixture<FractionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FractionsComponent,
        FractionExplanationViewComponent,
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
    fixture = TestBed.createComponent(FractionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
