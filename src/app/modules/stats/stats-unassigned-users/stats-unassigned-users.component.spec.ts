import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';

import { MatListModule } from '@angular/material';

import { of } from 'rxjs';

import { StatsUnassignedUsersComponent } from './stats-unassigned-users.component';
import { User } from 'src/app/core/domain/models/user';
import { By } from '@angular/platform-browser';

describe('StatsUnassignedUsersComponent', () => {
  let component: StatsUnassignedUsersComponent;
  let fixture: ComponentFixture<StatsUnassignedUsersComponent>;
  const testUsers = [new User("User01", "Jim User", "User", "Alg1"),
    new User("User02", "Tina Fey", "Fey", "Writing for TV")];
  let usersList: DebugElement[];

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
    component.users = of(testUsers);
    fixture.detectChanges();
    usersList = fixture.debugElement.queryAll(By.css('.user-list-item'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display users', () => {
    expect(usersList.length).toBe(testUsers.length);
    expect(usersList[0].nativeElement.textContent).toBe(testUsers[0].name);
    expect(usersList[1].nativeElement.textContent).toBe(testUsers[1].name);
  });

  it('should emit user selected event when user clicked', () => {
    let selectedUserId: string;
    component.userSelected.subscribe(userId => selectedUserId = userId);
    usersList[0].query(By.css('a')).nativeElement.click();
    expect(selectedUserId).toBe(testUsers[0].id);
  });

  it('should emit stop adding users event on click of x', () => {
    let eventEmitted = false;
    component.stopAddingUsersClick.subscribe(() => eventEmitted = true);
    fixture.debugElement.query(By.css('.small-button')).nativeElement.click();
    expect(eventEmitted).toBe(true);
  });
});
