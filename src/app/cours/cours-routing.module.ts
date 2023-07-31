import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AllCoursComponent} from './all-cours/all-cours.component';
import {AddCoursComponent} from './add-cours/add-cours.component';
import {EditCoursComponent} from './edit-cours/edit-cours.component';


const routes: Routes = [
  {
    path: 'all-cours',
    component: AllCoursComponent
  },
  {
    path: 'add-cours',
    component: AddCoursComponent
  },
  {
    path: 'edit-cours',
    component: EditCoursComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursRoutingModule {
}
