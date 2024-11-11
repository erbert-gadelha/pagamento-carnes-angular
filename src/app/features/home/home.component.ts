import { Component, OnInit } from '@angular/core';
import { NavigateToComponent } from "../../shared/navigate-to/navigate-to.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavigateToComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  constructor() { }

  ngOnInit() {

  }

}
