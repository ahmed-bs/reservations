import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './shared/Login/Login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { LayoutComponent } from './shared/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard], // Protect routes with AuthGuard
    children: [
      { path: '', loadChildren: () => import('./features/planning/planning.module').then(m => m.PlanningModule) },
      { path: 'users-management', loadChildren: () => import('./features/Users/Users.module').then(m => m.UsersModule) },
      // Add more routes here if needed
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'login' } // Redirect to login if no other route matches
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
