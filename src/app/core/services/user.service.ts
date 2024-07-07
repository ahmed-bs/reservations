import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { endPoint } from '../utils/endpoint';
import { jwtDecode } from 'jwt-decode'; // Importe la fonction jwtDecode pour décoder les tokens JWT

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = endPoint.Api + 'api/users'; // URL de base de l'API pour les utilisateurs

  private userRole: string | null = null; // Variable pour stocker le rôle de l'utilisateur
  public user!: User; // Variable pour stocker les détails de l'utilisateur

  constructor(private http: HttpClient) {
    this.loadUserRole(); // Charge le rôle de l'utilisateur au moment de la création du service
  }

  // Méthode pour récupérer tous les utilisateurs
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  // Méthode pour récupérer un utilisateur par son ID
  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  // Méthode pour créer un nouvel utilisateur
  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  // Méthode pour mettre à jour un utilisateur existant
  updateUser(user: User, id: string): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, user);
  }

  // Méthode pour supprimer un utilisateur par son ID
  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Méthode privée pour charger le rôle de l'utilisateur à partir du token JWT
  private loadUserRole(): void {
    const token = localStorage.getItem('token'); // Récupère le token JWT depuis le stockage local
    if (token) {
      const decodedToken: any = jwtDecode(token); // Décodage du token JWT
      console.log("decoded token :", decodedToken);

      // Appel à la méthode getUser pour récupérer les détails de l'utilisateur à partir de l'API
      this.getUser(decodedToken.id).subscribe(res => {
        this.user = res; // Stocke les détails de l'utilisateur
        console.log(res);
        this.userRole = this.user.role; // Récupère le rôle de l'utilisateur
      });
    }
  }

  // Méthode publique pour récupérer le rôle de l'utilisateur
  public getUserRole(): string | null {
    return this.userRole;
  }

  // Méthode publique pour vérifier si l'utilisateur est administrateur
  public isAdmin(): boolean {
    return this.userRole === 'Admin';
  }
}
