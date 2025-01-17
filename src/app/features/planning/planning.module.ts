import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanningRoutes } from './planning.routing';
import { PlanningComponent } from './planning.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TimelineComponent } from './timeline/timeline.component';
import { ReservationPopupComponent } from './rendezvous-popup/resevation-popup.component';
import { MatButtonModule } from '@angular/material/button';



import { MatDialogModule } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatChipsModule } from '@angular/material/chips';
import { MatChipListbox } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar'
import { On_event_clickComponent } from './on_event_click/on_event_click.component';



@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    PlanningRoutes,
    HttpClientModule,

    MatButtonModule,
    MatDialogModule,
    MatListModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule, MatChipListbox,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    MatIconModule,
    MatSnackBarModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
  ],
  declarations: [PlanningComponent, TimelineComponent, ReservationPopupComponent,On_event_clickComponent]
})
export class PlanningModule { }













