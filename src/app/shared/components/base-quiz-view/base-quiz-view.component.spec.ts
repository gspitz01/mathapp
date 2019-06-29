import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseQuizViewComponent } from './base-quiz-view.component';
import { StatsService } from 'src/app/core/services/stats.service';

describe('BaseQuizViewComponent', () => {
  let component: BaseQuizViewComponent;
  let fixture: ComponentFixture<BaseQuizViewComponent>;
  const mockStatsService = jasmine.createSpyObj('StatsService', ['getMaxLevels', 'AddStats']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseQuizViewComponent ],
      providers: [
        { provide: StatsService, useValue: mockStatsService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseQuizViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
