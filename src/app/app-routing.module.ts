import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './board-admin/add-user/add-user.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { DetailsUserComponent } from './board-admin/details-user/details-user.component';
import { UpdateUserComponent } from './board-admin/update-user/update-user.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { ChangePasswordComponent } from './board-user/change-password/change-password.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'user', component: BoardUserComponent },
  { path: 'mod', component: BoardModeratorComponent },
  { path: 'admin', component: BoardAdminComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'details-user/:id', component: DetailsUserComponent },
  { path: 'update-user/:id', component: UpdateUserComponent },
  { path: 'add-user', component: AddUserComponent },
   {path: 'change-password/:id', component: ChangePasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
