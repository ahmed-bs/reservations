import { Component, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { Subscription, filter } from 'rxjs';
import { SharedService } from '../shared.service';
import { NavigationEnd, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from 'src/app/core/services/auth.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  sideLinks!: NodeListOf<HTMLAnchorElement>;

  constructor(
    public userService: UserService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private authService: AuthService,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private router: Router
  ) {}

  // Fonction appelée lors de l'initialisation du composant
  ngOnInit() {}

  // Fonction appelée après l'initialisation de la vue du composant
  ngAfterViewInit(): void {
    // Sélection de tous les liens dans la barre latérale sauf ceux de déconnexion
    this.sideLinks = this.elementRef.nativeElement.querySelectorAll('.sidebar .side-menu li a:not(.logout)');
    
    // Ajout d'un écouteur d'événements pour chaque lien
    this.sideLinks.forEach(item => {
      const li = item.parentElement;
      item.addEventListener('click', () => {
        // Supprime la classe 'active' de tous les éléments
        this.sideLinks.forEach(i => {
          this.renderer.removeClass(i.parentElement, 'active');
        });
        // Ajoute la classe 'active' à l'élément cliqué
        this.renderer.addClass(li, 'active');
      });
    });

    // Mise à jour du lien actif lors de la fin de la navigation
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateActiveLink();
    });

    // Initialisation de l'état actif du lien
    this.updateActiveLink();
  }

  // Fonction pour mettre à jour le lien actif
  private updateActiveLink(): void {
    this.sideLinks.forEach(item => {
      const li = item.parentElement;
      const href = item.getAttribute('routerLink');
      // Ajoute la classe 'active' si le lien correspond à l'URL actuelle
      if (this.router.url === href) {
        this.renderer.addClass(li, 'active');
      } else {
        // Sinon, retire la classe 'active'
        this.renderer.removeClass(li, 'active');
      }
    });
  }

  // Fonction pour gérer la déconnexion de l'utilisateur
  Logout(): void {
    // Ouvre une boîte de dialogue de confirmation
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: { message: 'Êtes-vous sûr de vouloir Déconnecter?' }
    });

    // Action après la fermeture de la boîte de dialogue
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Confirmed');
        // Appel du service de déconnexion
        this.authService.logout().subscribe(
          (response: any) => {
            console.log(response);
            localStorage.setItem('token', '');
            window.location.reload();
            // Notification de déconnexion réussie
            this._snackBar.open('Déconnecter.', 'OK', {
              duration: 4000,
              horizontalPosition: 'right',
              verticalPosition: 'bottom',
            });
          },
          (error: HttpErrorResponse) => {
            // Gestion des erreurs de déconnexion
          }
        );
      } else {
        console.log('Cancelled');
        // Notification d'annulation de la déconnexion
        this._snackBar.open('Déconnection annulée.', 'OK', {
          duration: 4000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
      }
    });
  }
}
