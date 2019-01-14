import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatListModule, MatButtonModule } from '@angular/material';

import { StatsRoutingModule } from './stats-routing.module';
import { StatsHomeComponent } from './stats-home/stats-home.component';
import { StatsTeacherComponent } from './stats-teacher/stats-teacher.component';
import { StatsClassComponent } from './stats-class/stats-class.component';
import { StatsUserComponent } from './stats-user/stats-user.component';
import { StatsStudentComponent } from './stats-student/stats-student.component';
import { StatsUnassignedUsersComponent } from './stats-unassigned-users/stats-unassigned-users.component';
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
  imports: [
    CommonModule,
    StatsRoutingModule,
    MatListModule,
    MatButtonModule,
    CoreModule
  ],
  declarations: [
    StatsHomeComponent,
    StatsTeacherComponent,
    StatsClassComponent,
    StatsUserComponent,
    StatsStudentComponent,
    StatsUnassignedUsersComponent
  ]
})
export class StatsModule { }
