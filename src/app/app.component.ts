import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
//  SHARED
import { HeaderComponent } from "./shared/header/header.component";
import { NavigateToComponent } from "./shared/navigate-to/navigate-to.component";
import { AssertConectionComponent } from "./shared/assert-conection/assert-conection.component";
//  FEATURES
import { HomeComponent } from "./features/home/home.component";
import { LoginComponent } from "./features/login/login.component";
import { PaymentsComponent } from "./features/payments/payments.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent, HeaderComponent, LoginComponent, NavigateToComponent, PaymentsComponent, AssertConectionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pagamento-carnes-angular';
}
