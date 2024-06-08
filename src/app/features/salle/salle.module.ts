import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalleComponent } from './salle.component';
import { SalleRoutes } from './salle.routing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AddSallePopupComponent } from './add-salle-popup/add-salle-popup.component';
import { SalleManagmentComponent } from './salle-managment/salle-managment.component';
import { UpdateSalleComponent } from './update-salle/update-salle.component';
@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SalleRoutes,
    HttpClientModule,
    
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatButtonModule,
  ],
  declarations: [SalleComponent,AddSallePopupComponent,SalleManagmentComponent,UpdateSalleComponent]
})
export class SalleModule { }
