import { Component, OnInit, Inject, PLATFORM_ID  } from '@angular/core';
import { CommonModule, NgFor, NgIf, NgTemplateOutlet, isPlatformBrowser } from '@angular/common'; // Importação necessária para *ngFor e *ngIf
//import { console } from 'inspector';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.css'
})


export class PaymentsComponent implements OnInit {


  public user: userInfo = {
    name: "null",
    closed: 1,
    open: 2,
  };

  public loading: boolean = true;
  public months:month[] = months_

  /*public months:month[] = [
    { key:0,  name: 'janeiro',    closedAt: "25/03/2000", pixUrl: null},
    { key:1,  name: 'fevereiro',  closedAt: "25/03/2000", pixUrl: null},
    { key:2,  name: 'março',      closedAt: "25/03/2000", pixUrl: null},
    { key:3,  name: 'abril',      closedAt: "25/03/2000", pixUrl: null},
    { key:4,  name: 'maio',       closedAt: null,         pixUrl: "https://www.google.com"},
    { key:5,  name: 'junho',      closedAt: null,         pixUrl: null},
          
    { key:6,  name: 'julho',      closedAt: null,         pixUrl: null},
    { key:7,  name: 'agosto',     closedAt: null,         pixUrl: null},
    { key:8,  name: 'setembro',   closedAt: null,         pixUrl: null},
    { key:9,  name: 'outubro',    closedAt: null,         pixUrl: null},
    { key:10, name: 'novembro',   closedAt: null,         pixUrl: null},
    { key:11, name: 'dezembro',   closedAt: null,         pixUrl: null},
  ]*/

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}



  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {

      const funcao = async ()  => {
        
        const request = new Request(`${environment.apiUrl}/api/payments`, { method: "GET" });
        try {  
          const response = await fetch(request);
          console.log(response.status);
          const data = await response.json();
          console.log(data);
          this.months = data;
          this.loading = false;

        } catch(e:any) {
          console.log(e.message);
          setTimeout(funcao, 2000)
        }

      }

      funcao();

    }
    
  }

}

interface userInfo {
  name:string | null;
  closed:number | null;
  open:number | null;
}

interface month {
  key:number;
  name:string;
  closedAt:string | null;
  pixUrl:string | null;
}

const months_:month[] = [
  { key:0,  name: 'janeiro',    closedAt: null, pixUrl: null},
  { key:1,  name: 'fevereiro',  closedAt: null, pixUrl: null},
  { key:2,  name: 'março',      closedAt: null, pixUrl: null},
  { key:3,  name: 'abril',      closedAt: null, pixUrl: null},
  { key:4,  name: 'maio',       closedAt: null, pixUrl: null},
  { key:5,  name: 'junho',      closedAt: null, pixUrl: null},
        
  { key:6,  name: 'julho',      closedAt: null, pixUrl: null},
  { key:7,  name: 'agosto',     closedAt: null, pixUrl: null},
  { key:8,  name: 'setembro',   closedAt: null, pixUrl: null},
  { key:9,  name: 'outubro',    closedAt: null, pixUrl: null},
  { key:10, name: 'novembro',   closedAt: null, pixUrl: null},
  { key:11, name: 'dezembro',   closedAt: null, pixUrl: null},    
];