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
import {MatMenuModule} from '@angular/material/menu';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MaterialFileInputModule} from 'ngx-material-file-input';
import {PlanificationService} from './all-planifications/planification.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {AllPlanificationsComponent} from './all-planifications/all-planifications.component';
import {AddPlanificationComponent} from './add-planification/add-planification.component';
import {EditPlanificationComponent} from './edit-planification/edit-planification.component';
import {DeleteFormComponent} from './all-planifications/dialog/delete-form/delete-form.component';
import {FormDialogComponent} from './all-planifications/dialog/form-dialog/form-dialog.component';
import {PlanificationRoutingModule} from './planification-routing.module';
import {MatNativeDateModule} from '@angular/material/core';


@NgModule({
  declarations: [
    AllPlanificationsComponent,
    AddPlanificationComponent,
    EditPlanificationComponent,
    DeleteFormComponent,
    FormDialogComponent
  ],
  imports: [
    CommonModule,
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
    MatCheckboxModule,
    MatTabsModule,
    MatDatepickerModule,
    MatMenuModule,
    MaterialFileInputModule,
    MatProgressSpinnerModule,
    PlanificationRoutingModule,
    MatNativeDateModule,
  ],
  providers: [PlanificationService],
})
export class PlanificationModule {
}
