import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup; // Déclaration du formulaire de login

  constructor(
    private _snackBar: MatSnackBar, // Service pour afficher des notifications
    private fb: FormBuilder, // Service pour construire des formulaires
    private authService: AuthService, // Service d'authentification
    private router: Router // Service de navigation
  ) { }

  // Fonction appelée lors de l'initialisation du composant
  ngOnInit(): void {
    // Initialisation du formulaire avec les champs email et password
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Champ email avec validation
      password: ['', [Validators.required]] // Champ password avec validation
    });
  }

  // Fonction appelée lors de la soumission du formulaire
  onSubmit(): void {
    // Vérifie si le formulaire est valide
    if (this.loginForm.valid) {
      // Appel au service d'authentification pour se connecter
      this.authService.login(this.loginForm.value).subscribe(
        (response: any) => {
          // Affiche une notification de succès
          console.log('token : ', response);
          this._snackBar.open('Connexion réussie', 'OK', {
            duration: 4000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
          // Stocke le token dans le localStorage et redirige vers la page d'accueil
          localStorage.setItem('token', response.token);
          this.router.navigate(['/']);
        },
        (error: HttpErrorResponse) => {
          // Gère les erreurs de connexion
          if (error.error instanceof ErrorEvent) {
            // Erreur réseau
            this._snackBar.open('Une erreur réseau est survenue. Veuillez vérifier votre connexion et réessayer.', 'OK', {
              duration: 4000,
              horizontalPosition: 'right',
              verticalPosition: 'bottom',
            });
          } else {
            // Erreurs côté serveur
            console.error(
              `Backend returned code ${error.status}, ` +
              `body was: ${error.error}`);
            if (error.status === 0) {
              // Serveur inaccessible
              this._snackBar.open('Impossible de se connecter au serveur. Veuillez vérifier que le serveur est en cours d\'exécution.', 'OK', {
                duration: 4000,
                horizontalPosition: 'right',
                verticalPosition: 'bottom',
              });
            } else if (error.status >= 500) {
              // Erreur serveur
              this._snackBar.open('Une erreur serveur est survenue. Veuillez réessayer plus tard.', 'OK', {
                duration: 4000,
                horizontalPosition: 'right',
                verticalPosition: 'bottom',
              });
            } else {
              // Autres erreurs (par exemple, 401 Unauthorized, 403 Forbidden, etc.)
              this._snackBar.open('Vérifiez vos identifiants', 'OK', {
                duration: 4000,
                horizontalPosition: 'right',
                verticalPosition: 'bottom',
              });
            }
          }
        }
      );
    }
  }
}
