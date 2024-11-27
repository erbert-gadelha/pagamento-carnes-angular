import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AppService {

    public static router:Router|null = null;

    constructor(private r: Router) {
        AppService.router = r;
    }

    public static navigateTo(path: string): void {
      window.scrollTo({ top: 0, behavior: 'auto' });
      AppService.router?.navigate([path]);
    }

}



