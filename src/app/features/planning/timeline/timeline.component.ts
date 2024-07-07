import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { Subject } from 'rxjs';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import { MatDialog } from '@angular/material/dialog';
import { ReservationPopupComponent } from '../rendezvous-popup/resevation-popup.component';
import { On_event_clickComponent } from '../on_event_click/on_event_click.component';
import { CalendarEventWithReservation } from 'src/app/core/models/calendar-event ';
import { ReservationService } from 'src/app/core/services/reservation.service';

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
  // red: {
  //   primary: '#ad2121',
  //   secondary: '#FAE3E3',
  // },
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
  view: CalendarView = CalendarView.Month;
  events!: CalendarEventWithReservation[];
  CalendarView = CalendarView;
  refresh = new Subject<void>();
  viewDate: Date = new Date();
  activeDayIsOpen: boolean = false;

  constructor(public dialog: MatDialog, private reservationService: ReservationService,) {
    this.getAllreservation();
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEventWithReservation[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
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


  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = true;
  }





  ngOnInit(): void {
    this.getAllreservation();
  }

  getAllreservation() {
    this.reservationService.getAllReservations().subscribe(async reservations => {
      this.events =await reservations.map(resvation => {
        const timeParts = resvation.Time.split(':');
        const hours = parseInt(timeParts[0], 10);
        const minutes = parseInt(timeParts[1], 10);
        const color = this.getTextColorEvent(resvation.Status);
        console.log(color);
        const start = new Date(resvation.Date);
        start.setHours(hours, minutes);
        const end = addHours(new Date(start), 2);
        return {
          start,
          end,
          title: ` 
          <div class="text-containerEvent ${color}" >
        
            <p class="nameEvent ${color}">${resvation.Salle?.SalleName} ${resvation.Salle?.SalleNumber}</p>
            <p class="nameEvent ${color}">${resvation.User?.name}</p>
          </div>
      `,
          color: this.getBackgroundColorEvent(resvation.Status),
          reservation: resvation,
        };
      });
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ReservationPopupComponent, {
      width: '510px',
    });
    dialogRef.afterClosed().subscribe(async result => {
      await this.getAllreservation();
      console.log('The dialog was closed', result);
    });
    this.getAllreservation();
  }

  eventClicked(event: CalendarEventWithReservation): void {
    if (event.reservation?.Status == 0) {
      console.log('Event clicked', event);
      const dialogRef = this.dialog.open(On_event_clickComponent, {
        width: '400px',
        panelClass: 'mat-container', data: { reservation: event.reservation }
      });
      dialogRef.afterClosed().subscribe(async result => {
        await this.getAllreservation();
        console.log('The dialog was closed', result);
      });
    }
    this.getAllreservation();
  }

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

  getTextColorEvent(number: number): string {
    switch (number) {
      case 0:
        return 'purpleEvent';
      case 1:
        return "greenEvent";
      case 2:
        return 'redEvent';
      case 3:
        return 'yellowEvent';
      default:
        return 'blueEvent';
    }
  }


}
