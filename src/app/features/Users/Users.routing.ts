import { Routes, RouterModule } from '@angular/router';
import { UsersManagementComponent } from './users-management/users-management.component';

// Définition des routes spécifiques au module des utilisateurs
const routes: Routes = [
  { path: '', component: UsersManagementComponent }, // Route par défaut pointant vers UsersManagementComponent
];

// Export des routes configurées avec RouterModule.forChild
export const UsersRoutes = RouterModule.forChild(routes);
