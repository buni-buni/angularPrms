import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { AdminComponent } from './admin';
import { LoginComponent } from './login';
import { AuthGuard } from './_helpers';
import { Role } from './_models';
import { NewMemberComponent } from './newMember';
import { MemberDetailsComponent } from './memberDetails';
import { AssignTaskComponent } from './assignTask/assignTask.component';
import { MemberViewComponent } from './memberView/memberView.component';
import { MemberDetailsEditComponent } from './memberDetailsEdit/memberDetailsEdit.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin] }
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
      path: 'newMember',
      component: NewMemberComponent
    },

    {
      path: 'memberDetails',
      component: MemberDetailsComponent
    },
    {
      path:'assignTask',
      component: AssignTaskComponent
    },
    {
      path: 'memberView',
      component: MemberViewComponent
    },
    {
      path: 'memberDetailsEditComponent',
      component: MemberDetailsEditComponent
    },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
