import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Media} from 'src/app/media/media.model';
import {Role} from 'src/app/role/role.model';
import {environment} from 'src/environments/environment';
import {User} from '../../user.model';
import {UserService} from '../../user.service';

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.sass']
})
export class FormDialogComponent {
  constructor(private snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<FormDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public utilisateurService: UserService,
              private fb: FormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'editer') {
      this.dialogTitle = data.utilisateur.idUser;
      this.utilisateur = data.utilisateur;
      data.utilisateur.roles.forEach(element => this.checked(element));
      console.log(data.utilisateur.photo);
      if (data.utilisateur.photo) {
        this.imgToEditUrl = data.utilisateur.photo.mediaURL;
        this.getImageByUrl(data.utilisateur.photo.mediaURL);
      } else {
        this.imgToEditUrl = "";
      }

      console.log(this.utilisateur);

    } else {
      this.dialogTitle = 'Nouveau User';
      this.utilisateur = new User();
    }
    this.utilisateurForm = this.createContactForm();
    console.log(this.utilisateurForm.getRawValue());
    this.utilisateur.roles.forEach(role => {
      this.utiliRole.push(role.name);
      this.updatedRoles.push(role);
    });
    this.getAllroles();

  }

  chide = true;
  hide = true;
  public img: File;
  public imgToEditUrl: string;
  IMG_BASE_URL = environment.IMG_BASE_URL;
  public roles: Array<Role>;
  public rleAdmin = false;
  public rleJoueur = false;
  public rleEntrai = false;
  public utiliRole: any[] = [];
  private updatedRoles: Role[] = [];


  action: string;
  dialogTitle: string;
  utilisateurForm: FormGroup;
  utilisateur: User;


  formControl = new FormControl('', [
    Validators.required,
    // Validators.email,
  ]);

  checked(element: Role) {
    if (element.name === "ROLE_ADMIN") {
      this.rleAdmin = true;
    }
    if (element.name === "ROLE_JOUEUR") {
      this.rleJoueur = true;


    }
    if (element.name === "ROLE_ENTRAINEUR") {
      this.rleEntrai = true;
    }
  }

  getAllroles() {
    this.utilisateurService.getAllRoles().subscribe(
      (data) => {
        this.roles = data;
        console.log("roles" + this.roles);

      }
    );
  }

  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
        ? 'Not a valid email'
        : '';
  }

  createContactForm(): FormGroup {
    return this.fb.group({
      prenom: [this.utilisateur.prenom, [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      nom: [this.utilisateur.nom, [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      username: [this.utilisateur.username, [Validators.required]],
      telephone: [this.utilisateur.telephone, [Validators.required]],
      nbrMatchJoues: [this.utilisateur.nbrMatchJoues],
      rate: [this.utilisateur.rate],
      gender: [this.utilisateur.gender],
      password: [this.utilisateur.password, [Validators.required]],
      confirmPassword: [this.utilisateur.password, [Validators.required]],
      addresse: [this.utilisateur.addresse, [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      verified: [this.utilisateur.verified],
      email: [
        this.utilisateur.email,
        [Validators.required, Validators.email, Validators.minLength(5)]
      ],
      dateNaissance: [this.utilisateur.dateNaissance, [Validators.required]],
      dateEngagement: [this.utilisateur.dateEngagement],
      // roles: [this.user.roles],
      // photo: ['']
    });

  }


  submit() {
    // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  public confirmAdd(): void {
    console.log(this.utilisateurForm.getRawValue());
    if (this.utilisateurForm.valid && this.updatedRoles != null) {
      this.utilisateur.prenom = this.utilisateurForm.value.prenom;
      this.utilisateur.nom = this.utilisateurForm.value.nom;
      this.utilisateur.username = this.utilisateurForm.value.username;
      this.utilisateur.addresse = this.utilisateurForm.value.addresse;
      this.utilisateur.dateNaissance = this.utilisateurForm.value.dateNaissance;
      this.utilisateur.dateEngagement = this.utilisateurForm.value.dateEngagement;
      this.utilisateur.nbrMatchJoues = this.utilisateurForm.value.nbrMatchJoues;
      this.utilisateur.rate = this.utilisateurForm.value.rate;
      this.utilisateur.gender = this.utilisateurForm.value.gender;
      this.utilisateur.email = this.utilisateurForm.value.email;
      this.utilisateur.verified = this.utilisateurForm.value.verified;
      this.utilisateur.password = this.utilisateurForm.value.password;
      this.utilisateur.telephone = this.utilisateurForm.value.telephone;
      this.utilisateur.roles = this.updatedRoles;
      this.utilisateur.photo.mediaURL = this.imgToEditUrl;
    }

  }

  openedChange(idUser: number, opened: boolean) {
    console.log(opened ? 'opened' : 'closed');
    console.log(idUser);

  }

  onSelect(event) {
    console.log(event);
    this.img = event.addedFiles[0];
    this.covertImgToByte();
  }

  onRemove(event) {
    this.img = null;
  }


  covertImgToByte(): void {
    const reader = new FileReader();
    reader.onload = this.handleFile.bind(this);

    reader.readAsBinaryString(this.img);

  }

  handleFile(event) {
    const binaryString = event.target.result;
    const base64textString = btoa(binaryString);
    const media: Media = new Media();

    media.file = base64textString;
    media.fileName = this.img.name;
    console.log(media);
    this.utilisateur.photo = media;
    console.log(this.utilisateur.photo);
  }

  async getImageByUrl(url): Promise<void> {
    const data = await this.utilisateurService.getImageByUrl(url).toPromise();
    const file = new File([data], 'image', {
      type: 'image/png',
      lastModified: new Date().getTime()
    });
    console.log(file);
    this.img = file;
    this.covertImgToByte();
  }

  onChangeEventFunc(event) {

    this.updatedRoles.splice(0, this.updatedRoles.length);
    event.value.forEach(element => {
      const index = this.roles.findIndex(r => r.name === element);
      this.updatedRoles.push(this.roles[index]);
    });
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
