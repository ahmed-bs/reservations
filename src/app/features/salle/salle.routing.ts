import { Routes, RouterModule } from '@angular/router';
import { SalleManagmentComponent } from './salle-managment/salle-managment.component';

const routes: Routes = [
  { path: '', component: SalleManagmentComponent },
];


export const SalleRoutes = RouterModule.forChild(routes);
