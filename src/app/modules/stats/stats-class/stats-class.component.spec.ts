import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatListModule } from '@angular/material';

import { StatsClassComponent } from './stats-class.component';

describe('StatsClassComponent', () => {
  let component: StatsClassComponent;
  let fixture: ComponentFixture<StatsClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatsClassComponent ],
      imports: [
        MatListModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
