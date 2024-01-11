import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AccountsService } from '../../services/accounts.service';
import * as bcrypt from 'bcryptjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss'
})
export class SettingsPageComponent {
  
  user: any = {
    oldPassword: '',
    newPassword: '',
    newPasswordC: ''

  }
  currentUser : any
  passwordMatch: boolean = false

  constructor(private authService: AuthService, private accountService: AccountsService, private router: Router) {
    this.accountService.getUserLoggedDetailsObs().subscribe((data)=>{
      this.currentUser = data
      console.log(this.currentUser)
    })
  }

  changePassword(){
    if(this.user){
      const passwordUnHush = bcrypt.compareSync(this.user.oldPassword, this.currentUser.password)
      const passwordMatch = this.user.newPassword === this.user.newPasswordC
      if(passwordUnHush && passwordMatch){
        this.accountService.changePassword(this.currentUser.id, this.user.newPassword)
        
      }
      else{
        this.passwordMatch = true
        console.log('Hasła się nie zgadzają lub stare hasło jest nieprawidłowe')
      }
    }
    
  }
}
