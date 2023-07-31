import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
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
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {AllSeancesComponent} from './all-seances/all-seances.component';
import {ShowSeanceComponent} from './show-seance/show-seance.component';
import {FormDialogComponent} from './all-seances/dialog/form-dialog/form-dialog.component';
import {DeleteFormComponent} from './all-seances/dialog/delete-form/delete-form.component';
import {SeanceService} from './all-seances/seance.service';
import {SeanceRoutingModule} from 'src/app/seance/seance-routing.module';
import {AddSeanceComponent} from './add-seance/add-seance.component';
import {MatNativeDateModule} from '@angular/material/core';
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [
    AllSeancesComponent,
    ShowSeanceComponent,
    FormDialogComponent,
    DeleteFormComponent,
    AddSeanceComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    FormsModule,
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
    SeanceRoutingModule,
    MatNativeDateModule,
    SharedModule
  ],
  providers: [SeanceService, DatePipe]
})
export class SeanceModule {
}
