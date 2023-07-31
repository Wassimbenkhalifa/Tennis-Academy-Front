import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Terrain} from "../all-terrain/terrain.model";
import {Media} from "src/app/media/media.model";
import {TerrainService} from "../all-terrain/terrain.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
  selector: "app-add-terrain",
  templateUrl: "./add-terrain.component.html",
  styleUrls: ["./add-terrain.component.sass"],
})
export class AddTerrainComponent {
  terrainForm: FormGroup;
  private terrain = new Terrain();
  public img: File;
  public imgToEditUrl: string;

  constructor(private fb: FormBuilder, private terrainService: TerrainService,
              private router: Router) {
    this.terrainForm = this.fb.group({
      label: ["", [Validators.required]],
      type: [""],
      enable: [""],
      photo: [""],
    });
  }

  onSubmit() {
    if (this.terrainForm.invalid || !this.img) {
      return;
    }

    this.terrain.label = this.terrainForm.value.label;
    this.terrain.enable = this.terrainForm.value.enable;
    this.terrain.type = this.terrainForm.value.type;
    console.log(this.terrain);

    this.addTerrain();
  }

  private addTerrain() {

    this.terrainService.addTerrain(this.terrain).subscribe(
      data => {
        if (data) {
          this.router.navigate(['/terrain/all-terrain']);

        } else {
          // this.messageService.add({
          //     severity: 'FAILED',
          //     summary: 'Error',
          //     detail: 'Desole impossible dajouter le terrain',
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
    console.log(event);
    this.img = event.addedFiles[0];
    this.covertImgToByte();
  }

  onRemove(event) {
    this.img = null;
  }


  covertImgToByte(): void {
    console.log(this.img);
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
    this.terrain.photo = media;
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
