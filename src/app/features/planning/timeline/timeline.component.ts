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
import { RendezvousPopupComponent } from '../rendezvous-popup/rendezvous-popup.component';
import { AppointmentService } from 'src/app/core/services/appointement.service';

const colors: Record<string, EventColor> = {
  red: {
    primary:'#B88065',
    secondary:  '#fde0e0' ,
  },
  green: {
    primary: '#71c08d',
    secondary: '#e0f8e0',
  },
  purple: {
    primary:'#8269D1',
    secondary: '#e0e0f8' ,
  },
  // red: {
  //   primary: '#ad2121',
  //   secondary: '#FAE3E3',
  // },
  blue: {
    primary:  '#1e90ff',
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
  // changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
  // @ViewChild('modalContent', { static: true }) modalContent!: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;
  events!: CalendarEvent[];
  CalendarView = CalendarView;
  refresh = new Subject<void>();
  viewDate: Date = new Date();
  activeDayIsOpen: boolean = false;

  constructor(public dialog: MatDialog, private appointmentService: AppointmentService, ) {
    this.getAllAppointment();
   }
  // modalData!: {
  //   action: string;
  //   event: CalendarEvent;
  // };

  // actions: CalendarEventAction[] = [
  //   {
  //     label: '<i class="fas fa-fw fa-pencil-alt"></i>',
  //     a11yLabel: 'Edit',
  //     onClick: ({ event }: { event: CalendarEvent }): void => {
  //       this.handleEvent('Edited', event);
  //     },
  //   },
  //   {
  //     label: '<i class="fas fa-fw fa-trash-alt"></i>',
  //     a11yLabel: 'Delete',
  //     onClick: ({ event }: { event: CalendarEvent }): void => {
  //       this.events = this.events.filter((iEvent) => iEvent !== event);
  //       this.handleEvent('Deleted', event);
  //     },
  //   },
  // ];



  // events: CalendarEvent[] = [
  //   {
  //     start: subDays(startOfDay(new Date()), 4),
  //     // end: addDays(new Date(), 1),
  //     title: 'A 3 day event',
  //     color: { ...colors['red'] },
  //     // actions: this.actions,
  //     // allDay: true,
  //     // resizable: {
  //     //   beforeStart: true,
  //     //   afterEnd: true,
  //     // },
  //     // draggable: true,
  //   },
  //   {
  //     start: startOfDay(new Date()),
  //     title: 'xxxxxxxxxxx',
  //     color: { ...colors['yellow'] },
  //     // actions: this.actions,
  //   },
  //   {
  //     start: subDays(endOfMonth(new Date()), 3),
  //     // end: addDays(endOfMonth(new Date()), 3),
  //     title: '9874563310',
  //     color: { ...colors['green'] },
  //     allDay: true,
  //   },
  //   {
  //     start: addHours(startOfDay(new Date()), 2),
  //     end: addHours(new Date(), 2),
  //     title: '123456789',
  //     color: { ...colors['yellow'] },
  //     // actions: this.actions,
  //     // resizable: {
  //     //   beforeStart: true,
  //     //   afterEnd: true,
  //     // },
  //     // draggable: true,
  //   },
  // ];



  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
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
    // this.handleEvent('Dropped or resized', event);
  }

  // handleEvent(action: string, event: CalendarEvent): void {
  //   // this.modalData = { event, action };
  // }

  // addEvent(): void {
  //   this.events = [
  //     ...this.events,
  //     {
  //       title: 'New event',
  //       start: startOfDay(new Date()),
  //       end: endOfDay(new Date()),
  //       color: colors['red'],
  //       draggable: true,
  //       resizable: {
  //         beforeStart: true,
  //         afterEnd: true,
  //       },
  //     },
  //   ];
  // }

  // deleteEvent(eventToDelete: CalendarEvent) {
  //   this.events = this.events.filter((event) => event !== eventToDelete);
  // }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = true;
  }





  ngOnInit(): void {
    this.getAllAppointment();
  }

  getAllAppointment(){
    this.appointmentService.getAppointments().subscribe(appointments => {
      this.events = appointments.map(appointment => {
        // Splitting the time string into hours, minutes, and seconds
        const timeParts = appointment.time.split(':');
        const hours = parseInt(timeParts[0], 10); // Parsing hours as integer
        const minutes = parseInt(timeParts[1], 10); // Parsing minutes as integer
        const type =appointment.type == 0 ? "Dépôt" : "Essayage" ;
        const color =this.getTextColorEvent(appointment.status);
        console.log(color);
        
        // Creating a new Date object with the appointment date and time
        const start = new Date(appointment.date);
        start.setHours(hours, minutes); // Setting the hours and minutes
        
        // Adding 2 hours to the start time to get the end time
        const end = addHours(new Date(start), 2);
        
        return {
          start,
          end,
          title: ` 
          <div class="text-containerEvent ${color}" >
            <p class="titleEvent ${color}">${type}</p>
            <p class="nameEvent ${color}">${appointment.customer.name} ${appointment.customer.prenom}</p>
          </div>
      `,
          color: this.getBackgroundColorEvent(appointment.status),
          // allDay: true,
          // Add other properties as needed
        };
      });
    });
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(RendezvousPopupComponent, {
      width: '470px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllAppointment();
      console.log('The dialog was closed', result);
    });
  }


  getBackgroundColorEvent(number: number): EventColor {
    switch (number) {
      case 0:
        return colors['yellow'];
      case 1:
        return colors['green'];
      case 2:
        return colors['red'];
      case 3:
        return colors['purple'];
      default:
        return colors['blue']; 
    }
  }

  getTextColorEvent(number: number): string {
    
    switch (number) {
      case 0:
        return 'yellowEvent';
      case 1:
        return "greenEvent";
      case 2:
        return 'redEvent';
      case 3:
        return 'purpleEvent';
      default:
        return 'blueEvent'; 
    }
  }


}
