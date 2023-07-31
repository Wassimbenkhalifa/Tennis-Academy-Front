import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from 'src/app/core/service/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  hide = true;
  chide = true;
  error = '';
  appVersion = environment.version;

  constructor(private formBuilder: FormBuilder,
              private snackBar: MatSnackBar, private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
        prenom: ['', Validators.required],
        nom: ['', Validators.required],
        addresse: ['', Validators.required],
        telephone: [0, Validators.required],
        username: ['', Validators.required],
        email: [
          '',
          [Validators.required, Validators.email, Validators.minLength(5)],
        ],
        password: ['', [Validators.required, Validators.minLength(6)]],
        cpassword: ['', Validators.required],
      }, {
        validators: this.MustMatch('password', 'cpassword')
      }
    );
  }

  get f() {
    return this.loginForm.controls;
  }

  MustMatch(controlPassword: string, controlCPassword: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlPassword];
      const matchControl = formGroup.controls[controlCPassword];
      if (matchControl.errors && !matchControl.errors.MustMatch) {
        return;
      }
      if (control.value !== matchControl.value) {
        matchControl.setErrors({MustMatch: true});
      } else {
        matchControl.setErrors(null);
      }
    };
  }

  onSubmit() {
    this.submitted = true;
    this.error = '';
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    } else {
      this.authService
        .signup(this.f.username.value, this.f.email.value, this.f.password.value,
          this.f.prenom.value, this.f.nom.value, this.f.addresse.value, this.f.telephone.value)
        .subscribe(
          (res) => {
            if (res) {
              console.log(res);
              this.showNotification(
                'snackbar-info',
                res.message + '...!!!',
                'bottom',
                'center'
              );
              this.router.navigate(['/authentication/signin']);
            } else {
              this.error = 'Invalid registration';
              this.showNotification(
                'snackbar-danger',
                this.error + '...!!!',
                'bottom',
                'center'
              );

            }
          },
          (errors) => {
            this.showNotification(
              'snackbar-info',
              errors + '...!!!',
              'bottom',
              'center'
            );
            this.submitted = false;
          }
        );
    }


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
