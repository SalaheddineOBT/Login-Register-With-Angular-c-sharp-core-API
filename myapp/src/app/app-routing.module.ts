import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
    {
        path : 'login',
        component : LoginComponent
    },{
        path : 'register',
        component : RegisterComponent
    },{
        path : 'home',
        component : HomeComponent
    },{
        path : '',
        redirectTo : '/login',
        pathMatch : 'full'
    },{
        path : '**',
        component : PagenotfoundComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
    PagenotfoundComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent
]