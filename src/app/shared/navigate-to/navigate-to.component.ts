import { Component, inject, Input, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../service/app.service';

@Component({
  selector: 'app-navigate-to',
  standalone: true,
  imports: [],
  templateUrl: './navigate-to.component.html',
  styleUrl: './navigate-to.component.css',
})
export class NavigateToComponent  implements AfterViewInit {

  @Input() public path: string = '/';
  @ViewChild('myNavigateTo') myNavigateTo: ElementRef | any;
  private router:Router = inject(Router);

  constructor() {
    AppService.router = this.router
  }


  ngAfterViewInit(): void {
    this.myNavigateTo.nativeElement.addEventListener("click", (event:any) => {
      event.preventDefault();
      AppService.navigateTo(this.path);
      /*window.scrollTo({ top: 0, behavior: 'instant' })
      this.router.navigate([this.path]);*/
    })

  }


}
