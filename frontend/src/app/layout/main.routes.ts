import { Routes } from "@angular/router";
import { HomeComponent } from "../pages/home/home.component";
import { Home2 } from "../pages/home-2/home-2";
import { ActivityLogComponent } from "../pages/activity-log/activity-log.component";
import { ActivityLogViewComponent } from "../pages/activity-log/activity-log-view/activity-log-view.component";
import { ReportsComponent } from "../pages/reports/reports.component";
import { RoleManagementComponent } from "../pages/role-management/role-management.component";
import { UserManagementComponent } from "../pages/user-management/user-management.component";
import { SuspectListComponent } from "../pages/suspect-list/suspect-list.component";
import { SuspectAddComponent } from "../pages/suspect-list/suspect-add/suspect-add.component";
import { SuspectViewComponent } from "../pages/suspect-list/suspect-view/suspect-view";
import { SuspectUpdateComponent } from "../pages/suspect-list/suspect-update/suspect-update.component";


export const routes: Routes = [
    
{
    path: 'home',
    component: HomeComponent
  },

  {
    path: 'home2',
    component: Home2
  },

  {
    path: 'activity-log',
    component: ActivityLogComponent
  },

  {
    path: 'activity-log/:id',
    component: ActivityLogViewComponent
  },

  {
    path: 'reports',
    component: ReportsComponent
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
    path: 'suspect/:id',
    component: SuspectViewComponent
  },

  {
    path: 'suspect-update/:id',
    component: SuspectUpdateComponent
  },

  {
    path: '**',
    redirectTo: 'login'
  }
]