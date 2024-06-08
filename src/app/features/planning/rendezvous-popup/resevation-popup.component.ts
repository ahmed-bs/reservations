import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { timeRangeValidator } from 'src/app/core/interceptors/time-range-validator';
import { Reservation } from 'src/app/core/models/Reservation';
import { Salle } from 'src/app/core/models/salle';
import { User } from 'src/app/core/models/user';
import { ReservationService } from 'src/app/core/services/reservation.service';
import { SalleService } from 'src/app/core/services/salle.service';
import { UserService } from 'src/app/core/services/user.service';


@Component({
  selector: 'app-resevation-popup',
  templateUrl: './resevation-popup.component.html',
  styleUrls: ['./resevation-popup.component.css']
})
export class ReservationPopupComponent implements OnInit {
  selectedType!: number;
  Salle_DATA : Salle[]=[];
  USER_DATA: User[]=[];
  eventForm!: FormGroup;
  hours: number[] = Array.from({ length: 24 }, (_, i) => i);
  minutes: number[] = Array.from({ length: 60 }, (_, i) => i);
  ReservationType: any;

  constructor(
    private userService: UserService,
    private salleService: SalleService,
    private _snackBar: MatSnackBar,
    private reservationService: ReservationService,
    private dialogRef: MatDialogRef<ReservationPopupComponent>,
    private fb: FormBuilder
  ) {}


  getAllSalles() {
    this.salleService.getSalles().subscribe(salles => {
      this.Salle_DATA = salles;
    });
  }

  getAllUsers() {
    this.userService.getUsers().subscribe(users => {
      this.USER_DATA = users;
    });
  }


  ngOnInit(): void {
    this.getAllUsers();
    this.getAllSalles();
    this.eventForm = this.fb.group({
      SalleId: ['', Validators.required],
      date: [new Date(), Validators.required],
      hour: [null, [Validators.required, timeRangeValidator('10:00', '19:00')]],
      UserId: ['', Validators.required],
      note: ['']
    });
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

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
      this.dialogRef.close(this.eventForm.value);
      const reservation: Reservation = {

        Date: date,
        Time: time,
        Status: 0,
        Comment: formValue.note,
        SalleId: formValue.SalleId,
        UserId: formValue.userId,
      };

      this.reservationService.createReservation(reservation).subscribe({
        next: (response) => {
          console.log('Reservation created successfully:', response);
          this._snackBar.open('Rendez-vous créé avec succès', 'OK', {
            duration: 4000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
          this.dialogRef.close(this.eventForm.value);
        },
        error: (error) => {
          this._snackBar.open('Erreur lors de la création du reservation', 'OK', {
            duration: 4000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
          console.error('Erreur lors de la création du reservation:', error);
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

  get hour() {
    return this.eventForm.get('hour');
  }
}
