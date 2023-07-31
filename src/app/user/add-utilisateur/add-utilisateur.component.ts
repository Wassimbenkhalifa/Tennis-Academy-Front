import {X} from '@angular/cdk/keycodes';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Media} from 'src/app/media/media.model';
import {Role} from 'src/app/role/role.model';
import {User} from '../all-user/user.model';
import {UserService} from '../all-user/user.service';

@Component({
  selector: 'app-add-utilisateur',
  templateUrl: './add-utilisateur.component.html',
  styleUrls: ['./add-utilisateur.component.sass']
})
export class AddUtilisateurComponent {
  utilisateurForm: FormGroup;
  public utilisateur = new User();
  public img: File;
  public imgToEditUrl: string;
  public roles: Array<Role>;
  public connectedUserRole: any;

  constructor(private fb: FormBuilder, private utilisateurService: UserService, private router: Router) {
    this.utilisateurForm = this.fb.group({
      prenom: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      nom: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      username: ['', [Validators.required]],
      telephone: ['', [Validators.required]],
      password: ['', [Validators.required]],
      conformPassword: ['', [Validators.required]],
      addresse: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      verified: [false],
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)]
      ],
      dateNaissance: ['', [Validators.required]],
      roles: [''],
      photo: ['']
    });
    JSON.parse(localStorage.getItem('currentUser') || '{}');
    const currentRoles = JSON.parse(localStorage.getItem('currentUser') || '{}').roles;
    this.connectedUserRole = currentRoles.includes('ROLE_ADMIN');
    if (!this.connectedUserRole) {
      this.router.navigate(['/page403']);
    }
    this.getAllroles();
  }

  getAllroles() {
    this.utilisateurService.getAllRoles().subscribe(
      (data) => {
        this.roles = data;
        console.log("roles" + this.roles);

      }
    );
  }

  onChangeEventFunc(name: string, event) {
    const index = this.roles.findIndex(r => r.name === name);
    if (event.checked) {
      this.utilisateur.roles.push(this.roles[index]);
    } else {
      // tslint:disable-next-line:no-shadowed-variable
      this.utilisateur.roles.forEach((element, index) => {
        console.log(element);
        if (element.name === name) {
          this.utilisateur.roles.splice(index, 1);
        }
      });
    }
    console.log(this.utilisateur.roles.length);

  }

  onSubmit() {
    if (this.utilisateurForm.invalid) {
      return;
    }

    this.utilisateur.prenom = this.utilisateurForm.value.prenom;
    this.utilisateur.nom = this.utilisateurForm.value.nom;
    this.utilisateur.username = this.utilisateurForm.value.username;
    this.utilisateur.addresse = this.utilisateurForm.value.addresse;
    this.utilisateur.dateNaissance = this.utilisateurForm.value.dateNaissance;
    this.utilisateur.email = this.utilisateurForm.value.email;
    this.utilisateur.verified = this.utilisateurForm.value.verified;
    this.utilisateur.password = this.utilisateurForm.value.password;
    this.utilisateur.telephone = this.utilisateurForm.value.telephone;

    this.addUtilisateur();
  }

  private addUtilisateur() {

    this.utilisateurService.addUtilisateur(this.utilisateur).subscribe(
      data => {
        if (data) {
          this.router.navigate(['/utilisateurs/all-utilisateurs']);

        } else {
          // this.messageService.add({
          //     severity: 'FAILED',
          //     summary: 'Error',
          //     detail: 'Desolé impossible d'ajouter le terrain',
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


  onSelect(event) {
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

    this.utilisateur.photo = media;
  }

// getSponsorById(dsponsorId): void {
//   this.sponsorsService.getSponsorById(dsponsorId).subscribe((data) => {
//     console.log(data);
//     this.sponsor = data;
//     this.imgToEditUrl = data.photo.mediaURL;
//     this.getImageByUrl(data.photo.mediaURL);
//   });
// }

  async getImageByUrl(url): Promise<void> {
    // const data = await this.terrainService.getImageByUrl(url).toPromise();
    // const file = new File([data], "image", {
    //   type: "image/png",
    //   lastModified: new Date().getTime(),
    // });
    // console.log(file);
    // this.img = file;
    // this.covertImgToByte();
  }
}
