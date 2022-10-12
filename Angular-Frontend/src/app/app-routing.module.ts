import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserCreateComponent } from './components/user-create/user-create.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {
    path:'',pathMatch:'full',redirectTo:'/user-list'
  },
  {
    path:'register',component: RegistrationComponent
  },
  {
    path:'login',component: LoginComponent
  },
  {
    path:'create-user', component: UserCreateComponent,
  },
  {
    path:'user-list', component: UserListComponent,
  },
  {
    path:'user-edit/:id', component: UserEditComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
