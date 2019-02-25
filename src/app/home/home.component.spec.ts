import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { RouterCardsViewComponent } from '../shared/components/router-cards-view/router-cards-view.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatCardModule } from '@angular/material';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  template: ''
})
class DummyComponent {

}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let router: Router;
  let location: Location;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        DummyComponent,
        RouterCardsViewComponent
      ],
      imports: [
        MatCardModule,
        RouterTestingModule.withRoutes([
          { path: 'fundamentals', component: DummyComponent },
          { path: 'fractions', component: DummyComponent }
        ])
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to fundamentals on click "Fundamentals"', fakeAsync(() => {
    fixture.debugElement.query(By.css("#fundamentals")).nativeElement.click();

    tick();

    expect(location.path()).toBe('/fundamentals');
  }));

  it('should navigate to fractions on click "Fractions"', fakeAsync(() => {
    fixture.debugElement.query(By.css("#fractions")).nativeElement.click();

    tick();

    expect(location.path()).toBe('/fractions');
  }));
});
