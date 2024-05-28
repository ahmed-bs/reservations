import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  updateForm!: FormGroup;
  selectedRole: number;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<UpdateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.selectedRole = data.role;
  }

  ngOnInit() {

    this.updateForm = this.fb.group({
      name: [this.data.name, Validators.required],
      email: [this.data.email, [Validators.required, Validators.email]],
      password: [this.data.password, Validators.required],
    });
    console.log(this.updateForm);
    
  }

  selectRole(role: number) {
    this.selectedRole = role;
  }

  onSave() {
    if (this.updateForm.valid) {
      const updatedUser = {
        ...this.data,
        ...this.updateForm.value,
        role: this.selectedRole
      };

      this.userService.updateUser(updatedUser, updatedUser.id).subscribe(
        response => {
          console.log('User updated successfully', response);
          this._snackBar.open('Utilisateur mis à jour avec succès.', 'OK', {
            duration: 4000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
          this.dialogRef.close(updatedUser);
        },
        error => {
          console.error('There was an error!', error);
          this._snackBar.open('Erreur lors de la mise à jour de l\'utilisateur.', 'OK', {
            duration: 4000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
        }
      );
    } else {
      this._snackBar.open('Le formulaire est invalide.', 'OK', {
        duration: 4000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
