import {Media} from "src/app/media/media.model";

export class Terrain {
  idTerrain: number;
  label: string;
  type: string;
  enable: boolean;
  photo: Media;
  mediaURL: any;
  url: string;

  constructor() {
    {
      this.idTerrain = 0;
      this.label = '';
      this.type = '';
      this.enable = false;
      this.url = '';
      this.photo = null;
      this.mediaURL = '';
    }
  }

}
