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

  private delayMilliseconds:number = 2000;
  private maxAttempts:number = 4;

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
    this.fetchServer(0);    
  }

  public async fetchServer(attempt:any) {
    attempt+=1;

    if(attempt > this.maxAttempts) {
      this.serverStatus.nativeElement.className = "give-up";
      console.error("I give up.");
      return;
    }

    this.attempts = `${attempt}/${this.maxAttempts}`;
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
      setTimeout(() => { this.myAssertConnection.nativeElement.classList.add("fade-out"); }, 2000);
    } else {
      this.myAssertConnection.nativeElement?.classList.add("fade-in");
      setTimeout(()=>this.fetchServer(attempt), this.delayMilliseconds);
    };

  }

  public handleClick() {
    this.serverStatus.nativeElement.className = "loading";
    this.fetchServer(0);
  }
}
