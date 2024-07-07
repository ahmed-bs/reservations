import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-add-user-popup',
  templateUrl: './add-user-popup.component.html',
  styleUrls: ['./add-user-popup.component.css']
})
export class AddUserPopupComponent implements OnInit {
  selectedRole!: string; // Variable pour stocker le rôle sélectionné
  eventForm!: FormGroup; // Formulaire de création d'utilisateur

  constructor(
    private _snackBar: MatSnackBar, // Service pour afficher des notifications
    private userService: UserService, // Service pour gérer les utilisateurs
    private dialogRef: MatDialogRef<AddUserPopupComponent>, // Référence à la boîte de dialogue actuelle
    private fb: FormBuilder // Service pour construire des formulaires
  ) {}

  ngOnInit(): void {
    // Initialisation du formulaire avec des champs requis et des validations
    this.eventForm = this.fb.group({
      name: ['', Validators.required], // Champ nom avec validation requise
      role: ['', Validators.required], // Champ rôle avec validation requise
      password: ['', Validators.required], // Champ mot de passe avec validation requise
      email: ['', [Validators.required, Validators.email]], // Champ email avec validation requise et de format email
    });

    // Préremplissage du champ de rôle avec la valeur sélectionnée
    this.eventForm.controls['role'].setValue(this.selectedRole);
  }

  // Fonction pour sélectionner un rôle
  selectRole(role: string): void {
    this.selectedRole = ''; // Réinitialisation du rôle sélectionné
    this.eventForm.patchValue({ role }); // Met à jour la valeur du champ de rôle dans le formulaire
    this.eventForm.controls['role'].setValue(role); // Définit la valeur sélectionnée dans le champ de rôle
  }

  // Fonction appelée lors du clic sur le bouton "Annuler"
  onNoClick(): void {
    this.dialogRef.close(); // Ferme la boîte de dialogue sans retourner de valeur
  }

  // Fonction appelée lors du clic sur le bouton "Enregistrer"
  onSave(): void {
    console.log(this.eventForm);
    if (this.eventForm.valid) { // Vérifie si le formulaire est valide
      const formValue = this.eventForm.value; // Récupère les valeurs du formulaire

      // Crée un objet User à partir des valeurs du formulaire
      const user: User = {
        name: formValue.name,
        email: formValue.email,
        password: formValue.password,
        role: formValue.role,
      };

      // Appel du service pour créer un utilisateur
      this.userService.createUser(user).subscribe({
        next: (response) => {
          console.log('Utilisateur créé avec succès:', response);
          // Affiche une notification de succès
          this._snackBar.open('Utilisateur créé avec succès', 'OK', {
            duration: 4000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
          this.dialogRef.close(this.eventForm.value); // Ferme la boîte de dialogue et retourne les valeurs du formulaire
        },
        error: (error) => {
          // Affiche une notification en cas d'erreur
          this._snackBar.open('Erreur lors de la création de l\'utilisateur', 'OK', {
            duration: 4000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
          console.error('Erreur lors de la création de l\'utilisateur:', error);
        }
      });
    } else {
      // Affiche une notification si le formulaire est invalide
      this._snackBar.open('Le formulaire est invalide', 'OK', {
        duration: 4000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
      });
      console.warn('Le formulaire est invalide');
    }
  }
}
