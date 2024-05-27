import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';

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

  constructor(private userService: UserService) {}

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
}
