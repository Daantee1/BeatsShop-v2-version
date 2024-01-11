import { Component } from '@angular/core';
import { AccountsService } from '../../services/accounts.service';
import { AuthService } from '../../services/auth.service';
import { initFlowbite } from 'flowbite';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

    loggedIn = false
    currentUser: any = []

  constructor(private auth: AuthService, private accountService: AccountsService){
   
    this.auth.loggedIn.subscribe((info)=>{
      this.loggedIn = info
     
    })
   this.accountService.getUserLoggedDetailsObs().subscribe((data)=>{
     this.currentUser = data
     
   })
   
}

  

}
