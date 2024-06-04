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
  loginForm!: FormGroup;

  constructor(
    private _snackBar: MatSnackBar,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        (response: any) => {
          console.log(response);
          this._snackBar.open('Connexion réussie', 'OK', {
            duration: 4000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
          localStorage.setItem('token', response.token);
          this.router.navigate(['/']);
        },
        (error: HttpErrorResponse) => {
          if (error.error instanceof ErrorEvent) {
            this._snackBar.open('Une erreur réseau est survenue. Veuillez vérifier votre connexion et réessayer.', 'OK', {
              duration: 4000,
              horizontalPosition: 'right',
              verticalPosition: 'bottom',
            });
          } else {
            console.error(
              `Backend returned code ${error.status}, ` +
              `body was: ${error.error}`);
            if (error.status === 0) {
              this._snackBar.open('Impossible de se connecter au serveur. Veuillez vérifier que le serveur est en cours d\'exécution.', 'OK', {
                duration: 4000,
                horizontalPosition: 'right',
                verticalPosition: 'bottom',
              });
            } else if (error.status >= 500) {
              this._snackBar.open('Une erreur serveur est survenue. Veuillez réessayer plus tard.', 'OK', {
                duration: 4000,
                horizontalPosition: 'right',
                verticalPosition: 'bottom',
              });
            } else {
              // Handle other errors (e.g., 401 Unauthorized, 403 Forbidden, etc.)
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
