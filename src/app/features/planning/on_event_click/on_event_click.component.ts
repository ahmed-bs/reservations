import { Component, Inject, OnInit, SimpleChanges } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Reservation } from 'src/app/core/models/Reservation'; // Modèle de données de réservation
import { ReservationService } from 'src/app/core/services/reservation.service'; // Service de gestion des réservations

@Component({
  selector: 'app-on_event_click',
  templateUrl: './on_event_click.component.html',
  styleUrls: ['./on_event_click.component.css']
})
export class On_event_clickComponent implements OnInit {
  reservation!: Reservation; // Réservation en cours de traitement
  originalReservation!: Reservation; // Copie originale de la réservation

  constructor(
    private _snackBar: MatSnackBar,
    private reservationService: ReservationService,
    public dialogRef: MatDialogRef<On_event_clickComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { reservation: Reservation } // Données injectées (probablement une réservation à traiter)
  ) {
    // Initialisation de la réservation et de sa copie originale avec les données injectées
    this.reservation = { ...data.reservation, Date: new Date(data.reservation.Date) };
    this.originalReservation = { ...data.reservation, Date: new Date(data.reservation.Date) };
  }

  ngOnInit() {
    // Réinitialisation de la réservation et de sa copie originale lors du chargement du composant
    this.reservation = { ...this.data.reservation, Date: new Date(this.data.reservation.Date) };
    this.originalReservation = { ...this.data.reservation, Date: new Date(this.data.reservation.Date) };
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      // Mise à jour de la réservation et de sa copie originale lorsque les données changent
      this.reservation = { ...this.data.reservation, Date: new Date(this.data.reservation.Date) };
    }
  }

  showReportForm: boolean = false; // Indicateur pour afficher ou masquer le formulaire de rapport

  // Méthode pour mettre à jour une réservation
  updateReservation(id: number, reservation: Reservation): Observable<Reservation> {
    return this.reservationService.updateReservation(id, reservation); // Appel du service pour la mise à jour de la réservation
  }

  // Méthode pour valider une tâche (marquer comme terminée)
  validateTask(): void {
    let time = this.reservation.Time;

    const hours = parseInt(time[0], 10);
    const minutes = parseInt(time[1], 10);

    const date = new Date(this.reservation.Date);
    date.setHours(hours);
    date.setMinutes(minutes);

    const updatedReservation: Reservation = {
      _id: this.reservation._id,
      Date: date,
      Time: this.reservation.Time,
      Status: 1, // Statut mis à 1 pour indiquer que la tâche est validée
      Comment: this.reservation.Comment,
      SalleId: this.reservation.SalleId,
      UserId: '1', // ID de l'utilisateur (peut être dynamique ou récupéré depuis la session)
    };

    // Appel du service pour mettre à jour la réservation validée
    this.updateReservation(updatedReservation._id!, updatedReservation).subscribe(
      (updatedReservation) => {
        this._snackBar.open('Le rendez-vous est terminé.', 'OK', {
          duration: 6000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
        this.dialogRef.close(updatedReservation); // Fermeture de la boîte de dialogue après mise à jour
      },
      (error) => {
        this._snackBar.open('Erreur lors de la validation du rendez-vous', 'OK', {
          duration: 6000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
        console.error('Erreur lors de la validation du rendez-vous', error);
      }
    );
  }

  // Méthode pour basculer l'affichage du formulaire de rapport
  toggleReport(): void {
    this.showReportForm = !this.showReportForm;
  }

  // Méthode pour soumettre un rapport (marquer comme reporté)
  submitReport(): void {
    let time = this.originalReservation.Time;

    const hours = parseInt(time[0], 10);
    const minutes = parseInt(time[1], 10);

    const date = new Date(this.originalReservation.Date);
    date.setHours(hours);
    date.setMinutes(minutes);

    const updatedReservation: Reservation = {
      _id: this.originalReservation._id,
      Date: date,
      Time: this.originalReservation.Time,
      Status: 3, // Statut mis à 3 pour indiquer que la tâche est reportée
      Comment: this.originalReservation.Comment,
      SalleId: this.originalReservation.SalleId,
      UserId: '1', // ID de l'utilisateur (peut être dynamique ou récupéré depuis la session)
    };

    // Appel du service pour mettre à jour la réservation reportée
    this.updateReservation(updatedReservation._id!, updatedReservation).subscribe(
      (updatedReservation) => {
        // Si la création de tâche est réussie, affiche un message de succès et ferme la boîte de dialogue
        if (this.CreateTask() == "200") {
          this._snackBar.open('Le rendez-vous est reporté.', 'OK', {
            duration: 6000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
          console.log('Rendez-vous reporté avec succès', updatedReservation);
          this.dialogRef.close(updatedReservation);
        }
      },
      (error) => {
        this._snackBar.open('Erreur lors du report du rendez-vous', 'OK', {
          duration: 6000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
        console.error('Erreur lors du report du rendez-vous', error);
      }
    );
  }

  // Méthode pour annuler une tâche (marquer comme annulée)
  annulTask(): void {
    let time = this.reservation.Time;

    const hours = parseInt(time[0], 10);
    const minutes = parseInt(time[1], 10);

    const date = new Date(this.reservation.Date);
    date.setHours(hours);
    date.setMinutes(minutes);

    const updatedReservation: Reservation = {
      _id: this.reservation._id,
      Date: date,
      Time: this.reservation.Time,
      Status: 2, // Statut mis à 2 pour indiquer que la tâche est annulée
      Comment: this.reservation.Comment,
      SalleId: this.reservation.SalleId,
      UserId: "1", // ID de l'utilisateur (peut être dynamique ou récupéré depuis la session)
    };

    // Appel du service pour mettre à jour la réservation annulée
    this.updateReservation(updatedReservation._id!, updatedReservation).subscribe(
      (updatedReservation) => {
        this._snackBar.open('Le rendez-vous est annulé.', 'OK', {
          duration: 6000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
        console.log('Rendez-vous annulé avec succès', updatedReservation);
        this.dialogRef.close(updatedReservation); // Fermeture de la boîte de dialogue après mise à jour
      },
      (error) => {
        this._snackBar.open('Erreur lors de l\'annulation du rendez-vous', 'OK', {
          duration: 6000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
        console.error('Erreur lors de l\'annulation du rendez-vous', error);
      }
    );
  }

  // Méthode pour créer une tâche
  CreateTask(): string {
    let time = this.reservation.Time;

    const hours = parseInt(time[0], 10);
    const minutes = parseInt(time[1], 10);

    const date = new Date(this.reservation.Date);
    date.setHours(hours);
    date.setMinutes(minutes);

    const newReservation: Reservation = {
      _id: 0, // ID fictif pour une nouvelle réservation
      Date: date,
      Time: this.reservation.Time,
      Status: 0, // Statut mis à 0 pour indiquer que la tâche est créée
      Comment: this.reservation.Comment,
      SalleId: '', // ID de la salle (peut être vide pour une nouvelle réservation)
      UserId: '1', // ID de l'utilisateur (peut être dynamique ou récupéré depuis la session)
    };

    // Appel du service pour créer une nouvelle réservation
    this.reservationService.createReservation(newReservation).subscribe({
      next: (response) => {
        console.log('Rendez-vous créé avec succès:', response);
        return "200"; // Retourne le code 200 pour indiquer la réussite de la création
      },
      error: (error) => {
        this._snackBar.open('Erreur lors de la création du rendez-vous', 'OK', {
          duration: 6000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
        console.error('Erreur lors de la création du rendez-vous:', error);
        return "500"; // Retourne le code 500 pour indiquer une erreur lors de la création
      }
    });
    return "200"; // Retourne le code 200 par défaut
  }
}
