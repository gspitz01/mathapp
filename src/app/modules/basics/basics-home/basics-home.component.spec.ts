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

const basePath = "fundamentals/";

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
          { path: basePath + 'addition', component: DummyComponent },
          { path: basePath + 'division', component: DummyComponent },
          { path: basePath + 'multiplication', component: DummyComponent },
          { path: basePath + 'subtraction', component: DummyComponent }
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

  it('should navigate to addition on click "Addition"', fakeAsync(() => {
    fixture.debugElement.query(By.css("#basic-addition")).nativeElement.click();

    tick();

    expect(location.path()).toBe('/' + basePath + 'addition');
  }));

  it('should navigate to division on click "Division"', fakeAsync(() => {
    fixture.debugElement.query(By.css("#basic-division")).nativeElement.click();

    tick();

    expect(location.path()).toBe('/' + basePath + 'division');
  }));

  it('should navigate to multiplication on click "Multiplication"', fakeAsync(() => {
    fixture.debugElement.query(By.css("#basic-multiplication")).nativeElement.click();

    tick();

    expect(location.path()).toBe('/' + basePath + 'multiplication');
  }));

  it('should navigate to subtraction on click "Subtraction"', fakeAsync(() => {
    fixture.debugElement.query(By.css("#basic-subtraction")).nativeElement.click();

    tick();

    expect(location.path()).toBe('/' + basePath + 'subtraction');
  }));
});
