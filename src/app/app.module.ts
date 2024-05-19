import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { HeaderComponent } from './shared/header/header.component';
import { MainComponent } from './shared/main/main.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogTitle } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatChipsModule } from '@angular/material/chips';
import { MatChipListbox } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import {MatMenuTrigger, MatMenuModule} from '@angular/material/menu';
import { RendezvousPopupComponent } from './shared/rendezvous-popup/rendezvous-popup.component';
import { HttpClientModule } from '@angular/common/http';
@NgModule({

  imports: [ MatDialogModule,
    BrowserModule,
    CommonModule, 
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,

    MatMenuTrigger,
    MatMenuModule,
    MatButtonModule,
     MatInputModule,
    MatListModule,
    MatChipListbox,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    MatIconModule,
    MatFormFieldModule,
    
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
  ],
  declarations: [
    AppComponent,SidebarComponent,HeaderComponent,MainComponent,RendezvousPopupComponent
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
