import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {TerrainService} from '../../terrain.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.sass']
})
export class DeleteComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public terrainService: TerrainService
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  // confirmDelete(): void {
  //   // this.terrainService.deleteTerrain(this.data.id);
  // }
}
