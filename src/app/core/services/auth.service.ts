import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { endPoint } from '../utils/endpoint';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = endPoint.Api +'api/'; 







  // login(email: string, password: string): Observable<any> {
  //   const body = { email, password };
  //   return this.http.post<any>(this.loginUrl, body);
  // }




  constructor(private http: HttpClient) { }

  login(credentials: any): Observable<any> {

    return this.http.post(`${this.baseUrl}login`, credentials);
  }

  logout(): Observable<any> {
    const token = localStorage.getItem('token');
    localStorage.setItem('token','');
    const headers = { 'Authorization': `Bearer ${token}` };
     window.location.reload();
    return this.http.post(`${this.baseUrl}/logout`, {}, { headers });
  }
}
