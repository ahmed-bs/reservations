import { Component, Inject, OnInit } from '@angular/core';
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
  constructor(   
    private _snackBar: MatSnackBar,
    private appointementService: AppointmentService, 
    public dialogRef: MatDialogRef<On_event_clickComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { appointment: Appointment },
    
  ) {
    this.appointment=data.appointment;
  }

  ngOnInit() {
    this.appointment=this.data.appointment;
  }

  showReportForm: boolean = false;
  updateAppointment(id: number, appointment: Appointment): Observable<Appointment> {
    return this.appointementService.updateAppointment(id, appointment);
  }

  validateTask(): void {
    this.appointment.status=1;
    this.updateAppointment(this.appointment.id, this.appointment).subscribe(
      (updatedAppointment) => {
        this._snackBar.open('Le rendez-vous est terminé.', 'OK', {
          duration: 6000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
        this.dialogRef.close(updatedAppointment);
      },
      (error) => {
        console.error('Error validated appointment', error);
      }
    );
  }


  toggleReport(): void {
    this.showReportForm = !this.showReportForm;
  }

  submitReport(): void {
    this.appointment.status=3;
    this.updateAppointment(this.appointment.id, this.appointment).subscribe(
      (updatedAppointment) => {
        this._snackBar.open('Le rendez-vous est reporté.', 'OK', {
          duration: 6000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
        console.log('Appointment reporeter successfully', updatedAppointment);
        this.dialogRef.close(updatedAppointment);
      },
      (error) => {
        console.error('Error reporeter appointment', error);
      }
    );
  }

  annulTask(): void {
    this.appointment.status=2;
    this.updateAppointment(this.appointment.id, this.appointment).subscribe(
      (updatedAppointment) => {
        this._snackBar.open('Le rendez-vous est annulé.', 'OK', {
          duration: 6000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
        console.log('Appointment anulated successfully', updatedAppointment);
        this.dialogRef.close(updatedAppointment);
      },
      (error) => {
        console.error('Error anulated appointment', error);
      }
    );
  }








  
}
