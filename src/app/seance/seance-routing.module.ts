import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AddSeanceComponent} from './add-seance/add-seance.component';
import {AllSeancesComponent} from './all-seances/all-seances.component';

const routes: Routes = [
  {
    path: 'all-seances',
    component: AllSeancesComponent
  },
  {
    path: 'add-seance',
    component: AddSeanceComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeanceRoutingModule {
}
