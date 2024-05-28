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
  USER_DATA: User[] = [];
  displayedColumns: string[] = ['name', 'email', 'actions'];
  dataSource = new MatTableDataSource<User>(this.USER_DATA);
  newUser!: User;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private userService: UserService,private _snackBar: MatSnackBar) {}

  ngOnInit() {
    this.getAllUsers();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addUser() {
    this.userService.createUser(this.newUser).subscribe(
      response => {
        console.log('User added successfully', response);
        this.getAllUsers();
      },
      error => {
        console.error('There was an error!', error);
      }
    );
  }

  getAllUsers() {
    this.userService.getUsers().subscribe(users => {
      this.USER_DATA = users;
      this.dataSource.data = this.USER_DATA;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddUserPopupComponent, {
      width: '470px',
    });
    dialogRef.afterClosed().subscribe(async result => {
      await this.getAllUsers();
      console.log('The dialog was closed', result);
    });
  }

  openEditDialog(user: User): void {
    const dialogRef = this.dialog.open(UpdateUserComponent, {
      width: '400px',
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAllUsers();
      }
    });
  }




  
  deleteUser(userId: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: { message: 'Êtes-vous sûr de vouloir supprimer cet utilisateur?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Confirmed');
        this.userService.deleteUser(userId).subscribe(
          response => {
            console.log('User deleted successfully', response);
            this._snackBar.open('Utilisateur supprimé avec succès.', 'OK', {
              duration: 4000,
              horizontalPosition: 'right',
              verticalPosition: 'bottom',
            });
            this.getAllUsers();
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
