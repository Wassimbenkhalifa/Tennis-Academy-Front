import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Cours} from '../../cours.model';
import {CoursService} from '../../cours.service';

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.sass']
})
export class FormDialogComponent {

  action: string;
  dialogTitle: string;
  coursForm: FormGroup;
  cours: Cours;

  constructor(private snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<FormDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public coursService: CoursService,
              private fb: FormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'editer') {
      this.dialogTitle = data.cours.idCours;
      this.cours = data.cours;
      console.log(this.cours);

    } else {
      this.dialogTitle = 'New Staff';
      this.cours = new Cours();
    }
    this.coursForm = this.createContactForm();
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
      label: [this.cours.label, [Validators.required]],
      description: [this.cours.description, [Validators.required]],
      duree: [this.cours.duree, [Validators.required]],
      nbrPlaces: [this.cours.nbrPlaces, [Validators.required]],
    });
  }


  submit() {
    // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  public confirmAdd(): void {
    console.log(this.coursForm.getRawValue());
    if (this.coursForm.valid) {
      this.cours.label = this.coursForm.value.label;
      this.cours.description = this.coursForm.value.description;
      this.cours.duree = this.coursForm.value.duree;
      this.cours.nbrPlaces = this.coursForm.value.nbrPlaces;
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
