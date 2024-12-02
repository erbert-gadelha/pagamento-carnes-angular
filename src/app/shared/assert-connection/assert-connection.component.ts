import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { environment } from '../../../environments/environment';
import { UserModel } from '../../model/user.model';
import { UserService } from '../../service/user.service';
import { ServerService } from '../../service/server.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-assert-connection',
  standalone: true,
  imports: [],
  templateUrl: './assert-connection.component.html',
  styleUrl: './assert-connection.component.css'
})
export class AssertConnectionComponent implements OnInit {

  @ViewChild('serverStatus') serverStatus: ElementRef | any;
  @ViewChild('myAssertConnection') myAssertConnection: ElementRef | any;
  public attempts:string|any;

  constructor(private httpClient: HttpClient) {
    ServerService.setHttpClient(httpClient);
  }


  private async _fetchUser() {
    const savedInfo:UserModel|null = UserService.getUser();
    UserService.setUser(savedInfo);

    const fetchedInfo:UserModel|null = await ServerService.aboutMe();
    if(savedInfo?.id != fetchedInfo?.id)
      UserService.setUser(fetchedInfo);
  }

  ngOnInit(): void {
    const delayMilliseconds:number = 2000;
    const limit:number = 10;
    let attempt:number = 0;

    const fetchServer = async () => {
      this.attempts = `${++attempt}/${limit}`;
      let response: Response|null= null;

      try {  
        response = await ServerService.fetch('status', 'GET', null);
      } catch(e:any) {
        // do nothing
      }

      if(response?.status == 200) {
        this.serverStatus.nativeElement.className = "accept";
        this.myAssertConnection.nativeElement.classList.remove("fade-in");
        this._fetchUser();

        setTimeout(() => {
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
      this.serverStatus.nativeElement.className = "loading";
      attempt = 0;
      fetchServer();
    });
    
  }
}
