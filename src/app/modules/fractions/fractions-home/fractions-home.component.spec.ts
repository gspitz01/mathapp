import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { FractionsHomeComponent } from './fractions-home.component';
import { FractionExplanationViewComponent } from '../fraction-explanation-view/fraction-explanation-view.component';
import { RouterCardsViewComponent } from '../../../shared/components/router-cards-view/router-cards-view.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatCardModule } from '@angular/material';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { By } from '@angular/platform-browser';

@Component({
  template: ''
})
class DummyComponent {}

describe('FractionsHomeComponent', () => {
  let component: FractionsHomeComponent;
  let fixture: ComponentFixture<FractionsHomeComponent>;
  let router: Router;
  let location: Location;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FractionsHomeComponent,
        FractionExplanationViewComponent,
        DummyComponent,
        RouterCardsViewComponent
      ],
      imports: [
        MatCardModule,
        RouterTestingModule.withRoutes([
          { path: 'fractions/addition', component: DummyComponent },
          { path: 'fractions/division', component: DummyComponent },
          { path: 'fractions/multiplication', component: DummyComponent },
          { path: 'fractions/subtraction', component: DummyComponent }
        ])
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    fixture = TestBed.createComponent(FractionsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to fraction addition on click "Addition"', fakeAsync(() => {
    fixture.debugElement.query(By.css("#fraction-addition")).nativeElement.click();
    tick();
    expect(location.path()).toBe('/fractions/addition');
  }));

  it('should navigate to fraction division on click "Division"', fakeAsync(() => {
    fixture.debugElement.query(By.css("#fraction-division")).nativeElement.click();
    tick();
    expect(location.path()).toBe('/fractions/division');
  }));

  it('should navigate to fraction multiplication on click "Multiplication"', fakeAsync(() => {
    fixture.debugElement.query(By.css("#fraction-multiplication")).nativeElement.click();
    tick();
    expect(location.path()).toBe('/fractions/multiplication');
  }));

  it('should navigate to fraction subtraction on click "Subtraction"', fakeAsync(() => {
    fixture.debugElement.query(By.css("#fraction-subtraction")).nativeElement.click();
    tick();
    expect(location.path()).toBe('/fractions/subtraction');
  }));
});
