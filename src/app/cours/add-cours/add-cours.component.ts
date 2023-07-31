import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Cours} from '../all-cours/cours.model';
import {CoursService} from '../all-cours/cours.service';

@Component({
  selector: 'app-add-cours',
  templateUrl: './add-cours.component.html',
  styleUrls: ['./add-cours.component.sass']
})
export class AddCoursComponent {
  coursForm: FormGroup;
  private cours = new Cours();

  constructor(private fb: FormBuilder, private coursService: CoursService, private router: Router) {
    this.coursForm = this.fb.group({
      label: ["", [Validators.required]],
      description: ["", [Validators.required]],
      duree: [0, [Validators.required]],
      nbrPlaces: [0, [Validators.required]],
    });
  }

  onSubmit() {
    if (this.coursForm.invalid) {
      return;
    }

    this.cours.label = this.coursForm.value.label;
    this.cours.description = this.coursForm.value.description;
    this.cours.duree = this.coursForm.value.duree;
    this.cours.nbrPlaces = this.coursForm.value.nbrPlaces;
    this.addCours();
  }

  private addCours() {

    this.coursService.addCours(this.cours).subscribe(
      data => {
        if (data) {
          this.router.navigate(['/cours/all-cours']);

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

}
