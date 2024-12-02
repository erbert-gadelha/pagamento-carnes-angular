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
  public userDTO:UserRegisterDTO = {
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


  async onSubmit(form: Form) {
    let isValid:boolean = true;

    if(!this.userDTO.name || this.userDTO.name?.length < 3) {
      isValid = false;
      this.nameWarm = "* deve conter no mínimo 3 caracteres.";
    } else {
      this.nameWarm = "";
    }

    if(!this.userDTO.login || this.userDTO.login?.length < 3) {
      isValid = false;
      this.loginWarm = "* deve conter no mínimo 3 caracteres.";
    } else {
      this.loginWarm = "";
    }

    if(!this.userDTO.password || this.userDTO.password?.length < 4) {
      isValid = false;
      this.passwordWarm = "* sua senha deve conter no mínimo 4 caracteres.";
    } else if (!this.userDTO.pw_confirmation || this.userDTO.pw_confirmation != this.userDTO.password) {
      isValid = false;
      this.passwordWarm = "* as senhas devem coincidir";
    } else {
      this.passwordWarm = "";
    }

    if(!isValid)
      return;
    
    const response:Response|null = await ServerService.fetch('api/user/create', 'POST', this.userDTO);
    if(response?.status == 400) {
      this.loginWarm = `* o login "${this.userDTO.login}" já está em uso.`;
      return;
    }
    if(response?.ok) {
      const authResponse:Response|null = await ServerService.fetch('api/user/authenticate', 'POST', this.userDTO);
      if(authResponse?.ok) {
        UserService.setUser(await ServerService.aboutMe());
        AppService.navigateTo('/');
      }
    }
    
  }
  
}

interface UserRegisterDTO {
  name:string|null,
  login:string|null,
  password:string|null,
  pw_confirmation:string|null
}