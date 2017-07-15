import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AuthGuard } from './login/auth.guard'; 
export const routes: Routes = [
  { path: '', loadChildren: './login/login.module#LoginModule'},
  { path: '', redirectTo: 'pages', pathMatch: 'full', canActivate: [AuthGuard]},
  // { path: '', redirectTo: 'pages/login'}
  { path: '**', loadChildren: './login/login.module#LoginModule' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true,enableTracing: true });
