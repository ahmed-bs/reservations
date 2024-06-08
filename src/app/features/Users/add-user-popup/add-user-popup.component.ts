import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-add-user-popup',
  templateUrl: './add-user-popup.component.html',
  styleUrls: ['./add-user-popup.component.css']
})
export class AddUserPopupComponent implements OnInit {
  selectedRole!: string;
  eventForm!: FormGroup;

  constructor(
    private _snackBar: MatSnackBar,
    private userService: UserService,
    private dialogRef: MatDialogRef<AddUserPopupComponent>,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.eventForm = this.fb.group({
      name: ['', Validators.required],
      role: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });

    this.eventForm.controls['role'].setValue(this.selectedRole);
  }

  selectRole(role: string): void {
    this.selectedRole = '';
    this.eventForm.patchValue({ role });
    this.eventForm.controls['role'].setValue(role);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    console.log(this.eventForm);
    if (this.eventForm.valid) {
      const formValue = this.eventForm.value;
      console.log(formValue);

      const user: User = {
     
        name: formValue.name,
        email: formValue.email,
        password: formValue.password,
        role: formValue.role,
      };

      this.userService.createUser(user).subscribe({
        next: (response) => {
          console.log('Utilisateur créé avec succès:', response);
          this._snackBar.open('Utilisateur créé avec succès', 'OK', {
            duration: 4000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
          this.dialogRef.close(this.eventForm.value);
        },
        error: (error) => {
          this._snackBar.open('Erreur lors de la création de l\'utilisateur', 'OK', {
            duration: 4000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
          console.error('Erreur lors de la création de l\'utilisateur:', error);
        }
      });
    } else {
      this._snackBar.open('Le formulaire est invalide', 'OK', {
        duration: 4000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
      });
      console.warn('Le formulaire est invalide');
    }
  }
}
