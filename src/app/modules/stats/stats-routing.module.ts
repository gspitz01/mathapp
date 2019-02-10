import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { StatsHomeComponent } from "./stats-home/stats-home.component";
import { StatsGuardService } from "src/app/core/services/stats-guard.service";
import { StatsSelfComponent } from "./stats-self/stats-self.component";

const routes: Routes = [
  { path: 'student-self', component: StatsSelfComponent },
  { path: '', component: StatsHomeComponent, canActivate: [StatsGuardService] }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class StatsRoutingModule { }
