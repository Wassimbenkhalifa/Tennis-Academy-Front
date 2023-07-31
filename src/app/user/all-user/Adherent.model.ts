import {User} from "./user.model";

export class Adherent extends User {
  nbrMatchJoues: number;
  gender: string;

  constructor() {
    super();
    {
      this.nbrMatchJoues = 0;
      this.gender = '';
    }
  }
}
