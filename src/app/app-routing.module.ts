import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountingEmployeesComponent } from './components/accounting-employees/accounting-employees.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {path:"accounting", component:AccountingEmployeesComponent, canActivate: [AuthGuard]},
  {path:"login", component:LoginComponent},
  {path:"", redirectTo:"/login", pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
