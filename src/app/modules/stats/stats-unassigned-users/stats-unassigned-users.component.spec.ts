import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatListModule } from '@angular/material';

import { StatsUnassignedUsersComponent } from './stats-unassigned-users.component';

describe('StatsUnassignedUsersComponent', () => {
  let component: StatsUnassignedUsersComponent;
  let fixture: ComponentFixture<StatsUnassignedUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatsUnassignedUsersComponent ],
      imports: [
        MatListModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsUnassignedUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
