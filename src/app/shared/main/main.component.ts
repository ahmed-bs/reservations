import { Component, OnInit ,Inject, ViewChild} from '@angular/core';
import { RendezvousPopupComponent } from '../rendezvous-popup/rendezvous-popup.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  ngOnInit(): void {
  }
  constructor(public dialog: MatDialog) {}

  openPopup(): void {
    const dialogRef = this.dialog.open(RendezvousPopupComponent);

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  animal!: string;
  name!: string;


  openDialog(): void {
    const dialogRef = this.dialog.open(RendezvousPopupComponent, {
      disableClose: true, // Prevent closing by clicking outside
      width: '400px', // Adjust width as needed
      panelClass: 'custom-dialog-container' // Custom class for additional styling
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
 

  // constructor(public dialog: MatDialog) {}

  // openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.disableClose = true;
  //   dialogConfig.autoFocus = true;
  //   dialogConfig.width = "60%";
  //   this.dialog.open(RendezvousPopupComponent,dialogConfig);
  // }
}
