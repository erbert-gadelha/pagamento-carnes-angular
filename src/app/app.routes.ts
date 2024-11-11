import { Routes } from '@angular/router';
import { AppComponent } from "./app.component";
import { HomeComponent } from "./features/home/home.component";
import { LoginComponent } from "./features/login/login.component";
import { PaymentsComponent } from "./features/payments/payments.component";

export const routes: Routes = [
    {path: '', component: HomeComponent, pathMatch: 'full'},
    {path: 'entrar', component: LoginComponent, pathMatch: 'full'},
    {path: 'pagamentos', component: PaymentsComponent, pathMatch: 'full'}
];
