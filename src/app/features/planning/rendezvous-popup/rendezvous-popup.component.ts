import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-rendezvous-popup',
  templateUrl: './rendezvous-popup.component.html',
  styleUrls: ['./rendezvous-popup.component.css']
})
export class RendezvousPopupComponent implements OnInit {

  eventForm!: FormGroup;
  eventTypes: string[] = ['Meeting', 'Reminder', 'Task'];
  hours: string[] = ['10:00', '11:00', '12:00']; // Example hours
  minutes: string[] = ['00', '15', '30', '45']; // Example minutes
  selectedType!: string;

  
  constructor(
    public dialogRef: MatDialogRef<RendezvousPopupComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      type: ['', Validators.required],
      hour: ['', Validators.required],
      minute: ['', Validators.required],
      date: ['', Validators.required],
      place: [''],
      note: ['']
    });

    this.selectedType = this.eventTypes[0];
    this.eventForm.controls['type'].setValue(this.selectedType);
  }


  selectType(type: string): void {
    this.selectedType = type;
    this.eventForm.controls['type'].setValue(type);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.eventForm.valid) {
      this.dialogRef.close(this.eventForm.value);
    }
  }

}
