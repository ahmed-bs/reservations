import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './shared/Login/Login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { LayoutComponent } from './shared/layout/layout.component';
import { RoleGuard } from './core/guards/role.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent, // Composant de mise en page principal
    children: [
      {
        path: '',
        canActivate: [AuthGuard], // Garde d'authentification pour protéger l'accès
        loadChildren: () => import('./features/planning/planning.module').then(m => m.PlanningModule) // Chargement du module de planification en lazy loading
      },
      {
        path: 'users-management',
        canActivate: [RoleGuard], // Garde de rôle pour protéger l'accès aux utilisateurs avec un rôle spécifique
        loadChildren: () => import('./features/Users/Users.module').then(m => m.UsersModule) // Chargement du module de gestion des utilisateurs en lazy loading
      },
      {
        path: 'salle',
        canActivate: [RoleGuard], // Garde de rôle pour protéger l'accès aux utilisateurs avec un rôle spécifique
        loadChildren: () => import('./features/salle/salle.module').then(m => m.SalleModule) // Chargement du module de gestion des salles en lazy loading
      },
    ]
  },
  { path: 'login', component: LoginComponent }, // Route pour le composant de connexion
  { path: '**', redirectTo: 'login' } // Redirection vers la page de connexion pour toutes les autres routes non définies
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Configuration du routeur pour utiliser les routes définies
  exports: [RouterModule] // Exportation du module de routage pour qu'il soit accessible dans toute l'application
})
export class AppRoutingModule { }
