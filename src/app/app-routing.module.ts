import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './shared/Login/Login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { LayoutComponent } from './shared/layout/layout.component';
import { RoleGuard } from './core/guards/role.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    
    children: [
      { path: '',canActivate: [AuthGuard],  loadChildren: () => import('./features/planning/planning.module').then(m => m.PlanningModule) },
      { path: 'users-management', canActivate: [RoleGuard], loadChildren: () => import('./features/Users/Users.module').then(m => m.UsersModule) },
      { path: 'salle',canActivate: [RoleGuard],  loadChildren: () => import('./features/salle/salle.module').then(m => m.SalleModule) },
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'login' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
