import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

import { Form, FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { UserService } from '../../service/user.service';
import { UserModel, USER } from '../../model/user.model';
import { ServerService } from '../../service/server.service';
import { AppService } from '../../service/app.service';
import { NavigateToComponent } from "../../shared/navigate-to/navigate-to.component";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, NavigateToComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  public user:UserRegisterDTO = {
    name: null,
    login: null,
    password: null,
    pw_confirmation: null
  };
  
  public nameWarm:string = '';
  public loginWarm:string = '';
  public passwordWarm:string = '';

  private router = inject(Router);



  constructor() {}


  async tryAuthenticate(userRegisterDTO:UserRegisterDTO):Promise<void> {
    const response:Response|null = await ServerService.fetch(
      'api/user/authenticate',
      'POST',
      userRegisterDTO
    );
    
    if(response == null)
      return;
    else if (!response.ok)
      return;
    else {
      const userModel:UserModel|null = await ServerService.aboutMe();
      console.log("userModel", userModel)
      UserService.setUser(userModel);
      AppService.navigateTo('/');
    }
  }


  onSubmit(form: Form) {
    /* nameWarm
     * loginWarm
     * passwordWarm
     */

    let isValid:boolean = true;


    if(!this.user.name || this.user.name?.length < 3) {
      isValid = false;
      this.nameWarm = "* deve conter no mínimo 3 caracteres.";
    } else {
      this.nameWarm = "";
    }

    if(!this.user.login || this.user.login?.length < 3) {
      isValid = false;
      this.loginWarm = "* deve conter no mínimo 3 caracteres.";
    } else if(true) {
      isValid = false;
      this.loginWarm = "* não pode conter caracteres especiais.";
    } else {
      this.loginWarm = "";
    }

    if(!this.user.password || this.user.password?.length < 4) {
      isValid = false;
      this.passwordWarm = "* sua senha deve conter no mínimo 4 caracteres.";
    } else if (!this.user.pw_confirmation || this.user.pw_confirmation != this.user.password) {
      isValid = false;
      this.passwordWarm = "* as senhas devem coincidir";
    } else {
      this.passwordWarm = "";
    }

    /*if(!this.user.name || this.user.name?.length < 3) {
      isValid = false;
      this.nameWarm = "* deve conter no mínimo 3 caracteres.";
    }*/

    if(isValid) {
      //this.tryAuthenticate(this.user);
    }
  }
  
}

interface UserRegisterDTO {
  name:string|null,
  login:string|null,
  password:string|null,
  pw_confirmation:string|null
}