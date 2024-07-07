import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { timeRangeValidator } from 'src/app/core/interceptors/time-range-validator'; // Import du validateur personnalisé pour la plage horaire
import { Reservation } from 'src/app/core/models/Reservation'; // Modèle de réservation
import { Salle } from 'src/app/core/models/salle'; // Modèle de salle
import { User } from 'src/app/core/models/user'; // Modèle d'utilisateur
import { ReservationService } from 'src/app/core/services/reservation.service'; // Service de gestion des réservations
import { SalleService } from 'src/app/core/services/salle.service'; // Service de gestion des salles
import { UserService } from 'src/app/core/services/user.service'; // Service de gestion des utilisateurs

@Component({
  selector: 'app-resevation-popup',
  templateUrl: './resevation-popup.component.html',
  styleUrls: ['./resevation-popup.component.css']
})
export class ReservationPopupComponent implements OnInit {
  selectedType!: number; // Variable pour le type sélectionné (non utilisée dans le code fourni)
  Salle_DATA: Salle[] = []; // Tableau des données des salles
  USER_DATA: User[] = []; // Tableau des données des utilisateurs
  eventForm!: FormGroup; // Formulaire de création de réservation
  hours: number[] = Array.from({ length: 24 }, (_, i) => i); // Liste des heures pour le sélecteur d'heures
  minutes: number[] = Array.from({ length: 60 }, (_, i) => i); // Liste des minutes pour le sélecteur de minutes
  ReservationType: any; // Type de réservation (non utilisé dans le code fourni)

  constructor(
    private userService: UserService,
    private salleService: SalleService,
    private _snackBar: MatSnackBar,
    private reservationService: ReservationService,
    private dialogRef: MatDialogRef<ReservationPopupComponent>,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getAllUsers(); // Charge tous les utilisateurs au chargement du composant
    this.getAllSalles(); // Charge toutes les salles au chargement du composant

    // Initialisation du formulaire de création de réservation avec validation des champs requis
    this.eventForm = this.fb.group({
      SalleId: ['', Validators.required], // ID de la salle sélectionnée
      date: [new Date(), Validators.required], // Date de la réservation, initialisée à la date courante
      hour: [null, [Validators.required, timeRangeValidator('10:00', '19:00')]], // Heure de la réservation avec validation de la plage horaire
      UserId: ['', Validators.required], // ID de l'utilisateur pour la réservation
      note: [''] // Note facultative pour la réservation
    });
  }

  // Fonction pour fermer le dialogue de création de réservation
  onNoClick(): void {
    this.dialogRef.close();
  }

  // Fonction appelée lors de la sauvegarde du formulaire de réservation
  onSave(): void {
    if (this.eventForm.valid) {
      const formValue = this.eventForm.value;
      let time = formValue.hour;

      const hours = parseInt(time[0], 10);
      const minutes = parseInt(time[1], 10);

      const date = new Date(formValue.date);
      date.setHours(hours);
      date.setMinutes(minutes);

      if (time.length === 5) {
        time = `${time}:00`;
      }

      // Création de l'objet de réservation à envoyer au service de gestion des réservations
      const reservation: Reservation = {
        Date: date, // Date et heure de la réservation
        Time: time,
        Status: 0, // Statut initial de la réservation
        Comment: formValue.note, // Commentaire associé à la réservation
        SalleId: formValue.SalleId, // ID de la salle réservée
        UserId: formValue.UserId // ID de l'utilisateur qui fait la réservation
      };

      console.log("Reservation object:", reservation);

      // Appel du service pour créer la réservation
      this.reservationService.createReservation(reservation).subscribe({
        next: (response) => {
          console.log('Reservation created successfully:', response);
          // Affichage d'un message de succès après création de la réservation
          this._snackBar.open('Rendez-vous créé avec succès', 'OK', {
            duration: 4000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
          this.dialogRef.close(this.eventForm.value); // Fermeture du dialogue après la création de la réservation
        },
        error: (error) => {
          // Affichage d'un message d'erreur en cas d'échec de la création de la réservation
          this._snackBar.open('Erreur lors de la création du reservation', 'OK', {
            duration: 4000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
          console.error('Erreur lors de la création du reservation:', error);
        }
      });
    } else {
      // Affichage d'un message si le formulaire n'est pas valide
      this._snackBar.open('Le formulaire est invalide', 'OK', {
        duration: 4000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
      });
      console.warn('Le formulaire est invalide');
    }
  }

  // Getter pour accéder au champ hour du formulaire
  get hour() {
    return this.eventForm.get('hour');
  }

  // Fonction pour récupérer toutes les salles depuis le service de gestion des salles
  getAllSalles() {
    this.salleService.getSalles().subscribe(salles => {
      this.Salle_DATA = salles; // Mise à jour des données des salles dans le composant
    });
  }

  // Fonction pour récupérer tous les utilisateurs depuis le service de gestion des utilisateurs
  getAllUsers() {
    this.userService.getUsers().subscribe(users => {
      this.USER_DATA = users; // Mise à jour des données des utilisateurs dans le composant
    });
  }
}
