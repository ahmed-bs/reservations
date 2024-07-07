import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import * as JWT from 'jwt-decode'; // Importe la bibliothèque jwt-decode pour décoder les tokens JWT
import { UserService } from '../services/user.service'; // Importe le service UserService pour vérifier le rôle de l'utilisateur

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private router: Router, private userService: UserService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.userService.isAdmin()) { // Vérifie si l'utilisateur est administrateur en utilisant la méthode isAdmin() du UserService
      return true; // Autorise l'accès à la route protégée si l'utilisateur est administrateur
    }

    this.router.navigate(['/']); // Redirige vers la page principale si l'utilisateur n'est pas administrateur
    return false; // Empêche l'accès à la route protégée
  }
}
