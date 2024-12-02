import { Component, OnInit } from '@angular/core';

import { RouterModule, Router } from '@angular/router';
import { inject } from '@angular/core';
import { NavigateToComponent } from "../navigate-to/navigate-to.component";
import { UserModel } from '../../model/user.model';
import { UserService } from '../../service/user.service';
import { NgIf, CommonModule } from '@angular/common';
import { ServerService } from '../../service/server.service';
import { AppService } from '../../service/app.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NavigateToComponent, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  private scroll: any;
  private root: any;

  public user:UserModel|null = null;


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


  async handleClick() {
    const response:Response|null = await ServerService.fetch('api/logout', 'DELETE', null);
    if(response!=null && response.ok) {
      UserService.clearUser();
      AppService.navigateTo('/')
      //window.location.replace("/");
    }
  }

  ngOnInit(): void {
    UserService.userModel$.subscribe((userModel:UserModel|null) => { this.user = userModel; });

    this._getRoot();
    document.addEventListener("scroll", event => this.handleScroll(event));
  }

}