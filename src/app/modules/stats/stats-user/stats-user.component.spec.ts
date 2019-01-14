import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsUserComponent } from './stats-user.component';
import { User } from 'src/app/shared/models/user';

describe('StatsUserComponent', () => {
  let component: StatsUserComponent;
  let fixture: ComponentFixture<StatsUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatsUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsUserComponent);
    component = fixture.componentInstance;
    component.user = new User("someId", "John Name", "Name", null);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
