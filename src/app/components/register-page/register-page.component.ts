import { Component } from '@angular/core';
import { AccountsService } from '../../services/accounts.service';
import { User } from '../../types/user.type';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss',
})
export class RegisterPageComponent {
  user: User = {
    email: '',
    login: '',
    password: '',
    passwordC: '',
  };
  dataDB = {
    email: '',
    login: '',
  };
  loginAndEmailFailed: boolean = false;
  passwordMatch = false;
  showLoadingBar = false;
  constructor(
    private accountService: AccountsService,
    private router: Router,
    private auth: AuthService
  ) {
    this.accountService.getData().subscribe((data) => {
      this.dataDB = data;
      console.log('dataBASE', this.dataDB);
    });
  }

  async register() {
    const emailExists = Object.values(this.dataDB).some(
      (item: any) => item.email === this.user.email
    );
    const loginExists = Object.values(this.dataDB).some(
      (item: any) => item.login === this.user.login
    );

    if (emailExists || loginExists) {
      this.loginAndEmailFailed = true;
    } else if (!this.passwordMatch) {
      console.log('Hasla sie nie zgadzaja!');
    } else {
      this.loginAndEmailFailed = false
      this.passwordMatch = true;
      this.accountService.addAccountToDB(this.user);
      this.auth.register(this.user.email, this.user.password);
      this.showLoadingBar = true;
      setTimeout(() => {
        this.router.navigate(['/Login-Page']);
      }, 3000);
    }
  }
  checkPassword() {
    this.passwordMatch = this.user.password == this.user.passwordC;
  }

  


}
