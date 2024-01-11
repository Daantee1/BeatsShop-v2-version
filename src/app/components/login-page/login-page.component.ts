import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AccountsService } from '../../services/accounts.service';
import * as bcrypt from 'bcrypt';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {

  constructor(private auth: AuthService, private router : Router, private accountservice: AccountsService){}


  user: any= {
    email: '',
    password: ''
  }
  checkIsCorrect: boolean  = false

   logIn() {
    
    const valid = this.accountservice.getDataForLogin(this.user.email, this.user.password)
    const result =  this.auth.logIn(this.user.email, this.user.password);
  
  }
}

