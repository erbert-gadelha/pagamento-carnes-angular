import { Component, OnInit } from '@angular/core';

import { RouterModule, Router } from '@angular/router';
import { inject } from '@angular/core';
import { NavigateToComponent } from "../navigate-to/navigate-to.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NavigateToComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  private scroll: any;
  private root: any;


  private router = inject(Router);

  constructor() {
    this.scroll = {
      last: 0,
      delta: 0,
      height: 64,
      clamp: 8-64
    };
  }

  _clamp(min: number, value: number, max: number) {
    return Math.min(Math.max(value, min), max);
  };
  _getRoot() {
    this.root = document?.querySelector(':root');
  };


  handleScroll(event: Event) {
    const diff = this.scroll.last - window.scrollY;  
    if(((diff > 0) && this.scroll.delta == 0) || ((diff < 0) && this.scroll.delta == this.scroll.clamp)) {
      this.scroll.last = window.scrollY;
        return;      
    }    
    this.scroll.delta = this._clamp (this.scroll.clamp, this.scroll.delta + diff, 0);
    this.scroll.last = window.scrollY;  
    
    this.root.style.setProperty('--navbar-delta', `${this.scroll.delta}px`);
    if(this.scroll.last-window.scrollY < 0 || this.scroll.delta == this.scroll.clamp) {
      this.root.style.setProperty('--navbar-opacity', 1);
    } else {
      const ratio = this.scroll.delta/this.scroll.height;
      this.root.style.setProperty('--navbar-opacity', 1+(2*ratio/3));
    }
  };

  ngOnInit(): void {
    this._getRoot();
    document.addEventListener("scroll", event => this.handleScroll(event));

    const loginLink = document.querySelector("#login-link");
    loginLink?.addEventListener("click", (event) => {
      event.preventDefault();
      this.router.navigate(["/entrar"]);

    })
  }

}