import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import * as JWT from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const requiredRole = route.data['role']; // Get required role from route data
    const token = localStorage.getItem('token');


    if (token) {
      const decodedToken = JWT.jwtDecode<AuthenticateResponse>(token);
      const roles = decodedToken.Role; 

      if (roles && roles.indexOf(requiredRole) !== -1) {
        return true;
      }
    }

    this.router.navigate(['/']);
    return false;
  }
}