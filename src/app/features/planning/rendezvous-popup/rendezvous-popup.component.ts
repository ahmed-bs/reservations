import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { timeRangeValidator } from 'src/app/core/interceptors/time-range-validator';
import { Appointment } from 'src/app/core/models/appointement';
import { Customer } from 'src/app/core/models/customer';
import { AppointmentService } from 'src/app/core/services/appointement.service';

@Component({
  selector: 'app-rendezvous-popup',
  templateUrl: './rendezvous-popup.component.html',
  styleUrls: ['./rendezvous-popup.component.css']
})
export class RendezvousPopupComponent implements OnInit {
  selectedType!: number ;

  eventForm!: FormGroup;
  hours: number[] = Array.from({ length: 24 }, (_, i) => i);
  minutes: number[] = Array.from({ length: 60 }, (_, i) => i);
  AppointmentType: any;


  
  constructor(
    private _snackBar: MatSnackBar,
    private appointementService: AppointmentService, 
    private dialogRef: MatDialogRef<RendezvousPopupComponent>,
    private fb: FormBuilder
  ) {}


  ngOnInit(): void {
    this.eventForm = this.fb.group({
      name1: ['', Validators.required],
      name2: ['', Validators.required],
      type: ['', Validators.required],
      date: [new Date(), Validators.required],
      hour: [null,[ Validators.required,timeRangeValidator('10:00', '19:00')]],
      tel: ['', [Validators.required,Validators.pattern(/^\d+$/)]],
      note: ['']
    });

    this.eventForm.controls['type'].setValue(this.selectedType);
  }
  selectType(type: number): void {
    this.selectedType = type;
    this.eventForm.patchValue({ type });
    this.eventForm.controls['type'].setValue(type);
  }


  onNoClick(): void {
    this.dialogRef.close();
  }







  onSave(): void {
    if (this.eventForm.valid) {
      const formValue = this.eventForm.value;
      let time = formValue.hour;
      if (time.length === 5) {
        // Adding seconds if they are not present
        time = `${time}:00`;
      }
      this.dialogRef.close(this.eventForm.value);
      const appointment: Appointment = {
        id: 0,
        type: formValue.type ,
        date: new Date(formValue.date),
        time: time,
        customer: {
          id: 0,
          name: formValue.name1,
          prenom: formValue.name2,
          phone: formValue.tel
        },
        status: 0,
        comment: formValue.note,
        purchase: true,
        deposit: true,
        customerId: 0,
        userId: 1,
      };

      this.appointementService.createAppointment(appointment).subscribe({
        
        next: (response) => {
          console.log('Appointment created successfully:', response);
          this._snackBar.open('Appointment created successfully', 'OK', {
            duration: 4000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
          this.dialogRef.close(this.eventForm.value);
        },
        error: (error) => {
          this._snackBar.open('Error creating appointment', 'OK', {
            duration: 4000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
          console.error('Error creating appointment:', error);
        }
      });
    } else {
      this._snackBar.open('Form is invalid', 'OK', {
        duration: 4000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
      });
      console.warn('Form is invalid');
    }
  }


  get hour() {
    return this.eventForm.get('hour');
  }


}
