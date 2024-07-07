import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Salle } from 'src/app/core/models/salle';
import { SalleService } from 'src/app/core/services/salle.service';

@Component({
  selector: 'app-update-salle',
  templateUrl: './update-salle.component.html',
  styleUrls: ['./update-salle.component.css']
})
export class UpdateSalleComponent implements OnInit {

  updateForm!: FormGroup;
  selectedSalleID !: string;
  selectedSalleName !: string;
  selectedSalleNum !: number;
  constructor(
    private fb: FormBuilder,
    private userService: SalleService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<UpdateSalleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.selectedSalleID = data._id;
    this.selectedSalleName = data.SalleName;
    this.selectedSalleNum = data.SalleNumber;
  }

  ngOnInit() {

    this.updateForm = this.fb.group({
      SalleName: [this.selectedSalleName, Validators.required],
      SalleNumber: [this.selectedSalleNum , Validators.required],
    });
    console.log(this.updateForm);
    
  }

  onSave() {
    if (this.updateForm.valid) {
      const updatedSalle = {
        _id:this.selectedSalleID,
        SalleName: this.updateForm.value.SalleName,
        SalleNumber: this.updateForm.value.SalleNumber
      };
 console.log(updatedSalle);
 
      this.userService.updateSalle(updatedSalle, updatedSalle._id.toString()).subscribe(
        response => {
          console.log('Salle updated successfully', response);
          this._snackBar.open('Salle mis à jour avec succès.', 'OK', {
            duration: 4000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
          this.dialogRef.close(updatedSalle);
        },
        error => {
          console.error('There was an error!', error);
          this._snackBar.open('Erreur lors de la mise à jour de la Salle.', 'OK', {
            duration: 4000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
        }
      );
    } else {
      this._snackBar.open('Le formulaire est invalide.', 'OK', {
        duration: 4000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
