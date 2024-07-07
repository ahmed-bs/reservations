import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Salle } from 'src/app/core/models/salle'; // Import du modèle de salle
import { SalleService } from 'src/app/core/services/salle.service'; // Import du service de gestion des salles

@Component({
  selector: 'app-update-salle',
  templateUrl: './update-salle.component.html',
  styleUrls: ['./update-salle.component.css']
})
export class UpdateSalleComponent implements OnInit {

  updateForm!: FormGroup; // Formulaire de mise à jour des salles
  selectedSalleID !: string; // ID de la salle sélectionnée pour la mise à jour
  selectedSalleName !: string; // Nom de la salle sélectionnée pour la mise à jour
  selectedSalleNum !: number; // Numéro de la salle sélectionnée pour la mise à jour

  constructor(
    private fb: FormBuilder,
    private salleService: SalleService, // Service pour gérer les opérations sur les salles
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<UpdateSalleComponent>, // Référence au dialogue
    @Inject(MAT_DIALOG_DATA) public data: any // Données injectées dans le dialogue (probablement les détails de la salle à mettre à jour)
  ) {
    // Initialisation des valeurs des propriétés de salle à partir des données injectées
    this.selectedSalleID = data._id;
    this.selectedSalleName = data.SalleName;
    this.selectedSalleNum = data.SalleNumber;
  }

  ngOnInit() {
    // Initialisation du formulaire avec les valeurs de la salle sélectionnée
    this.updateForm = this.fb.group({
      SalleName: [this.selectedSalleName, Validators.required], // Champ nom de la salle avec validation requise
      SalleNumber: [this.selectedSalleNum , Validators.required], // Champ numéro de la salle avec validation requise
    });
  }

  onSave() {
    if (this.updateForm.valid) { // Vérifie si le formulaire est valide
      // Création de l'objet salle mis à jour avec les valeurs du formulaire
      const updatedSalle = {
        _id: this.selectedSalleID,
        SalleName: this.updateForm.value.SalleName,
        SalleNumber: this.updateForm.value.SalleNumber
      };

      // Appel du service pour mettre à jour la salle
      this.salleService.updateSalle(updatedSalle, updatedSalle._id.toString()).subscribe(
        response => {
          console.log('Salle updated successfully', response);
          // Notification de mise à jour réussie
          this._snackBar.open('Salle mis à jour avec succès.', 'OK', {
            duration: 4000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
          // Fermeture du dialogue en retournant les données mises à jour
          this.dialogRef.close(updatedSalle);
        },
        error => {
          console.error('There was an error!', error);
          // Notification en cas d'erreur lors de la mise à jour de la salle
          this._snackBar.open('Erreur lors de la mise à jour de la Salle.', 'OK', {
            duration: 4000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
        }
      );
    } else {
      // Affichage d'une notification si le formulaire est invalide
      this._snackBar.open('Le formulaire est invalide.', 'OK', {
        duration: 4000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
      });
    }
  }

  // Fonction appelée lors du clic sur le bouton annuler du dialogue
  onNoClick(): void {
    this.dialogRef.close(); // Fermeture du dialogue sans retourner de données
  }

}
