// src/app/services/appointment.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment } from '../models/appointement';
import { endPoint } from '../utils/endpoint';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private apiUrl =  endPoint.Api + 'api/Appointment'; 

  constructor(private http: HttpClient) {}

  getAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.apiUrl+'/Get_AllAppointments');
  }

  getAppointment(id: number): Observable<Appointment> {
    return this.http.get<Appointment>(`${this.apiUrl}/${id}`);
  }

  createAppointment(appointment: Appointment): Observable<Appointment> {
    debugger
    return this.http.post<Appointment>(this.apiUrl+'/AddAppointment', appointment);
  }

  updateAppointment(id: number, appointment: Appointment): Observable<Appointment> {
    return this.http.put<Appointment>(`${this.apiUrl}/UpdateAppointment?id=${id}`, appointment);
  }

  deleteAppointment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
