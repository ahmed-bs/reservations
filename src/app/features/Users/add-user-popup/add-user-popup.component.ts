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

  selectedRole!: number ;

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
      email: ['', [Validators.required]],
    });

    this.eventForm.controls['role'].setValue(this.selectedRole);
  }
  selectRole(role: number): void {
    this.selectedRole = role;
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
      

      this.dialogRef.close(this.eventForm.value);
      const user: User = {
        id: 0,
        name: formValue.name ,
        email: formValue.email,
        password: formValue.password,
        role: formValue.role,
      };

      this.userService.createUser(user).subscribe({
        
        next: (response) => {
          console.log('User created successfully:', response);
          this._snackBar.open('User created successfully', 'OK', {
            duration: 4000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
          this.dialogRef.close(this.eventForm.value);
        },
        error: (error) => {
          this._snackBar.open('Error creating user', 'OK', {
            duration: 4000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
          console.error('Error creating user:', error);
        }
      });
    } else {
      this._snackBar.open('Form is invalid', 'OK', {
        duration: 4000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
      });
      console.warn('Form is invalid');
    }
  }


}
