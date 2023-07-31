import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSortModule} from '@angular/material/sort';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MaterialFileInputModule} from 'ngx-material-file-input';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {NgxDropzoneModule} from 'ngx-dropzone';
import {MatRadioModule} from '@angular/material/radio';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {AddUtilisateurComponent} from './add-utilisateur/add-utilisateur.component';
import {EditUserComponent} from './edit-user/edit-user.component';
import {AllUserComponent} from './all-user/all-user.component';
import {DeleteFormComponent} from './all-user/dialogs/delete-form/delete-form.component';
import {FormDialogComponent} from './all-user/dialogs/form-dialog/form-dialog.component';
import {UserService} from './all-user/user.service';
import {UserRoutingModule} from './user-routing.module';


@NgModule({
  declarations: [
    AddUtilisateurComponent,
    EditUserComponent,
    AllUserComponent,
    DeleteFormComponent,
    FormDialogComponent
  ],
  imports: [
    CommonModule,
    MatRadioModule,
    NgxDropzoneModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSortModule,
    MatToolbarModule,
    MatSelectModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MaterialFileInputModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    UserRoutingModule,
  ],
  providers: [UserService],
})
export class UserModule {
}
