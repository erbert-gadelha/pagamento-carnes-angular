import { Component, OnInit } from '@angular/core';
import { NavigateToComponent } from "../../shared/navigate-to/navigate-to.component";
import { UserService } from '../../service/user.service';
import { UserModel } from '../../model/user.model';
import { CommonModule, NgFor, NgIf, NgTemplateOutlet, isPlatformBrowser } from '@angular/common'; // Importação necessária para *ngFor e *ngIf


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavigateToComponent, NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  public user:UserModel|null = null;

  constructor() { }  

  ngOnInit() {
    UserService.userModel$.subscribe((userModel:UserModel|null) => { this.user = userModel; });
  }

}
