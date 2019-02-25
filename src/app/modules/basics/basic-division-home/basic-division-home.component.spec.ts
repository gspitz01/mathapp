import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { BasicDivisionHomeComponent } from './basic-division-home.component';
import { NUMBER_NAMES } from 'src/app/core/domain/models/constants';
import { RouterCardsViewComponent } from 'src/app/shared/components/router-cards-view/router-cards-view.component';
import { MatCardModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { Location } from '@angular/common';

@Component({
  template: ''
})
class DummyComponent {

}

const basePath = "basics/division/";
let routes = [];

for (let roundLevelName of NUMBER_NAMES) {
  let lowerCase = roundLevelName.toLocaleLowerCase();
  routes.push({ path: basePath + lowerCase, component: DummyComponent });
}

describe('BasicDivisionHomeComponent', () => {
  let component: BasicDivisionHomeComponent;
  let fixture: ComponentFixture<BasicDivisionHomeComponent>;
  let location: Location;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BasicDivisionHomeComponent,
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
    fixture = TestBed.createComponent(BasicDivisionHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show router cards for every possible division round', () => {
    const routerCards = fixture.debugElement.queryAll(By.css('mat-card'));
    expect(routerCards.length).toBe(NUMBER_NAMES.length);
    for (let i = 0; i < routerCards.length; i++) {
      expect(routerCards[i].nativeElement.textContent).toBe("By " + NUMBER_NAMES[i]);
    }
  });

  for (let numberName of NUMBER_NAMES) {
    it('should navigate to correct route on click of ' + numberName, fakeAsync(() => {
      fixture.debugElement.query(By.css("#division-" + numberName.toLocaleLowerCase())).nativeElement.click();

      tick();

      expect(location.path()).toBe("/" + basePath + numberName.toLocaleLowerCase());
    }));
  }
});
