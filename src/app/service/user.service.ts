import { Injectable } from '@angular/core';
import {UserModel} from '../model/user.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor() {}


  private static userKey:'userDetails';

  protected static userSubject = new BehaviorSubject<UserModel | null>(null);
  public static userModel$ = UserService.userSubject.asObservable();


  public static setUser(userModel:UserModel | null) {
    this.userSubject.next(userModel);
    localStorage.setItem(this.userKey, JSON.stringify(userModel));
  }

  public static getUser(): UserModel | null {
    const userData = localStorage.getItem(this.userKey);
    const userModel:(UserModel|null) = (userData?JSON.parse(userData):null);

    this.userSubject.next(userModel);
    return userModel;
  }

  public static clearUser() {
    this.userSubject.next(null);
    localStorage.removeItem(this.userKey);
  }
}



