import { Component, OnInit, Inject, PLATFORM_ID  } from '@angular/core';
import { CommonModule, NgFor, NgIf, NgTemplateOutlet, isPlatformBrowser } from '@angular/common'; // Importação necessária para *ngFor e *ngIf
import { ServerService } from '../../service/server.service';
import { UserModel } from '../../model/user.model';
import { UserService } from '../../service/user.service';
import { ok } from 'node:assert';
import { AppService } from '../../service/app.service';


@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.css'
})


export class PaymentsComponent implements OnInit {

  public user:UserModel|null = null;

  public paymentsInfo: PaymentsInfo = {
    name: "null",
    closed: null,
    open: null,
  };

  public loading: boolean = true;
  public fetchPromise: any= null;

  public response:PaymentDTO[] = [];
  public months:string[] = [
    'janeiro', 'fevereiro', 'março',    
    'abril', 'maio', 'junho',    
    'julho', 'agosto', 'setembro', 
    'outubro', 'novembro', 'dezembro', 
  ]


  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}


  async handleClick(month:number) {
    const year:number = 2024;
    const response:Response|null = await ServerService.fetch(`api/payment/create/${month}/${year}`, 'POST', null);
    if(response?.ok)
      this.fetchPromise = this._fetchPayments(5);
  }


  async _fetchPayments(fetchAttempts:number) {
    const response:Response|null = await ServerService.fetch('api/payment/all', 'GET', null);

    if(response?.ok) {
      const data = await response.json();
      
      data.forEach((dto:PaymentDTO) => {
        if(dto.closedAt)
          dto.closedAt = new Date(dto.closedAt).toLocaleString('pt-BR')
        this.response[dto.month] = dto;
      });

      this.paymentsInfo.closed =  data?.closed;
      this.paymentsInfo.open =  data?.open;
      this.loading = false;
      this.fetchPromise = null;
    } else if(response?.status == 403) {
      AppService.navigateTo('/entrar');
    } else {
      console.warn("Failed to fetch", response);


      if(fetchAttempts-- > 0) {
        this.fetchPromise = setTimeout(() => this._fetchPayments(fetchAttempts), 500);
        return;
      }

      console.warn("FailedToFetch: Número máximo de tentativas alcançado.");
      this.fetchPromise = null;
    }
  }

  ngOnInit() {
    UserService.userModel$.subscribe((userModel:UserModel|null) => { this.user = userModel; });
    if (isPlatformBrowser(this.platformId)) {
      const fetchAttempts = 20;
      this.fetchPromise = this._fetchPayments(fetchAttempts);
    }
    
  }

  ngOnDestroy() {
    if(this.fetchPromise)
      clearInterval(this.fetchPromise);
  }

}

interface PaymentsInfo {
  name:string | null;
  closed:number | null;
  open:number | null;
};

interface PaymentDTO {
  month: number,
  year: number,
  closedAt: string|null,
  pixUrl: string|null
};




/*const months_:month[] = [
  { month:0,  name: 'janeiro',    closedAt: null, pixUrl: null},
  { month:1,  name: 'fevereiro',  closedAt: null, pixUrl: null},
  { month:2,  name: 'março',      closedAt: null, pixUrl: null},
  { month:3,  name: 'abril',      closedAt: null, pixUrl: null},
  { month:4,  name: 'maio',       closedAt: null, pixUrl: null},
  { month:5,  name: 'junho',      closedAt: null, pixUrl: null},
  { month:6,  name: 'julho',      closedAt: null, pixUrl: null},
  { month:7,  name: 'agosto',     closedAt: null, pixUrl: null},
  { month:8,  name: 'setembro',   closedAt: null, pixUrl: null},
  { month:9,  name: 'outubro',    closedAt: null, pixUrl: null},
  { month:10, name: 'novembro',   closedAt: null, pixUrl: null},
  { month:11, name: 'dezembro',   closedAt: null, pixUrl: null},    
];*/