import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
//  SHARED
import { HeaderComponent } from "./shared/header/header.component";
import { AssertConnectionComponent } from "./shared/assert-connection/assert-connection.component";
import { UserModel } from './model/user.model';
import { ServerService } from './service/server.service';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, AssertConnectionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pagamento-carnes-angular';
}

