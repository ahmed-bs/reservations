import {
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import {
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { Subject } from 'rxjs';
import {
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import { MatDialog } from '@angular/material/dialog';
import { ReservationPopupComponent } from '../rendezvous-popup/resevation-popup.component';
import { On_event_clickComponent } from '../on_event_click/on_event_click.component';
import { CalendarEventWithReservation } from 'src/app/core/models/calendar-event ';
import { ReservationService } from 'src/app/core/services/reservation.service';

// Colors for different event statuses
const colors: Record<string, EventColor> = {
  red: {
    primary: '#B88065',
    secondary: '#fde0e0',
  },
  green: {
    primary: '#71c08d',
    secondary: '#e0f8e0',
  },
  purple: {
    primary: '#8269D1',
    secondary: '#e0e0f8',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
  // Initial view of the calendar
  view: CalendarView = CalendarView.Month;

  // Array to hold calendar events with reservation details
  events!: CalendarEventWithReservation[];

  // Available calendar views
  CalendarView = CalendarView;

  // Subject for refreshing the calendar
  refresh = new Subject<void>();

  // Date currently selected in the calendar
  viewDate: Date = new Date();

  // Flag to track if the day view is open
  activeDayIsOpen: boolean = false;

  constructor(public dialog: MatDialog, private reservationService: ReservationService) {
    // Fetch reservations on component initialization
    this.getAllreservation();
  }

  // Function to handle day click event in the calendar
  dayClicked({ date, events }: { date: Date; events: CalendarEventWithReservation[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      // Toggle the day view open/close if it's the same month
      this.activeDayIsOpen = (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0 ? false : true;
      this.viewDate = date; // Update the selected date
    }
  }

  // Function to handle event time changes in the calendar
  eventTimesChanged({ event, newStart, newEnd }: CalendarEventTimesChangedEvent): void {
    // Update the event times in the events array
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
  }

  // Function to change the calendar view
  setView(view: CalendarView) {
    this.view = view;
  }

  // Function to open the month view day
  closeOpenMonthViewDay() {
    this.activeDayIsOpen = true;
  }

  // Lifecycle hook called after Angular initializes the component
  ngOnInit(): void {
    this.getAllreservation(); // Fetch reservations on component initialization
  }

  // Function to fetch all reservations
  getAllreservation() {
    this.reservationService.getAllReservations().subscribe(async reservations => {
      // Map reservations to calendar events
      this.events = await reservations.map(reservation => {
        const timeParts = reservation.Time.split(':');
        const hours = parseInt(timeParts[0], 10);
        const minutes = parseInt(timeParts[1], 10);
        const color = this.getTextColorEvent(reservation.Status); // Get text color based on reservation status
        const start = new Date(reservation.Date);
        start.setHours(hours, minutes);
        const end = addHours(new Date(start), 2);
        return {
          start,
          end,
          title: `<div class="text-containerEvent ${color}">
                    <p class="nameEvent ${color}">${reservation.Salle?.SalleName} ${reservation.Salle?.SalleNumber}</p>
                    <p class="nameEvent ${color}">${reservation.User?.name}</p>
                  </div>`,
          color: this.getBackgroundColorEvent(reservation.Status), // Get background color based on reservation status
          reservation: reservation, // Store the reservation object
        };
      });
    });
  }

  // Function to open a dialog for adding new reservations
  openDialog(): void {
    const dialogRef = this.dialog.open(ReservationPopupComponent, {
      width: '510px',
    });
    dialogRef.afterClosed().subscribe(async result => {
      await this.getAllreservation(); // Refresh reservations after dialog is closed
      console.log('The dialog was closed', result);
    });
    this.getAllreservation(); // Refresh reservations
  }

  // Function to handle click events on calendar events
  eventClicked(event: CalendarEventWithReservation): void {
    if (event.reservation?.Status == 0) { // Check if event status is pending
      console.log('Event clicked', event);
      const dialogRef = this.dialog.open(On_event_clickComponent, {
        width: '400px',
        panelClass: 'mat-container',
        data: { reservation: event.reservation } // Pass reservation data to the dialog
      });
      dialogRef.afterClosed().subscribe(async result => {
        await this.getAllreservation(); // Refresh reservations after dialog is closed
        console.log('The dialog was closed', result);
      });
    }
    this.getAllreservation(); // Refresh reservations
  }

  // Function to get background color based on reservation status
  getBackgroundColorEvent(number: number): EventColor {
    switch (number) {
      case 0:
        return colors['purple'];
      case 1:
        return colors['green'];
      case 2:
        return colors['red'];
      case 3:
        return colors['yellow'];
      default:
        return colors['blue'];
    }
  }

  // Function to get text color based on reservation status
  getTextColorEvent(number: number): string {
    switch (number) {
      case 0:
        return 'purpleEvent';
      case 1:
        return 'greenEvent';
      case 2:
        return 'redEvent';
      case 3:
        return 'yellowEvent';
      default:
        return 'blueEvent';
    }
  }

}
