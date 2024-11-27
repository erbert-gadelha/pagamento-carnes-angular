import { Injectable } from '@angular/core';
import {UserModel} from '../model/user.model';
import { environment } from '../../environments/environment';

import {HttpClient, HttpHandler} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ServerService {

  private static http:HttpClient|null = null;
  private static axios = require('axios').default;

  constructor() {}

  public static setHttpClient(httpClient:HttpClient) {
    ServerService.http = httpClient;
  }

  public static async fetch(path:string, method:'GET'|'POST'|'PUT'|'DELETE'|'PATCH',body:Object|null): Promise <Response|null> {
    const request = (method == 'GET')?
        new Request(
            environment.apiUrl+path,
            {
                method: method,
                credentials: 'include',
                headers: { "Content-Type": "application/json" }
            }
        ):new Request(
            environment.apiUrl+path,
            {
                method: method,
                credentials: 'include',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body) 
            }
      );


    
      
    let result:Response|null = null;
      
    await fetch(request)
        .then(async (response:Response) => {
            result = response;
        }).catch(error => {
            // do nothing
        });
    
    return result;
    
    
    
    /*let request:any = null;
    switch(method) {
      case 'GET': request = await ServerService.http?.get(environment.apiUrl+path, { withCredentials: true }); break;
      case 'POST': request = await ServerService.http?.post(environment.apiUrl+path, { withCredentials: true , body: body}); break;
      default: return null;
    }

    request.subscribe((response:any) => {
      console.log('Response:', response);
    }, (error:Error) => {
        console.error('Error de requicao', error.message);
    }, () => {
        console.log('Finally');      
    });
    
    return null;*/
  }


  public static async aboutMe(): Promise<UserModel|null> {
    const response:Response|null = await ServerService.fetch('me','GET',null);
    if(response == null || !response.ok){
        console.error("Erro", response);
        return null;
    }

    const userModel:UserModel|null = await response.json().then((data) => data);

    if(userModel?.id) {
      console.log(userModel)
      return userModel;
    }
    else
      return null;
  }

}



