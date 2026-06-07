import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RoleManagementComponent } from './pages/role-management/role-management.component';
import { UserManagementComponent } from './pages/user-management/user-management.component';

import { SuspectListComponent } from './pages/suspect-list/suspect-list.component';
import { SuspectAddComponent } from './pages/suspect-list/suspect-add/suspect-add.component';
import { SuspectUpdateComponent } from './pages/suspect-list/suspect-update/suspect-update.component';
import { Home2 } from './pages/home-2/home-2';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'home',
    component: HomeComponent
  },

  {
    path: 'home2',
    component: Home2
  },

  {
    path: 'role-management',
    component: RoleManagementComponent
  },

  {
    path: 'user-management',
    component: UserManagementComponent
  },

  {
    path: 'suspect-list',
    component: SuspectListComponent
  },

  {
    path: 'suspect-add',
    component: SuspectAddComponent
  },

  {
    path: 'suspect-update/:id',
    component: SuspectUpdateComponent
  },

  {
    path: '**',
    redirectTo: 'login'
  }
];