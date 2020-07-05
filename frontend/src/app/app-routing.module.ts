import { NgModule } from '@angular/core';    
import { Routes, RouterModule } from '@angular/router';    
import { DashboardComponent } from './dashboard/dashboard.component';    
import { LoginComponent } from './login/login.component';    
import { RegisterComponent } from './register/register.component';    
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
    
export const routes: Routes = [    
  {    
    path: '',    
    redirectTo: 'login',    
    pathMatch: 'full',    
  },    
  {    
    path: 'login',    
    component: LoginComponent,    
    data: {    
      title: 'Login Page'    
    }    
  },
  {    
    path: 'forgotpassword',    
    component: ForgotpasswordComponent,    
    data: {    
      title: 'Forgotpassword Page'    
    }    
  },
  {    
    path: 'dashboard',    
    component: DashboardComponent,    
    data: {    
      title: 'Dashboard Page'    
    }    
  },    
  {    
    path: 'register',    
    component: RegisterComponent,    
    data: {    
      title: 'Register Page'    
    }    
  },    
];    
    
@NgModule({    
  imports: [RouterModule.forRoot(routes)],    
  exports: [RouterModule]    
})    
export class AppRoutingModule { } 