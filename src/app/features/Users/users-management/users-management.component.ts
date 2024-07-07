import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';
import { AddUserPopupComponent } from '../add-user-popup/add-user-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { UpdateUserComponent } from '../update-user/update-user.component';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-users-management',
  templateUrl: './users-management.component.html',
  styleUrls: ['./users-management.component.css']
})
export class UsersManagementComponent implements OnInit, AfterViewInit {
  USER_DATA: User[] = []; // Tableau des données utilisateurs
  displayedColumns: string[] = ['name', 'email', 'actions']; // Colonnes affichées dans la table
  dataSource = new MatTableDataSource<User>(this.USER_DATA); // Source de données pour la table
  newUser!: User; // Nouvel utilisateur à ajouter

  @ViewChild(MatPaginator) paginator!: MatPaginator; // Pagination de la table
  @ViewChild(MatSort) sort!: MatSort; // Tri de la table

  constructor(public dialog: MatDialog, private userService: UserService, private _snackBar: MatSnackBar) {}

  ngOnInit() {
    this.getAllUsers(); // Appel à la méthode pour récupérer tous les utilisateurs au chargement du composant
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator; // Initialisation de la pagination après l'affichage des vues
    this.dataSource.sort = this.sort; // Initialisation du tri après l'affichage des vues
  }

  // Méthode pour appliquer un filtre sur les données de la table
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // Méthode pour ajouter un nouvel utilisateur
  addUser() {
    this.userService.createUser(this.newUser).subscribe(
      response => {
        console.log('User added successfully', response);
        this.getAllUsers(); // Actualisation de la liste des utilisateurs après l'ajout
      },
      error => {
        console.error('There was an error!', error);
      }
    );
  }

  // Méthode pour récupérer tous les utilisateurs depuis le service
  getAllUsers() {
    this.userService.getUsers().subscribe(users => {
      this.USER_DATA = users; // Mise à jour des données utilisateurs
      this.dataSource.data = this.USER_DATA; // Mise à jour de la source de données pour la table
      this.dataSource.paginator = this.paginator; // Réinitialisation de la pagination
      this.dataSource.sort = this.sort; // Réinitialisation du tri
    });
  }

  // Méthode pour ouvrir la boîte de dialogue d'ajout d'utilisateur
  openDialog(): void {
    const dialogRef = this.dialog.open(AddUserPopupComponent, {
      width: '470px',
    });
    dialogRef.afterClosed().subscribe(async result => {
      await this.getAllUsers(); // Actualisation après la fermeture de la boîte de dialogue
      console.log('The dialog was closed', result);
    });
  }

  // Méthode pour ouvrir la boîte de dialogue de modification d'utilisateur
  openEditDialog(user: User): void {
    const dialogRef = this.dialog.open(UpdateUserComponent, {
      width: '400px',
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAllUsers(); // Actualisation après la modification de l'utilisateur
      }
    });
  }

  // Méthode pour supprimer un utilisateur
  deleteUser(userId: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: { message: 'Êtes-vous sûr de vouloir supprimer cet utilisateur?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Confirmed');
        console.log(userId);
        this.userService.deleteUser(userId.toString()).subscribe(
          response => {
            console.log('User deleted successfully', response);
            this._snackBar.open('Utilisateur supprimé avec succès.', 'OK', {
              duration: 4000,
              horizontalPosition: 'right',
              verticalPosition: 'bottom',
            });
            this.getAllUsers(); // Actualisation après la suppression de l'utilisateur
          },
          error => {
            this._snackBar.open('Erreur lors de la suppression de l\'utilisateur.', 'OK', {
              duration: 4000,
              horizontalPosition: 'right',
              verticalPosition: 'bottom',
            });
            console.error('There was an error!', error);
          }
        );
      } else {
        console.log('Cancelled');
        this._snackBar.open('Suppression annulée.', 'OK', {
          duration: 4000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
      }
    });
  }
}
