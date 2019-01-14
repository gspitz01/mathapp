import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { StatsHomeComponent } from "./stats-home/stats-home.component";

// TODO: add StatsAuthGuard
const routes: Routes = [
  { path: '', component: StatsHomeComponent }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class StatsRoutingModule { }
