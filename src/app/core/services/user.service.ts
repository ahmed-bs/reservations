// src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { endPoint } from '../utils/endpoint';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = endPoint.Api +'api/users'; 

  constructor(private http: HttpClient) {
    this.loadUserRole();
  }


  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }


  

  createUser(user: User): Observable<User> {
  
    return this.http.post<User>(this.apiUrl, user);
  }



  updateUser(_id: string, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${_id}`, user);
  }


  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }








  private userRole: string | null = null;


  private loadUserRole(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      this.userRole = decodedToken.Role || decodedToken.role; 
    }
  }

  public getUserRole(): string | null {
    return this.userRole;
  }

  public isAdmin(): boolean {
    return this.userRole === 'Admin';
  }

}