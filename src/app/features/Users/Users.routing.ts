import { Routes, RouterModule } from '@angular/router';
import { UsersManagementComponent } from './users-management/users-management.component';

const routes: Routes = [
  { path: '', component: UsersManagementComponent },
];

export const UsersRoutes = RouterModule.forChild(routes);
