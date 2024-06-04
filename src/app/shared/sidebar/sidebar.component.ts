import { Component, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { Subscription, filter } from 'rxjs';
import { SharedService } from '../shared.service';
import { NavigationEnd, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from 'src/app/core/services/auth.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  sideLinks!: NodeListOf<HTMLAnchorElement>;

  constructor(    private _snackBar: MatSnackBar,public dialog: MatDialog, private authService: AuthService,private elementRef: ElementRef, private renderer: Renderer2, private router: Router) {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.sideLinks = this.elementRef.nativeElement.querySelectorAll('.sidebar .side-menu li a:not(.logout)');
    this.sideLinks.forEach(item => {
      const li = item.parentElement;
      item.addEventListener('click', () => {
        this.sideLinks.forEach(i => {
          this.renderer.removeClass(i.parentElement, 'active');
        });
        this.renderer.addClass(li, 'active');
      });
    });

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateActiveLink();
    });

    this.updateActiveLink();
  }

  private updateActiveLink(): void {
    this.sideLinks.forEach(item => {
      const li = item.parentElement;
      const href = item.getAttribute('routerLink');
      if (this.router.url === href) {
        this.renderer.addClass(li, 'active');
      } else {
        this.renderer.removeClass(li, 'active');
      }
    });
  }






  Logout(): void {

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: { message: 'Êtes-vous sûr de vouloir Déconnecter?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Confirmed');
        this.authService.logout().subscribe(
          (response: any) => {
            console.log(response);
            localStorage.setItem('token', '');
            window.location.reload();
            this._snackBar.open('Déconnecter.', 'OK', {
              duration: 4000,
              horizontalPosition: 'right',
              verticalPosition: 'bottom',
            });
          },
          (error: HttpErrorResponse) => {
        
          }
        );
      } else {
        console.log('Cancelled');
        this._snackBar.open('Déconnection annulée.', 'OK', {
          duration: 4000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
      }
    });
  }


}
