import { TestBed, async, fakeAsync, ComponentFixture, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { MatListModule } from '@angular/material';

import { AngularFireAuth } from 'angularfire2/auth';

import { AppComponent } from './app.component';
import { BasicQuizViewComponent } from './shared/components/basic-quiz-view/basic-quiz-view.component';
import { AuthComponent } from './auth/auth.component';
import { AngularFireDatabase } from 'angularfire2/database';
import { MockAngularFireAuth, MockAngularFireDataBase } from './core/domain/models/test-constants.spec';

@Component({
  template: ''
})
class DummyComponent {

}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;
  let location: Location;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        AuthComponent,
        BasicQuizViewComponent,
        DummyComponent
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([
          { path: 'basics', component: DummyComponent },
          { path: 'fractions', component: DummyComponent }
        ]),
        MatListModule
      ],
      providers: [
        { provide: AngularFireAuth, useClass: MockAngularFireAuth },
        { provide: AngularFireDatabase, useClass: MockAngularFireDataBase }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });


  it('should create the app', async(() => {
    expect(component).toBeTruthy();
  }));

  it('should navigate to basics component on click "Basics"', fakeAsync(() => {
    fixture.debugElement.query(By.css('#basics-nav')).nativeElement.click();

    tick();

    expect(location.path()).toBe('/basics');
  }));

  it('should navigate to fractions component on click "Fractions"', fakeAsync(() => {
    fixture.debugElement.query(By.css('#fractions-nav')).nativeElement.click();

    tick();

    expect(location.path()).toBe('/fractions');
  }));
});
