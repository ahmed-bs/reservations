import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  updateForm!: FormGroup; // Formulaire de mise à jour des utilisateurs
  selectedRole: string; // Rôle sélectionné pour l'utilisateur en cours de mise à jour

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<UpdateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // Données injectées dans la boîte de dialogue (probablement les données de l'utilisateur à mettre à jour)
  ) {
    this.selectedRole = data.role; // Initialisation du rôle sélectionné à partir des données injectées
  }

  ngOnInit() {
    // Initialisation du formulaire avec les données actuelles de l'utilisateur
    this.updateForm = this.fb.group({
      name: [this.data.name, Validators.required], // Champ nom avec validation requise
      email: [this.data.email, [Validators.required, Validators.email]], // Champ email avec validation requise et format email
      password: [this.data.password, Validators.required], // Champ mot de passe avec validation requise
    });
  }

  // Fonction pour sélectionner un rôle
  selectRole(role: string) {
    this.selectedRole = role;
  }

  // Fonction appelée lors de l'enregistrement des modifications de l'utilisateur
  onSave() {
    if (this.updateForm.valid) { // Vérification de la validité du formulaire
      const updatedUser = {
        _id: this.data._id, // ID de l'utilisateur à mettre à jour
        name: this.updateForm.value.name, // Nouveau nom de l'utilisateur
        email: this.updateForm.value.email, // Nouvel email de l'utilisateur
        password: this.updateForm.value.password, // Nouveau mot de passe de l'utilisateur
        role:this.updateForm.value.role // Nouveau rôle de l'utilisateur
      };

      // Appel du service pour mettre à jour l'utilisateur
      this.userService.updateUser(updatedUser, updatedUser._id.toString()).subscribe(
        response => {
          console.log('User updated successfully', response);
          // Notification de réussite de la mise à jour
          this._snackBar.open('Utilisateur mis à jour avec succès.', 'OK', {
            duration: 4000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
          this.dialogRef.close(updatedUser); // Fermeture de la boîte de dialogue avec les données mises à jour
        },
        error => {
          console.error('There was an error!', error);
          // Notification en cas d'erreur lors de la mise à jour
          this._snackBar.open('Erreur lors de la mise à jour de l\'utilisateur.', 'OK', {
            duration: 4000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
        }
      );
    } else {
      // Affichage d'un message si le formulaire est invalide
      this._snackBar.open('Le formulaire est invalide.', 'OK', {
        duration: 4000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
      });
    }
  }

  // Fonction appelée lors du clic sur le bouton d'annulation
  onNoClick(): void {
    this.dialogRef.close(); // Fermeture de la boîte de dialogue sans actions supplémentaires
  }

}
