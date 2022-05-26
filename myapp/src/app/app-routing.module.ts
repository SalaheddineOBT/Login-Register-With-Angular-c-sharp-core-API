import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';
import { RegisterComponent } from './pages/register/register.component';

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