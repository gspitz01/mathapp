import { TestBed, async, fakeAsync, ComponentFixture, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { BasicQuizViewComponent } from './basic-quiz-view/basic-quiz-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

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
        BasicQuizViewComponent,
        DummyComponent
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([
          { path: 'basics', component: DummyComponent },
          { path: 'fractions', component: DummyComponent }
        ])
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
