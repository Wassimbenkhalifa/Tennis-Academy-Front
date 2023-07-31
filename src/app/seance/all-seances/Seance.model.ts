import {Planification} from 'src/app/planification/all-planifications/planification.model';
import {Terrain} from '../../terrain/all-terrain/terrain.model';
import {User} from "../../user/all-user/user.model";


export class Seance {
  idSeance: number;
  dateHeureDebut: string;
  dateHeureFin: string;
  terrain: Terrain;
  planification: Planification;
  user: User;

  constructor() {
    {
      this.idSeance = 0;
      this.dateHeureDebut = '';
      this.dateHeureFin = '';
      this.terrain = new Terrain();
      this.planification = new Planification();
      this.user = new User();
    }
  }
}
