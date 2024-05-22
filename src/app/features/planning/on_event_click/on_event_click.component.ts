import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Appointment } from 'src/app/core/models/appointement';

@Component({
  selector: 'app-on_event_click',
  templateUrl: './on_event_click.component.html',
  styleUrls: ['./on_event_click.component.css']
})
export class On_event_clickComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<On_event_clickComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { appointment: Appointment }
  ) {}

  ngOnInit() {
  }
  taskTitle: string = 'Task Title';
  taskDescription: string = 'Task description goes here...';
  taskNote: string = '';
  showReportForm: boolean = false;
  reportDate: string = '';
  reportTime: string = '';

  validateTask(): void {
    alert('Task validated!');
    // Implement your validation logic here
  }

  editTask(): void {
    const newTitle = prompt('Edit task title:', this.taskTitle);
    const newDescription = prompt('Edit task description:', this.taskDescription);
    if (newTitle !== null) {
      this.taskTitle = newTitle;
    }
    if (newDescription !== null) {
      this.taskDescription = newDescription;
    }
  }

  toggleReport(): void {
    this.showReportForm = !this.showReportForm;
  }

  submitReport(): void {
    const note = this.taskNote.trim();
    const date = this.reportDate;
    const time = this.reportTime;

    if (!note) {
      alert('Please add a note before reporting.');
      return;
    }

    if (!date || !time) {
      alert('Please select both a date and time for the report.');
      return;
    }

    alert(`Task reported with note: ${note} on ${date} at ${time}`);
    // Implement your reporting logic here
  }

  annulTask(): void {
    const confirmAnnul = confirm('Are you sure you want to annul this task?');
    if (confirmAnnul) {
      alert('Task annulled!');
      // Implement your annul logic here
    }
  }
}
