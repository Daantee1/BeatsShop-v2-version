import { Component } from '@angular/core';
import { AccountsService } from '../../services/accounts.service';
import { User } from '../../types/user.type';

@Component({
  selector: 'app-dashborad',
  templateUrl: './dashborad.component.html',
  styleUrl: './dashborad.component.scss'
})
export class DashboradComponent {


  profileCard = true
  settingsCard = false
  addMusicCard = false
  myMusicCard = false
  userData: any = []
  bgPActive: boolean = true
  bgSActive: boolean = false
  bgAActive: boolean = false
  bgMActive: boolean = false
  

  constructor(private accountService: AccountsService){
    this.accountService.getUserLoggedDetailsObs().subscribe((data)=>{
      this.userData = data
      
    })
  }

  showProfile(){
    this.profileCard = true
    this.settingsCard = false
    this.addMusicCard = false
    this.myMusicCard = false
    this.bgPActive = true
    this.bgAActive = false
    this.bgMActive = false
    this.bgSActive = false
  }
  showSettings(){
    this.profileCard = false
    this.settingsCard = true
    this.addMusicCard = false
    this.myMusicCard = false
    this.bgPActive = false
    this.bgAActive = false
    this.bgMActive = false
    this.bgSActive = true
  }
  showAddMusic(){
    this.profileCard = false
    this.settingsCard = false
    this.addMusicCard = true
    this.myMusicCard = false
    this.bgPActive = false
    this.bgAActive = true
    this.bgMActive = false
    this.bgSActive = false
  }
  showMyMusic(){
    this.profileCard = false
    this.settingsCard = false
    this.addMusicCard = false
    this.myMusicCard = true
    this.bgPActive = false
    this.bgAActive = false
    this.bgMActive = true
    this.bgSActive = false
  }

}
