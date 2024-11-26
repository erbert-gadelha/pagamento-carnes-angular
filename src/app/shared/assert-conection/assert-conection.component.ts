import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-assert-conection',
  standalone: true,
  imports: [],
  templateUrl: './assert-conection.component.html',
  styleUrl: './assert-conection.component.css'
})
export class AssertConectionComponent implements AfterViewInit {

  @ViewChild('serverStatus') serverStatus: ElementRef | any;
  @ViewChild('myAssertConnection') myAssertConnection: ElementRef | any;
  public attempts:string|any;

  ngAfterViewInit(): void {
    const delayMilliseconds:number = 2000;
    const limit:number = 10;
    let attempt:number = 0;


    const request = new Request(
      `${environment.apiUrl}status`, {
        method: "GET"
      }
    );

    const fetchServer = async () => {
      this.attempts = `${++attempt}/${limit}`;
      let response: Response|null= null;

      try {  
        response = await fetch(request);
      } catch(e:any) {
        // do nothing
      }


      if(response?.status == 200) {
        this.serverStatus.nativeElement.className = "accept";


        setTimeout(() => {
          this.myAssertConnection.nativeElement.classList.remove("fade-in");
          this.myAssertConnection.nativeElement.classList.add("fade-out");
          

        }, 2000)
      } else if(attempt >= limit) {
        this.serverStatus.nativeElement.className = "give-up";
        console.error("I give up.");
      } else {
        this.myAssertConnection.nativeElement.classList.add("fade-in");
        setTimeout(fetchServer, delayMilliseconds)
      };

    };

    fetchServer();

    this.serverStatus.nativeElement.addEventListener('click', (event:PointerEvent) => {
      event.preventDefault();
      attempt = 0;
      this.serverStatus.nativeElement.className = "loading";

      fetchServer();
    });
    
  }
}
