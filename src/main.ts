import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

/*var ngModule = angular.module('app', []);
ngModule.constant('config', {
  apiUrl: 'https://your-api.com',
  baseUrl: '/',
  enableDebug: true
});*/

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
