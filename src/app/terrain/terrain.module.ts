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
import {AllTerrainComponent} from './all-terrain/all-terrain.component';
import {FormDialogComponent} from './all-terrain/dialogs/form-dialog/form-dialog.component';
import {AddTerrainComponent} from './add-terrain/add-terrain.component';
import {MaterialFileInputModule} from 'ngx-material-file-input';
import {MatMenuModule} from '@angular/material/menu';
import {TerrainService} from './all-terrain/terrain.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {TerrainRoutingModule} from './terrain-routing.module';
import {DeleteComponent} from './all-terrain/dialogs/delete/delete.component';
import {NgxDropzoneModule} from 'ngx-dropzone';
import {MatRadioModule} from '@angular/material/radio';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';


@NgModule({
  declarations: [
    AllTerrainComponent,
    FormDialogComponent,
    AddTerrainComponent,
    DeleteComponent,
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
    TerrainRoutingModule,
  ],
  providers: [TerrainService],
})
export class TerrainModule {
}
