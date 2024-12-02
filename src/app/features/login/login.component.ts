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
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NavigateToComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public user:UserLoginDTO = {
    login: null,
    password: null
  };
  
  public warmText:string = '';
  private router = inject(Router);



  constructor() {}


  async tryAuthenticate(userLoginDTO:UserLoginDTO):Promise<void> {
    const response:Response|null = await ServerService.fetch(
      'api/user/authenticate',
      'POST',
      userLoginDTO
    );
    
    if(response == null)
      this.warmText = "*Problemas de conexão."
    else if (!response.ok)
      this.warmText = "*Usuário ou senha incorretos."
    else {
      const userModel:UserModel|null = await ServerService.aboutMe();
      console.log("userModel", userModel)
      UserService.setUser(userModel);
      AppService.navigateTo('/')
    }
  }

  changeVisibility(input:any, button:Element) {
    if(input.type == 'text'){
      input.type = 'password';
      button.innerHTML = 'visibility';
    } else {
      input.type = 'text';
      button.innerHTML = 'visibility_off';
    }
  }
  
  onSubmit(form: Form) {
    this.tryAuthenticate(this.user);
  }
}



interface UserLoginDTO {
  login:string|null,
  password:string|null
}