import { CalendarEvent } from 'angular-calendar';
import { Reservation } from './Reservation';

export interface CalendarEventWithReservation extends CalendarEvent {
 reservation?: Reservation;
}
