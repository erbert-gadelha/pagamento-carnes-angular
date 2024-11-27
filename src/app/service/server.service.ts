import { Injectable } from '@angular/core';
import {UserModel} from '../model/user.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ServerService {

  constructor() {}

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
  }


  public static async aboutMe(): Promise<UserModel|null> {
    const response:Response|null = await ServerService.fetch('me','GET',null);
    if(response == null || !response.ok){
        console.error("Erro", response?.status);
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



