import {Component, Inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Media} from 'src/app/media/media.model';
import {environment} from 'src/environments/environment';
import {Terrain} from '../../terrain.model';
import {TerrainService} from '../../terrain.service';

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.sass']
})
export class FormDialogComponent {
  public img: File;
  public imgToEditUrl: string;
  IMG_BASE_URL = environment.IMG_BASE_URL;

  action: string;
  dialogTitle: string;
  terrainForm: FormGroup;
  terrain: Terrain;

  constructor(private snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<FormDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public terrainService: TerrainService,
              private fb: FormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'editer') {
      this.dialogTitle = data.terrain.idTerrain;
      this.terrain = data.terrain;
      this.imgToEditUrl = data.terrain.photo.mediaURL;
      this.getImageByUrl(data.terrain.photo.mediaURL);
      console.log(this.terrain);

    } else {
      this.dialogTitle = 'New Staff';
      this.terrain = new Terrain();
    }
    this.terrainForm = this.createContactForm();
  }

  formControl = new FormControl('', [
    Validators.required,
    // Validators.email,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
        ? 'Not a valid email'
        : '';
  }

  createContactForm(): FormGroup {
    return this.fb.group({
      label: [this.terrain.label, [Validators.required]],
      type: [this.terrain.type, [Validators.required]],
      enable: [this.terrain.enable],
      photo: [this.terrain.photo]
    });
  }


  submit() {
    // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  public confirmAdd(): void {
    console.log(this.terrainForm.getRawValue());
    if (this.terrainForm.valid && this.img) {
      this.terrain.label = this.terrainForm.value.label;
      this.terrain.enable = this.terrainForm.value.enable;
      this.terrain.type = this.terrainForm.value.type;
      this.terrain.photo.mediaURL = this.imgToEditUrl;
    } else if (!this.img) {
      this.showNotification(
        'snackbar-danger',
        'Image manquante...!!!',
        'bottom',
        'center'
      );
    }

  }

  openedChange(opened: boolean) {
    console.log(opened ? 'opened' : 'closed');
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

    this.terrain.photo = media;
  }

  async getImageByUrl(url): Promise<void> {
    const data = await this.terrainService.getImageByUrl(url).toPromise();
    const file = new File([data], 'image', {
      type: 'image/png',
      lastModified: new Date().getTime()
    });
    console.log(file);
    this.img = file;
    this.covertImgToByte();
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


//   public img: File;
//   public imgToEditUrl: string;
//   IMG_BASE_URL = environment.IMG_BASE_URL;

//  action: string;
//   dialogTitle: string;
//   terrainForm: FormGroup;
//   terrain: Terrain;
//   constructor(
//     public dialogRef: MatDialogRef<FormDialogComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: any,
//     public terrainService: TerrainService,
//     private fb: FormBuilder
//   ) {
//     // Set the defaults
//     this.action = data.action;
//     if (this.action === 'edit') {
//       this.dialogTitle = data.terrain.label;
//       this.terrain = data.terrain;
//     } else {
//       this.dialogTitle = 'Nouveau terrain';
//       this.terrain = new Terrain();
//       console.log(this.terrain);
//     }
//     this.terrainForm = this.createContactForm();
//   }
//   formControl = new FormControl('', [
//     Validators.required,
//     // Validators.email,
//   ]);
//   getErrorMessage() {
//     return this.formControl.hasError('obligatoire')
//       ? 'champ obligatoire'
//       : this.formControl.hasError('email')
//       ? 'Email invalid'
//       : '';
//   }
//   createContactForm(): FormGroup {
//     return this.fb.group({
//       label: ["", [Validators.required]],
//       type: ["", [Validators.required]],
//       enable: [""],
//       photo: [""],
//     });
//     console.log(this.terrain);
//   }
//   submit() {
//     // emppty stuff
//   }
//   onNoClick(): void {
//     this.dialogRef.close();
//   }

//   public confirmAdd(): void {
//     if (this.terrainForm.valid && this.img){
//       this.terrain.label=this.terrainForm.value.label;
//       this.terrain.enable=this.terrainForm.value.enable;
//       this.terrain.type=this.terrainForm.value.type;
//       console.log(this.terrain)
//     }
//   }

//   openedChange(opened: boolean) {
//     console.log(opened ? 'opened' : 'closed');
//   }


//   onSelect(event) {
//     this.img = event.addedFiles[0];
//     this.covertImgToByte();
//   }

//   onRemove(event) {
//     this.img = null;
//   }


//   covertImgToByte(): void {
//     const reader = new FileReader();
//     reader.onload = this.handleFile.bind(this);

//     reader.readAsBinaryString(this.img);
//   }

//   handleFile(event) {
//     const binaryString = event.target.result;
//     const base64textString = btoa(binaryString);
//     const media: Media = new Media();

//     media.file = base64textString;
//     media.fileName = this.img.name;

//     this.terrain.photo = media;
//   }
// }
