import {formatDate} from '@angular/common';
import {HttpErrorResponse} from '@angular/common/http';
import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {Cours} from 'src/app/cours/all-cours/cours.model';
import {Planification} from '../all-planifications/planification.model';
import {PlanificationService} from '../all-planifications/planification.service';

@Component({
  selector: 'app-add-planification',
  templateUrl: './add-planification.component.html',
  styleUrls: ['./add-planification.component.sass']
})
export class AddPlanificationComponent {
  seanceForm: FormGroup;
  private planification = new Planification();
  public coursList: Cours[];
  private snackBar: MatSnackBar;

  constructor(private fb: FormBuilder,
              private planificationService: PlanificationService,
              private router: Router) {
    this.seanceForm = this.fb.group({
      dateDebut: ["", [Validators.required]],
      dateFin: ["", [Validators.required]],
      cours: [null, [Validators.required]],
    });

    this.getAllCours();
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

  onSubmit() {
    if (this.seanceForm.invalid) {
      return;
    }
    this.planification.dateDebut = this.seanceForm.value.dateDebut;
    this.planification.dateDebut = formatDate(this.planification.dateDebut, 'yyyy-MM-dd', "en-US");
    this.planification.dateFin = this.seanceForm.value.dateFin;
    this.planification.dateFin = formatDate(this.planification.dateFin, 'yyyy-MM-dd', "en-US");

    this.planification.cours = this.seanceForm.value.cours;
    this.addPlanification();
  }

  private addPlanification() {

    this.planificationService.addPlanification(this.planification).subscribe(
      data => {
        if (data) {
          this.router.navigate(['/planification/all-planifications']);

        } else {
          // this.messageService.add({
          //     severity: 'FAILED',
          //     summary: 'Error',
          //     detail: 'Desole impossible dajouter le terrain',
          //     life: 3000
          // });
        }
      }, error => {
        // this.messageService.add({
        //     severity: 'FAILED',
        //     summary: 'Error',
        //     detail: error.error,
        //     life: 3000
        // });
      }
    );
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
