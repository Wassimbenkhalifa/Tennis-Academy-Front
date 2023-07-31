import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddCoursComponent} from './add-cours/add-cours.component';
import {EditCoursComponent} from './edit-cours/edit-cours.component';
import {DeleteComponent} from './all-cours/dialogs/delete/delete.component';
import {FormDialogComponent} from './all-cours/dialogs/form-dialog/form-dialog.component';
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
import {CoursService} from './all-cours/cours.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {CoursRoutingModule} from './cours-routing.module';
import {MatRadioModule} from '@angular/material/radio';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {AllCoursComponent} from './all-cours/all-cours.component';


@NgModule({
  declarations: [
    AllCoursComponent,
    AddCoursComponent,
    EditCoursComponent,
    DeleteComponent,
    FormDialogComponent
  ],
  imports: [
    CommonModule,
    MatRadioModule,
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
    CoursRoutingModule,

  ],
  providers: [CoursService],
})
export class CoursModule {
}
