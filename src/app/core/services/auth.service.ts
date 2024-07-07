import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { endPoint } from '../utils/endpoint'; // Assuming this imports the API endpoint

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = endPoint.Api + 'api/';

  constructor(private http: HttpClient) { }

  // Method to handle user login
  login(credentials: any): Observable<any> {
    // Send a POST request to the login endpoint with provided credentials
    return this.http.post(`${this.baseUrl}login`, credentials);
  }

  // Method to handle user logout
  logout(): Observable<any> {
    const token = localStorage.getItem('token'); // Retrieve token from local storage
    localStorage.setItem('token', ''); // Clear token from local storage
    const headers = { 'Authorization': `Bearer ${token}` }; // Set Authorization header with the token
    window.location.reload(); // Refresh the window after logout (optional, depending on your application flow)
    // Send a POST request to the logout endpoint with empty body and authorization headers
    return this.http.post(`${this.baseUrl}/logout`, {}, { headers });
  }
}
