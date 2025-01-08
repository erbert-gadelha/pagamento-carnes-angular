import { Routes } from '@angular/router';
import { AppComponent } from "./app.component";
import { HomeComponent } from "./features/home/home.component";
import { LoginComponent } from "./features/login/login.component";
import { PaymentsComponent } from "./features/payments/payments.component";
import { RegisterComponent } from './features/register/register.component';
import { ForumComponent } from './features/forum/forum.component';

export const routes: Routes = [
    {path: '', component: HomeComponent, pathMatch: 'full'},
    {path: 'entrar', component: LoginComponent, pathMatch: 'prefix'},
    {path: 'registrar', component: RegisterComponent, pathMatch: 'prefix'},
    {path: 'pagamentos', component: PaymentsComponent, pathMatch: 'prefix'},
    {path: 'forum', component: ForumComponent, pathMatch: 'prefix'}
];
