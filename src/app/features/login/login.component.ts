import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

import { Form, FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { UserService } from '../../service/user.service';
import { UserModel, USER } from '../../model/user.model';
import { ServerService } from '../../service/server.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public user:UserLoginDTO = {
    login: null,
    password: null
  };
  
  public loginWarn:string = '';
  private router = inject(Router);



  constructor() {}


  async tryAuthenticate(userLoginDTO:UserLoginDTO):Promise<void> {
    const response:Response|null = await ServerService.fetch(
      'api/user/authenticate',
      'POST',
      userLoginDTO
    );
    
    if(response == null)
      this.loginWarn = "*Problemas de conexão."
    else if (!response.ok)
      this.loginWarn = "*Usuário ou senha incorretos."
    else {
      UserService.setUser(await ServerService.aboutMe());
      this.router.navigate(["/pagamento-carnes-angular"]);
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