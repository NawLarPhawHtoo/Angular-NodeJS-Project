import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserCreateComponent } from './components/user-create/user-create.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';

const routes: Routes = [
  {
    path:'',pathMatch:'full',redirectTo:'/user-list'
  },
  {
    path:'signup',component: SignupComponent
  },
  {
    path:'login',component: LoginComponent
  },
  {
    path:'user-create', component: UserCreateComponent,
  },
  {
    path:'user-list', component: UserListComponent,
  },
  {
    path:'user-edit/:id', component: UserEditComponent,
  },
  {
    path:'user-details/:id', component: UserDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
