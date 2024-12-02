import { Component, inject, Input, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../service/app.service';
import { environment } from '../../../environments/environment';

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

  public relativePath:string|null = environment.relativePath;

  constructor() {
    AppService.router = this.router;
  }


  ngAfterViewInit(): void {
    this.myNavigateTo.nativeElement.addEventListener("click", (event:any) => {
      event.preventDefault();
      AppService.navigateTo(this.path);
    })

  }


}
