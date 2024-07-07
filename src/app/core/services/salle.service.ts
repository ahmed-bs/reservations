import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Salle } from '../models/salle';
import { endPoint } from '../utils/endpoint'; // Import de l'URL de l'API depuis un fichier endpoint

@Injectable({
  providedIn: 'root'
})
export class SalleService {

  private apiUrl = endPoint.Api + 'api/salles'; // URL de base de l'API pour les salles

  constructor(private http: HttpClient) {}

  // Méthode pour récupérer toutes les salles
  getSalles(): Observable<Salle[]> {
    return this.http.get<Salle[]>(this.apiUrl);
  }

  // Méthode pour récupérer une salle par son ID
  getSalle(id: string): Observable<Salle> {
    return this.http.get<Salle>(`${this.apiUrl}/${id}`);
  }

  // Méthode pour créer une nouvelle salle
  createSalle(salle: Salle): Observable<Salle> {
    return this.http.post<Salle>(this.apiUrl, salle);
  }

  // Méthode pour mettre à jour une salle existante
  updateSalle(salle: Salle, id: string): Observable<Salle> {
    return this.http.put<Salle>(`${this.apiUrl}/${id}`, salle);
  }

  // Méthode pour supprimer une salle par son ID
  deleteSalle(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
