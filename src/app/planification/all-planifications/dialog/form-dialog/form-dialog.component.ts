import {formatDate} from '@angular/common';
import {HttpErrorResponse} from '@angular/common/http';
import {Component, Inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Cours} from 'src/app/cours/all-cours/cours.model';
import {Planification} from '../../planification.model';
import {PlanificationService} from '../../planification.service';

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.sass']
})
export class FormDialogComponent {
  public coursList: Cours[];
  minDate: Date;
  maxDate: Date;
  action: string;
  dialogTitle: string;
  seanceForm: FormGroup;
  planification: Planification;

  constructor(private snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<FormDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public planificationService: PlanificationService,
              private fb: FormBuilder
  ) {
    // const currentYear = new Date().getFullYear();
    // this.minDate = new Date(currentYear - 20, 0, 1);
    // this.maxDate = new Date(currentYear + 1, 11, 31);
    // Set the defaults
    this.action = data.action;
    if (this.action === 'editer') {
      this.dialogTitle = data.planification.idPlanification;
      this.planification = data.planification;
      console.log(this.planification);
    } else {
      this.dialogTitle = 'New Planififcation';
      this.planification = new Planification();
    }
    this.seanceForm = this.createContactForm();
    this.getAllCours();
    console.log(this.minDate);

  }

  getAllCours() {
    this.planificationService.getAllCours().subscribe(
      (data) => {
        this.coursList = data;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
        this.showNotification(
          'snackbar-danger',
          error.message,
          'bottom',
          'center'
        );
      }
    );
  }

  formControl = new FormControl('', [
    Validators.required,
    // Validators.email,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
        ? 'Not a valid email'
        : '';
  }

  createContactForm(): FormGroup {
    return this.fb.group({
      dateDebut: [this.planification.dateDebut, [Validators.required]],
      dateFin: [this.planification.dateFin, [Validators.required]],
      cours: [this.planification.cours.idCours, [Validators.required]],
    });
  }


  submit() {
    // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  public confirmAdd(): void {
    console.log(this.seanceForm.getRawValue());
    if (this.seanceForm.valid) {
      this.planification.dateDebut = this.seanceForm.value.dateDebut;
      this.planification.dateDebut = formatDate(this.planification.dateDebut, 'yyyy-MM-dd', "en-US");
      this.planification.dateFin = this.seanceForm.value.dateFin;
      this.planification.dateFin = formatDate(this.planification.dateFin, 'yyyy-MM-dd', "en-US");
      this.planification.cours = this.seanceForm.value.cours;
    }

  }

  openedChange(opened: boolean) {
    console.log(opened ? 'opened' : 'closed');
  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

}
