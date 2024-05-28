// src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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

  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, user);
  }

  deleteUser(userId: number): Observable<any> {
    const params = new HttpParams().set('id', userId.toString());
    return this.http.delete<any>(`${this.apiUrl}/DeleteUser`, { params });
  }
}
