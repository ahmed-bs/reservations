import { Component, Inject, OnInit, SimpleChanges } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Reservation } from 'src/app/core/models/Reservation';
import { ReservationService } from 'src/app/core/services/reservation.service';

@Component({
  selector: 'app-on_event_click',
  templateUrl: './on_event_click.component.html',
  styleUrls: ['./on_event_click.component.css']
})
export class On_event_clickComponent implements OnInit {
  reservation!: Reservation;
  originalReservation!: Reservation;

  constructor(
    private _snackBar: MatSnackBar,
    private reservationService: ReservationService,
    public dialogRef: MatDialogRef<On_event_clickComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { reservation: Reservation }
  ) {
    this.reservation = { ...data.reservation, Date: new Date(data.reservation.Date) };
    this.originalReservation = { ...data.reservation, Date: new Date(data.reservation.Date) };
  }

  ngOnInit() {
    this.reservation = { ...this.data.reservation, Date: new Date(this.data.reservation.Date) };
    this.originalReservation = { ...this.data.reservation, Date: new Date(this.data.reservation.Date) };
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      this.reservation = { ...this.data.reservation, Date: new Date(this.data.reservation.Date) };
    }
  }

  showReportForm: boolean = false;

  updateReservation(id: number, reservation: Reservation): Observable<Reservation> {
    return this.reservationService.updateReservation(id, reservation);
  }

  validateTask(): void {
    let time = this.reservation.Time;

    const hours = parseInt(time[0], 10);
    const minutes = parseInt(time[1], 10);

    const date = new Date(this.reservation.Date);
    date.setHours(hours);
    date.setMinutes(minutes);

    const reservationer: Reservation = {
      _id: this.reservation._id,
      Date: date,
      Time: this.reservation.Time,

      Status: 1,
     Comment: this.reservation.Comment,

      SalleId: this.reservation.SalleId,
      UserId: '1',
    };

    this.updateReservation(reservationer._id!, reservationer).subscribe(
      (updatedReservation) => {
        this._snackBar.open('Le rendez-vous est terminé.', 'OK', {
          duration: 6000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
        this.dialogRef.close(updatedReservation);
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

  toggleReport(): void {
    this.showReportForm = !this.showReportForm;
  }

  submitReport(): void {
    let time = this.originalReservation.Time;

    const hours = parseInt(time[0], 10);
    const minutes = parseInt(time[1], 10);

    const date = new Date(this.originalReservation.Date);
    console.log(date);
    
    date.setHours(hours);
    date.setMinutes(minutes);

    const reservationer: Reservation = {
      _id: this.originalReservation._id,
    
      Date: date,
      Time: this.originalReservation.Time,

      Status: 3,
      Comment: this.originalReservation.Comment,

      SalleId: this.originalReservation.SalleId,
      UserId: '1',
    };

    this.updateReservation(reservationer._id!, reservationer).subscribe(
      (updatedReservation) => {
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

  annulTask(): void {
    let time = this.reservation.Time;

    const hours = parseInt(time[0], 10);
    const minutes = parseInt(time[1], 10);

    const date = new Date(this.reservation.Date);
    date.setHours(hours);
    date.setMinutes(minutes);

    const reservationer: Reservation = {
      _id: this.reservation._id,
      Date: date,
      Time: this.reservation.Time,

     Status: 2,
      Comment: this.reservation.Comment,
      SalleId: this.reservation.SalleId,
      UserId:"1",
    };

    this.updateReservation(reservationer._id!, reservationer).subscribe(
      (updatedReservation) => {
        this._snackBar.open('Le rendez-vous est annulé.', 'OK', {
          duration: 6000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
        console.log('Rendez-vous annulé avec succès', updatedReservation);
        this.dialogRef.close(updatedReservation);
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

  CreateTask(): string {
    let time = this.reservation.Time;

    const hours = parseInt(time[0], 10);
    const minutes = parseInt(time[1], 10);

    const date = new Date(this.reservation.Date);
    date.setHours(hours);
    date.setMinutes(minutes);

    const reservationer: Reservation = {
      _id:0,
      Date: date,
      Time: this.reservation.Time,
      Status: 0,
      Comment: this.reservation.Comment,

      SalleId:'',
      UserId:'1',
    };

    this.reservationService.createReservation(reservationer).subscribe({
      next: (response) => {
        console.log('Rendez-vous créé avec succès:', response);
        return "200";
      },
      error: (error) => {
        this._snackBar.open('Erreur lors de la création du rendez-vous', 'OK', {
          duration: 6000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
        console.error('Erreur lors de la création du rendez-vous:', error);
        return "500";
      }
    });
    return "200";
  }
}
