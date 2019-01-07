import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { BasicsHomeComponent } from './basics-home.component';
import { RouterCardsViewComponent } from '../../../shared/components/router-cards-view/router-cards-view.component';
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

describe('BasicsHomeComponent', () => {
  let component: BasicsHomeComponent;
  let fixture: ComponentFixture<BasicsHomeComponent>;
  let router: Router;
  let location: Location;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BasicsHomeComponent,
        DummyComponent,
        RouterCardsViewComponent
      ],
      imports: [
        MatCardModule,
        RouterTestingModule.withRoutes([
          { path: 'basic-addition', component: DummyComponent },
          { path: 'basic-division', component: DummyComponent },
          { path: 'basic-multiplication', component: DummyComponent },
          { path: 'basic-subtraction', component: DummyComponent }
        ])
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    fixture = TestBed.createComponent(BasicsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to basic addition on click "Basic Addition"', fakeAsync(() => {
    fixture.debugElement.query(By.css("#basic-addition")).nativeElement.click();

    tick();

    expect(location.path()).toBe('/basic-addition');
  }));

  it('should navigate to basic division on click "Basic Division"', fakeAsync(() => {
    fixture.debugElement.query(By.css("#basic-division")).nativeElement.click();

    tick();

    expect(location.path()).toBe('/basic-division');
  }));

  it('should navigate to basic multiplication on click "Basic Multiplication"', fakeAsync(() => {
    fixture.debugElement.query(By.css("#basic-multiplication")).nativeElement.click();

    tick();

    expect(location.path()).toBe('/basic-multiplication');
  }));

  it('should navigate to basic subtraction on click "Basic Subtraction"', fakeAsync(() => {
    fixture.debugElement.query(By.css("#basic-subtraction")).nativeElement.click();

    tick();

    expect(location.path()).toBe('/basic-subtraction');
  }));
});
