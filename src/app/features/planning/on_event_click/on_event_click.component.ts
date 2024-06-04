import { Component, Inject, OnInit, SimpleChanges } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Appointment } from 'src/app/core/models/appointement';
import { AppointmentService } from 'src/app/core/services/appointement.service';

@Component({
  selector: 'app-on_event_click',
  templateUrl: './on_event_click.component.html',
  styleUrls: ['./on_event_click.component.css']
})
export class On_event_clickComponent implements OnInit {
  appointment!: Appointment;
  originalAppointment!: Appointment;

  constructor(
    private _snackBar: MatSnackBar,
    private appointementService: AppointmentService,
    public dialogRef: MatDialogRef<On_event_clickComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { appointment: Appointment }
  ) {
    this.appointment = { ...data.appointment, date: new Date(data.appointment.date) };
    this.originalAppointment = { ...data.appointment, date: new Date(data.appointment.date) };
  }

  ngOnInit() {
    this.appointment = { ...this.data.appointment, date: new Date(this.data.appointment.date) };
    this.originalAppointment = { ...this.data.appointment, date: new Date(this.data.appointment.date) };
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      this.appointment = { ...this.data.appointment, date: new Date(this.data.appointment.date) };
    }
  }

  showReportForm: boolean = false;

  updateAppointment(id: number, appointment: Appointment): Observable<Appointment> {
    return this.appointementService.updateAppointment(id, appointment);
  }

  validateTask(): void {
    let time = this.appointment.time;

    const hours = parseInt(time[0], 10);
    const minutes = parseInt(time[1], 10);

    const date = new Date(this.appointment.date);
    date.setHours(hours);
    date.setMinutes(minutes);

    const appointmenter: Appointment = {
      id: this.appointment.id,
      type: this.appointment.type,
      date: date,
      time: this.appointment.time,
      customer: {
        id: this.appointment.customerId,
        name: this.appointment.customer.name,
        prenom: this.appointment.customer.prenom,
        phone: this.appointment.customer.phone
      },
      status: 1,
      comment: this.appointment.comment,
      purchase: true,
      deposit: true,
      customerId: this.appointment.customerId,
      userId: 1,
    };

    this.updateAppointment(appointmenter.id, appointmenter).subscribe(
      (updatedAppointment) => {
        this._snackBar.open('Le rendez-vous est terminé.', 'OK', {
          duration: 6000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
        this.dialogRef.close(updatedAppointment);
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
    let time = this.originalAppointment.time;

    const hours = parseInt(time[0], 10);
    const minutes = parseInt(time[1], 10);

    const date = new Date(this.originalAppointment.date);
    console.log(date);
    
    date.setHours(hours);
    date.setMinutes(minutes);

    const appointmenter: Appointment = {
      id: this.originalAppointment.id,
      type: this.originalAppointment.type,
      date: date,
      time: this.originalAppointment.time,
      customer: {
        id: this.originalAppointment.customerId,
        name: this.originalAppointment.customer.name,
        prenom: this.originalAppointment.customer.prenom,
        phone: this.originalAppointment.customer.phone
      },
      status: 3,
      comment: this.originalAppointment.comment,
      purchase: true,
      deposit: true,
      customerId: this.originalAppointment.customerId,
      userId: 1,
    };

    this.updateAppointment(appointmenter.id, appointmenter).subscribe(
      (updatedAppointment) => {
        if (this.CreateTask() == "200") {
          this._snackBar.open('Le rendez-vous est reporté.', 'OK', {
            duration: 6000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
          console.log('Rendez-vous reporté avec succès', updatedAppointment);
          this.dialogRef.close(updatedAppointment);
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
    let time = this.appointment.time;

    const hours = parseInt(time[0], 10);
    const minutes = parseInt(time[1], 10);

    const date = new Date(this.appointment.date);
    date.setHours(hours);
    date.setMinutes(minutes);

    const appointmenter: Appointment = {
      id: this.appointment.id,
      type: this.appointment.type,
      date: date,
      time: this.appointment.time,
      customer: {
        id: this.appointment.customerId,
        name: this.appointment.customer.name,
        prenom: this.appointment.customer.prenom,
        phone: this.appointment.customer.phone
      },
      status: 2,
      comment: this.appointment.comment,
      purchase: true,
      deposit: true,
      customerId: this.appointment.customerId,
      userId: 1,
    };

    this.updateAppointment(appointmenter.id, appointmenter).subscribe(
      (updatedAppointment) => {
        this._snackBar.open('Le rendez-vous est annulé.', 'OK', {
          duration: 6000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
        console.log('Rendez-vous annulé avec succès', updatedAppointment);
        this.dialogRef.close(updatedAppointment);
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
    let time = this.appointment.time;

    const hours = parseInt(time[0], 10);
    const minutes = parseInt(time[1], 10);

    const date = new Date(this.appointment.date);
    date.setHours(hours);
    date.setMinutes(minutes);

    const appointmenter: Appointment = {
      id: 0,
      type: this.originalAppointment.type,
      date: date,
      time: this.appointment.time,
      customer: {
        id: 0,
        name: this.appointment.customer.name,
        prenom: this.appointment.customer.prenom,
        phone: this.appointment.customer.phone
      },
      status: 0,
      comment: this.appointment.comment,
      purchase: true,
      deposit: true,
      customerId: 0,
      userId: 1,
    };

    this.appointementService.createAppointment(appointmenter).subscribe({
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
