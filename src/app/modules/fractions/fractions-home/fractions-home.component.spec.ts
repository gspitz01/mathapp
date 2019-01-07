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
          { path: 'fraction-addition', component: DummyComponent },
          { path: 'fraction-division', component: DummyComponent },
          { path: 'fraction-multiplication', component: DummyComponent },
          { path: 'fraction-subtraction', component: DummyComponent }
        ])
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.get(Router);
    location = TestBed.get(Location);
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
    expect(location.path()).toBe('/fraction-addition');
  }));

  it('should navigate to fraction division on click "Division"', fakeAsync(() => {
    fixture.debugElement.query(By.css("#fraction-division")).nativeElement.click();
    tick();
    expect(location.path()).toBe('/fraction-division');
  }));

  it('should navigate to fraction multiplication on click "Multiplication"', fakeAsync(() => {
    fixture.debugElement.query(By.css("#fraction-multiplication")).nativeElement.click();
    tick();
    expect(location.path()).toBe('/fraction-multiplication');
  }));

  it('should navigate to fraction subtraction on click "Subtraction"', fakeAsync(() => {
    fixture.debugElement.query(By.css("#fraction-subtraction")).nativeElement.click();
    tick();
    expect(location.path()).toBe('/fraction-subtraction');
  }));
});
