import {Media} from "../../media/media.model";
import {formatDate} from '@angular/common';
import {Role} from "../../role/role.model";


export class User {
  idUser: number;
  prenom: string;
  nom: string;
  dateNaissance: string;
  dateEngagement: string;
  nbrMatchJoues: number;
  rate: number;
  gender: string;
  telephone: number;
  email: string;
  username: string;
  addresse;
  password: string;
  verified: boolean;
  photo: Media;
  mediaURL: any;
  roles: Role[];
  accessToken;

  constructor() {
    {
      this.idUser = 0;
      this.prenom = '';
      this.nom = '';
      this.email = '';
      this.dateNaissance = formatDate(new Date(), 'yyyy-MM-dd', 'en') || '';
      this.dateEngagement = formatDate(new Date(), 'yyyy-MM-dd', 'en') || '';
      this.nbrMatchJoues = 0;
      this.rate = 0;
      this.gender = '';
      this.username = '';
      this.password = '';
      this.addresse = '';
      this.verified = false;
      this.photo = new Media();
      this.roles = [];
      this.mediaURL = '';
    }
  }
}
