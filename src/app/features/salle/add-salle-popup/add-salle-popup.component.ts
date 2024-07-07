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
  selectedRole!: string; // Variable non utilisée dans le code fourni
  eventForm!: FormGroup; // Formulaire de création de salle

  constructor(
    private _snackBar: MatSnackBar,
    private salleService: SalleService,
    private dialogRef: MatDialogRef<AddSallePopupComponent>, // Référence à la boîte de dialogue
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    // Initialisation du formulaire avec validation
    this.eventForm = this.fb.group({
      SalleName: ['', Validators.required], // Champ pour le nom de la salle, requis
      SalleNumber: ['', Validators.required], // Champ pour le numéro de la salle, requis
    });
  }

  // Méthode appelée lorsque l'utilisateur clique sur "Annuler"
  onNoClick(): void {
    this.dialogRef.close(); // Fermeture de la boîte de dialogue sans rien faire
  }

  // Méthode appelée lorsque l'utilisateur clique sur "Enregistrer"
  onSave(): void {
    console.log(this.eventForm);
    if (this.eventForm.valid) {
      const formValue = this.eventForm.value;
      console.log(formValue);

      // Création d'un objet Salle à partir des valeurs du formulaire
      const salle: Salle = {
        SalleName: formValue.SalleName,
        SalleNumber: formValue.SalleNumber,
      };

      // Appel du service pour créer une salle
      this.salleService.createSalle(salle).subscribe({
        next: (response) => {
          console.log('Salle créée avec succès:', response);
          // Affichage d'un message de succès à l'utilisateur
          this._snackBar.open('Salle créée avec succès', 'OK', {
            duration: 4000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
          // Fermeture de la boîte de dialogue avec la valeur du formulaire
          this.dialogRef.close(this.eventForm.value);
        },
        error: (error) => {
          // Affichage d'un message d'erreur en cas d'échec de la création de la salle
          this._snackBar.open('Erreur lors de la création de la salle', 'OK', {
            duration: 4000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
          console.error('Erreur lors de la création de la salle:', error);
        }
      });
    } else {
      // Affichage d'un message si le formulaire est invalide
      this._snackBar.open('Le formulaire est invalide', 'OK', {
        duration: 4000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
      });
      console.warn('Le formulaire est invalide');
    }
  }
}
