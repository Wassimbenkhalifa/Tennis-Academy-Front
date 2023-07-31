import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {PlanificationService} from '../../planification.service';

@Component({
  selector: 'app-delete-form',
  templateUrl: './delete-form.component.html',
  styleUrls: ['./delete-form.component.sass']
})
export class DeleteFormComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public planificationService: PlanificationService
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
