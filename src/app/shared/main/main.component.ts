import { Component, OnInit ,Inject, ViewChild} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
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



  // constructor(public dialog: MatDialog) {}

  // openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.disableClose = true;
  //   dialogConfig.autoFocus = true;
  //   dialogConfig.width = "60%";
  //   this.dialog.open(RendezvousPopupComponent,dialogConfig);
  // }
}
