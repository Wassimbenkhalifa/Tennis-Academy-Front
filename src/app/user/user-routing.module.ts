import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AddUtilisateurComponent} from './add-utilisateur/add-utilisateur.component';
import {AllUserComponent} from './all-user/all-user.component';
import {EditUserComponent} from './edit-user/edit-user.component';


const routes: Routes = [
  {
    path: 'all-utilisateurs',
    component: AllUserComponent
  },
  {
    path: 'add-user',
    component: AddUtilisateurComponent
  },
  {
    path: 'edit-user',
    component: EditUserComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
