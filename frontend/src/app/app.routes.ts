import { Routes } from '@angular/router';
import { FullComponent } from './layout/full-component/full-component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'dashboard',
    component: FullComponent,
    loadChildren: () =>
      import('./layout/main.routes').then(m => m.routes)
  },

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: '**',
    redirectTo: 'login'
  }
];
