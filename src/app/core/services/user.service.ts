// src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { endPoint } from '../utils/endpoint';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = endPoint.Api +'api/User'; 

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/Get_AllUsers`);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/AddUser`, user);
  }

  updateUser(user: User, id: number): Observable<any> {
    const url = `${this.apiUrl}/UpdateUser?id=${id}`;
    return this.http.put(url, user, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }
  deleteUser(userId: number): Observable<any> {
    const params = new HttpParams().set('id', userId.toString());
    return this.http.delete<any>(`${this.apiUrl}/DeleteUser`, { params });
  }
}
