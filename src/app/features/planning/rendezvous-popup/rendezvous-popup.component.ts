import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
    // @Inject(MAT_DIALOG_DATA) private appointementService: AppointmentService,
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
      hour: [null, Validators.required],
      minute: [null, Validators.required],
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
    console.log(this.eventForm.value.type);
    
console.log(this.eventForm);


    if (this.eventForm.valid) {
      const formValue = this.eventForm.value;
      this.dialogRef.close(this.eventForm.value);
      const appointment: Appointment = {
        id: 0,
        type: formValue.type ,
        date: new Date(formValue.date),
        time: `${formValue.hour}:${formValue.minute}:00`,
        customer: {
          id: 0,
          name: formValue.name1,
          prenom: formValue.name2,
          phone: formValue.tel
        },
        status: 1,
        comment: formValue.note,
        purchase: true,
        deposit: true,
        customerId: 0,
        userId: 1,
      };
      console.log("this ibs the place that u need :",appointment);

      this.appointementService.createAppointment(appointment).subscribe({
        
        next: (response) => {
          console.log('Appointment created successfully:', response);
          this.dialogRef.close(this.eventForm.value);
        },
        error: (error) => {
          console.log("this ibs the place that u need :",appointment);
          console.error('Error creating appointment:', error);
        }
      });
    } else {
      console.warn('Form is invalid');
    }
  }


  


}
