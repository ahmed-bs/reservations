import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Salle } from 'src/app/core/models/salle';
import { SalleService } from 'src/app/core/services/salle.service';
import { AddSallePopupComponent } from '../add-salle-popup/add-salle-popup.component';
import { UpdateSalleComponent } from '../update-salle/update-salle.component';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-salle-managment',
  templateUrl: './salle-managment.component.html',
  styleUrls: ['./salle-managment.component.css']
})
export class SalleManagmentComponent implements OnInit {
  Salle_DATA: Salle[] = [];
  displayedColumns: string[] = ['name', 'email', 'actions'];
  dataSource = new MatTableDataSource<Salle>(this.Salle_DATA);
  newSalle!: Salle;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private salleService: SalleService,private _snackBar: MatSnackBar) {}

  ngOnInit() {
    this.getAllSalles();
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

  addSalle() {
    this.salleService.createSalle(this.newSalle).subscribe(
      response => {
        console.log('Salle added successfully', response);
        this.getAllSalles();
      },
      error => {
        console.error('There was an error!', error);
      }
    );
  }

  getAllSalles() {
    this.salleService.getSalles().subscribe(salles => {
      this.Salle_DATA = salles;
      this.dataSource.data = this.Salle_DATA;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddSallePopupComponent, {
      width: '470px',
    });
    dialogRef.afterClosed().subscribe(async result => {
      await this.getAllSalles();
      console.log('The dialog was closed', result);
    });
  }

  openEditDialog(salle: Salle): void {
    const dialogRef = this.dialog.open(UpdateSalleComponent, {
      width: '400px',
      data: salle
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAllSalles();
      }
    });
  }




  
  deleteSalle(salleId: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: { message: 'Êtes-vous sûr de vouloir supprimer cet salle?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Confirmed');
        this.salleService.deleteSalle(salleId).subscribe(
          response => {
            console.log('Salle deleted successfully', response);
            this._snackBar.open('Salle supprimé avec succès.', 'OK', {
              duration: 4000,
              horizontalPosition: 'right',
              verticalPosition: 'bottom',
            });
            this.getAllSalles();
          },
          error => {
            this._snackBar.open('Erreur lors de la suppression de l\'salle.', 'OK', {
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
