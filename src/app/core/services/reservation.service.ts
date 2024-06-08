// src/app/services/Reservation.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { endPoint } from '../utils/endpoint';
import { Reservation } from '../models/Reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl =  endPoint.Api + 'api/reservations'; 

  constructor(private http: HttpClient) {}

  createReservation(reservation: Reservation): Observable<Reservation> {
    return this.http.post<Reservation>(this.apiUrl, reservation);
  }

  getAllReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.apiUrl);
  }

  getReservationById(id: number): Observable<Reservation> {
    return this.http.get<Reservation>(`${this.apiUrl}/${id}`);
  }

  updateReservation(id: number, reservation: Reservation): Observable<Reservation> {
    return this.http.put<Reservation>(`${this.apiUrl}/${id}`, reservation);
  }

  deleteReservation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
