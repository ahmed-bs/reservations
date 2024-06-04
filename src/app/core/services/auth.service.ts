import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { endPoint } from '../utils/endpoint';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = endPoint.Api +'api/Account'; 

  constructor(private http: HttpClient) { }

  login(credentials: any): Observable<any> {

    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  logout(): Observable<any> {
    const token = localStorage.getItem('token');
    localStorage.setItem('token','');
    const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.post(`${this.baseUrl}/logout`, {}, { headers });
  }
}
