import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AllPlanificationsComponent} from './all-planifications/all-planifications.component';
import {AddPlanificationComponent} from './add-planification/add-planification.component';
import {EditPlanificationComponent} from './edit-planification/edit-planification.component';


const routes: Routes = [
  {
    path: 'all-planifications',
    component: AllPlanificationsComponent
  },
  {
    path: 'add-planification',
    component: AddPlanificationComponent
  },
  {
    path: 'edit-planification',
    component: EditPlanificationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanificationRoutingModule {
}
