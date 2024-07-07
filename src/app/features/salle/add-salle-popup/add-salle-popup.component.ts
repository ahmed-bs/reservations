import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Salle } from 'src/app/core/models/salle';
import { SalleService } from 'src/app/core/services/salle.service';

@Component({
  selector: 'app-add-salle-popup',
  templateUrl: './add-salle-popup.component.html',
  styleUrls: ['./add-salle-popup.component.css']
})
export class AddSallePopupComponent implements OnInit {
  selectedRole!: string;
  eventForm!: FormGroup;

  constructor(
    private _snackBar: MatSnackBar,
    private salleService: SalleService,
    private dialogRef: MatDialogRef<AddSallePopupComponent>,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.eventForm = this.fb.group({
      SalleName: ['', Validators.required],
      SalleNumber: ['', Validators.required],
    });
  }



  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    console.log(this.eventForm);
    if (this.eventForm.valid) {
      const formValue = this.eventForm.value;
      console.log(formValue);

      const salle: Salle = {
        SalleName: formValue.SalleName,
        SalleNumber: formValue.SalleNumber,
      };

      this.salleService.createSalle(salle).subscribe({
        next: (response) => {
          console.log('Salle créé avec succès:', response);
          this._snackBar.open('Salle créé avec succès', 'OK', {
            duration: 4000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
          this.dialogRef.close(this.eventForm.value);
        },
        error: (error) => {
          this._snackBar.open('Erreur lors de la création de l\'salle', 'OK', {
            duration: 4000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
          console.error('Erreur lors de la création de l\'salle:', error);
        }
      });
    } else {
      this._snackBar.open('Le formulaire est invalide', 'OK', {
        duration: 4000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
      });
      console.warn('Le formulaire est invalide');
    }
  }
}
