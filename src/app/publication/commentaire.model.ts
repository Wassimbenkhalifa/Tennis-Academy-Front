import {User} from "../user/all-user/user.model";
import {Publication} from "../publication/publication.model";

export class Commentaire {
  idCommentaire: number;
  textCommentaire: string;
  localDateheureCommentaire: string;
  utilisateur: User;
  publication: Publication;

  constructor() {
    {
      this.idCommentaire = 0;
      this.textCommentaire = '';
      this.localDateheureCommentaire = '';
      this.utilisateur = new User();
      this.publication = new Publication();

    }
  }

}
