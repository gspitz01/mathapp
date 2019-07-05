import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { BasicExponentiationHomeComponent } from './basic-exponentiation-home.component';
import { Component } from '@angular/core';
import { ORDINAL_NUMBER_NAMES } from 'src/app/core/domain/models/constants';
import { RouterCardsViewComponent } from 'src/app/shared/components/router-cards-view/router-cards-view.component';
import { MatCardModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';
import { By } from '@angular/platform-browser';

@Component({
  template: ''
})
class DummyComponent {

}

const basePath = 'fundamentals/exponentiation/';
const routes = [];
const numRoutes = 3;

for (let i = 0; i < numRoutes; i++) {
  const lowerCase = ORDINAL_NUMBER_NAMES[i].toLocaleLowerCase();
  routes.push({ path: basePath + lowerCase, component: DummyComponent });
}

describe('BasicExponentiationHomeComponent', () => {
  let component: BasicExponentiationHomeComponent;
  let fixture: ComponentFixture<BasicExponentiationHomeComponent>;
  let location: Location;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BasicExponentiationHomeComponent,
        RouterCardsViewComponent,
        DummyComponent
      ],
      imports: [
        MatCardModule,
        RouterTestingModule.withRoutes(routes)
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    location = TestBed.get(Location);
    fixture = TestBed.createComponent(BasicExponentiationHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show router cards for every possible exponentiation round', () => {
    const routerCards = fixture.debugElement.queryAll(By.css('mat-card'));
    expect(routerCards.length).toBe(numRoutes);
    for (let i = 0; i < routerCards.length; i++) {
      expect(routerCards[i].nativeElement.textContent).toBe(ORDINAL_NUMBER_NAMES[i] + ' Power');
    }
  });

  for (let i = 0; i < numRoutes; i++) {
    const numberName = ORDINAL_NUMBER_NAMES[i];
    it('should navigate to correct route on click of ' + numberName, fakeAsync(() => {
      fixture.debugElement.query(By.css('#exponentiation-' + numberName.toLocaleLowerCase())).nativeElement.click();

      tick();

      expect(location.path()).toBe('/' + basePath + numberName.toLocaleLowerCase());
    }));
  }
});
