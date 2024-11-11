import { Component, inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigate-to',
  standalone: true,
  imports: [],
  templateUrl: './navigate-to.component.html',
  styleUrl: './navigate-to.component.css',
})
export class NavigateToComponent implements OnInit{

  @Input() path: string = '/';
  private router = inject(Router);

  constructor() { }

  public handleClick() {
    window.scrollTo({ top: 0, behavior: 'instant' })
    this.router.navigate([this.path]);
  }

  ngOnInit(): void {
  }


}
