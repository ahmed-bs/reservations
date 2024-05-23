import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
    alert('Appointment validated!');
    this.appointment.status=1;
    this.updateAppointment(this.appointment.id, this.appointment).subscribe(
      (updatedAppointment) => {
        console.log('Appointment validated successfully', updatedAppointment);
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
    alert('Appointment reporeter!');
    this.appointment.status=3;
    this.updateAppointment(this.appointment.id, this.appointment).subscribe(
      (updatedAppointment) => {
        console.log('Appointment reporeter successfully', updatedAppointment);
        this.dialogRef.close(updatedAppointment);
      },
      (error) => {
        console.error('Error reporeter appointment', error);
      }
    );
  }

  annulTask(): void {
    alert('Appointment anulated!');
    this.appointment.status=2;
    this.updateAppointment(this.appointment.id, this.appointment).subscribe(
      (updatedAppointment) => {
        console.log('Appointment anulated successfully', updatedAppointment);
        this.dialogRef.close(updatedAppointment);
      },
      (error) => {
        console.error('Error anulated appointment', error);
      }
    );
  }








  
}
