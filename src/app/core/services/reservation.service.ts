import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { endPoint } from '../utils/endpoint'; // Importation de l'URL de l'API depuis les constantes d'endpoints
import { Reservation } from '../models/Reservation'; // Importation du modèle de données de réservation

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl =  endPoint.Api + 'api/reservations'; // URL de base de l'API pour les réservations

  constructor(private http: HttpClient) {}

  // Méthode pour créer une nouvelle réservation
  createReservation(reservation: Reservation): Observable<Reservation> {
    return this.http.post<Reservation>(this.apiUrl, reservation); // Requête POST vers l'API pour créer une réservation
  }

  // Méthode pour récupérer toutes les réservations
  getAllReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.apiUrl); // Requête GET vers l'API pour récupérer toutes les réservations
  }

  // Méthode pour récupérer une réservation par son ID
  getReservationById(id: number): Observable<Reservation> {
    return this.http.get<Reservation>(`${this.apiUrl}/${id}`); // Requête GET vers l'API pour récupérer une réservation par ID
  }

  // Méthode pour mettre à jour une réservation existante
  updateReservation(id: number, reservation: Reservation): Observable<Reservation> {
    return this.http.put<Reservation>(`${this.apiUrl}/${id}`, reservation); // Requête PUT vers l'API pour mettre à jour une réservation
  }

  // Méthode pour supprimer une réservation par son ID
  deleteReservation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`); // Requête DELETE vers l'API pour supprimer une réservation par ID
  }
}
