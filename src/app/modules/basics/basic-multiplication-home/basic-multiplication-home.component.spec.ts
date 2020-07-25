import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { MatCardModule } from '@angular/material';

import { BasicMultiplicationHomeComponent } from './basic-multiplication-home.component';
import { RouterCardsViewComponent } from 'src/app/shared/components/router-cards-view/router-cards-view.component';
import { By } from '@angular/platform-browser';
import { PLURAL_NUMBER_NAMES } from 'src/app/core/domain/models/constants';
import { RouterTestingModule } from '@angular/router/testing';

@Component({
  template: ''
})
class DummyComponent {

}

const basePath = 'fundamentals/multiplication/';
const routes = [];

for (const roundLevelName of PLURAL_NUMBER_NAMES) {
  const lowerCase = roundLevelName.toLocaleLowerCase();
  routes.push({ path: basePath + lowerCase, component: DummyComponent });
}

describe('BasicMultiplicationHomeComponent', () => {
  let component: BasicMultiplicationHomeComponent;
  let fixture: ComponentFixture<BasicMultiplicationHomeComponent>;
  let location: Location;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BasicMultiplicationHomeComponent,
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
    location = TestBed.inject(Location);
    fixture = TestBed.createComponent(BasicMultiplicationHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show router cards for every possible multiplication round', () => {
    const routerCards = fixture.debugElement.queryAll(By.css('mat-card'));
    expect(routerCards.length).toBe(PLURAL_NUMBER_NAMES.length);
    for (let i = 0; i < routerCards.length; i++) {
      expect(routerCards[i].nativeElement.textContent).toBe(PLURAL_NUMBER_NAMES[i]);
    }
  });

  for (const numberName of PLURAL_NUMBER_NAMES) {
    it('should navigate to correct route on click of ' + numberName, fakeAsync(() => {
      fixture.debugElement.query(By.css('#multiplication-' + numberName.toLocaleLowerCase())).nativeElement.click();

      tick();

      expect(location.path()).toBe('/' + basePath + numberName.toLocaleLowerCase());
    }));
  }
});
