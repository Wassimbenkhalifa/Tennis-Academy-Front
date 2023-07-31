export class Cours {
  idCours: number;
  label: string;
  description: string;
  duree: number;
  nbrPlaces: number;

  constructor() {
    {
      this.idCours = 0;
      this.label = '';
      this.description = '';
      this.duree = 0;
      this.nbrPlaces = 0;
    }
  }
}
