import {User} from "../user/all-user/user.model";
import {Commentaire} from "./commentaire.model";

export class Publication {
  idPublication: number;
  text: string;
  localDateheurePublication: string;
  utilisateur: User;
  commentaires: Commentaire[];
  // constructor() {
  //   {
  //     this.idPublication=0;
  //     this.text = '';
  //     this.localDateheurePublication = '';
  //     this.user=new User();
  //     this.commentaires=[];
  //   }
  // }

}
