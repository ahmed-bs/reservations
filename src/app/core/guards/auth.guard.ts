import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(): boolean {
    if (localStorage.getItem('token')) { // Vérifie si un token JWT est présent dans le localStorage
      return true; // Autorise la navigation vers la route protégée si un token est présent
    }
    this.router.navigate(['/login']); // Redirige vers la page de connexion si aucun token n'est présent
    return false; // Empêche la navigation vers la route protégée
  }
}
