import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AuthGuard } from './pages/login/auth.guard'; 
export const routes: Routes = [
  { path: '', loadChildren: 'app/pages/login/login.module#LoginModule'},
  { path: '', redirectTo: 'pages', pathMatch: 'full', canActivate: [AuthGuard]},
  // { path: '', redirectTo: 'pages/login'}
  { path: '**', loadChildren: 'app/pages/login/login.module#LoginModule' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true });
