import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AllTerrainComponent} from './all-terrain/all-terrain.component';
import {AddTerrainComponent} from './add-terrain/add-terrain.component';

const routes: Routes = [
  {
    path: 'all-terrain',
    component: AllTerrainComponent
  },
  {
    path: 'add-terrain',
    component: AddTerrainComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TerrainRoutingModule {
}
