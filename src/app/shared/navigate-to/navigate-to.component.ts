import { Component, inject, Input, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigate-to',
  standalone: true,
  imports: [],
  templateUrl: './navigate-to.component.html',
  styleUrl: './navigate-to.component.css',
})
export class NavigateToComponent  implements AfterViewInit {

  constructor() { }

  @Input() public path: string = '/';
  @ViewChild('myNavigateTo') myNavigateTo: ElementRef | any;
  private router = inject(Router);

  ngAfterViewInit(): void {
    this.myNavigateTo.nativeElement.addEventListener("click", (event:any) => {
      event.preventDefault();
      console.log("wasd");
      window.scrollTo({ top: 0, behavior: 'instant' })
      this.router.navigate([this.path]);
    })

  }


}
