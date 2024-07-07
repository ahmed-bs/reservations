import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Salle } from 'src/app/core/models/salle'; // Import du modèle de salle
import { SalleService } from 'src/app/core/services/salle.service'; // Import du service de gestion des salles
import { AddSallePopupComponent } from '../add-salle-popup/add-salle-popup.component'; // Composant de dialogue pour l'ajout de salle
import { UpdateSalleComponent } from '../update-salle/update-salle.component'; // Composant de dialogue pour la mise à jour de salle
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component'; // Composant de dialogue de confirmation générique

@Component({
  selector: 'app-salle-managment',
  templateUrl: './salle-managment.component.html',
  styleUrls: ['./salle-managment.component.css']
})
export class SalleManagmentComponent implements OnInit {
  Salle_DATA: Salle[] = []; // Tableau de données des salles
  displayedColumns: string[] = ['name', 'email', 'actions']; // Colonnes affichées dans le tableau
  dataSource = new MatTableDataSource<Salle>(this.Salle_DATA); // Source de données pour le tableau avec les données des salles
  newSalle!: Salle; // Nouvelle salle à ajouter

  @ViewChild(MatPaginator) paginator!: MatPaginator; // Pagination du tableau
  @ViewChild(MatSort) sort!: MatSort; // Tri du tableau

  constructor(
    public dialog: MatDialog,
    private salleService: SalleService, // Service pour gérer les opérations sur les salles
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getAllSalles(); // Charge toutes les salles au démarrage du composant
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator; // Initialise la pagination après l'initialisation de la vue
    this.dataSource.sort = this.sort; // Initialise le tri après l'initialisation de la vue
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value; // Récupère la valeur du filtre
    this.dataSource.filter = filterValue.trim().toLowerCase(); // Applique le filtre en convertissant en minuscules

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage(); // Recharge la première page après application du filtre
    }
  }

  addSalle() {
    this.salleService.createSalle(this.newSalle).subscribe(
      response => {
        console.log('Salle added successfully', response);
        this.getAllSalles(); // Recharge la liste des salles après l'ajout
      },
      error => {
        console.error('There was an error!', error);
      }
    );
  }

  getAllSalles() {
    this.salleService.getSalles().subscribe(salles => {
      this.Salle_DATA = salles; // Met à jour les données des salles
      this.dataSource.data = this.Salle_DATA; // Met à jour la source de données du tableau
      this.dataSource.paginator = this.paginator; // Met à jour la pagination
      this.dataSource.sort = this.sort; // Met à jour le tri
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddSallePopupComponent, {
      width: '470px', // Largeur du dialogue pour ajouter une salle
    });
    dialogRef.afterClosed().subscribe(async result => {
      await this.getAllSalles(); // Recharge les salles après la fermeture du dialogue
      console.log('The dialog was closed', result);
    });
  }

  openEditDialog(salle: Salle): void {
    const dialogRef = this.dialog.open(UpdateSalleComponent, {
      width: '400px', // Largeur du dialogue pour mettre à jour une salle
      data: salle // Données à passer au dialogue de mise à jour
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAllSalles(); // Recharge les salles après la mise à jour
      }
    });
  }

  deleteSalle(salleId: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px', // Largeur du dialogue de confirmation
      data: { message: 'Êtes-vous sûr de vouloir supprimer cette salle?' } // Message de confirmation
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Confirmed');
        this.salleService.deleteSalle(salleId).subscribe(
          response => {
            console.log('Salle deleted successfully', response);
            this._snackBar.open('Salle supprimée avec succès.', 'OK', {
              duration: 4000,
              horizontalPosition: 'right',
              verticalPosition: 'bottom',
            });
            this.getAllSalles(); // Recharge les salles après la suppression
          },
          error => {
            this._snackBar.open('Erreur lors de la suppression de la salle.', 'OK', {
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
