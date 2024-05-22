import { CalendarEvent } from 'angular-calendar';
import { Appointment } from './appointement';

export interface CalendarEventWithAppointment extends CalendarEvent {
  appointment?: Appointment;
}
