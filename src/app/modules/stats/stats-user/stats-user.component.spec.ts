import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsUserComponent } from './stats-user.component';
import { CoreModule } from 'src/app/core/core.module';
import { of } from 'rxjs';
import { User } from 'src/app/core/domain/models/user';
import { Stats } from 'src/app/core/domain/models/stats';

describe('StatsUserComponent', () => {
  let component: StatsUserComponent;
  let fixture: ComponentFixture<StatsUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatsUserComponent ],
      imports: [
        CoreModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsUserComponent);
    component = fixture.componentInstance;
    component.user = new User("someId", "John Name", "Name", null);
    component.userStats = of([new Stats(new Date(), new Date(), "Whatever", 10, 3, [])]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
