import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent {

  // Constructeur du composant
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string } // Injection de données dans la boîte de dialogue
  ) {}

  // Fonction appelée lorsque l'utilisateur confirme l'action
  onConfirmClick(): void {
    this.dialogRef.close(true); // Ferme la boîte de dialogue et renvoie 'true'
  }

  // Fonction appelée lorsque l'utilisateur annule l'action
  onCancelClick(): void {
    this.dialogRef.close(false); // Ferme la boîte de dialogue et renvoie 'false'
  }
}
