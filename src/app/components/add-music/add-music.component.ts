import { Component, Input } from '@angular/core';
import { MusicDetails } from '../../types/music.type';
import { MusicService } from '../../services/music.service';
import {AngularFireStorage} from '@angular/fire/compat/storage'
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-music',
  templateUrl: './add-music.component.html',
  styleUrl: './add-music.component.scss'
})
export class AddMusicComponent {

  isFileUpload: boolean = false
  selectedFile: File | null = null;
  

  constructor(private musicService: MusicService, private fireStorage: AngularFireStorage, private authService: AuthService,
    private router: Router){
  }

 

  musicDetails: MusicDetails = {
    id: undefined,
    url: undefined,
    name: '',
    key: '',
    bpm: undefined,
    exclusive: '',
    basic: '',
    picture: ''

  }

  addMusic(){
   
    this.musicService.addMusic(this.musicDetails)
    this.router.navigate(['/Dashborad'])
  }

 

  async handleFileInput(event: any) {
    this.selectedFile = event?.target?.files[0]
    if(this.selectedFile){
      console.log('Zaakceptowany plik:', this.selectedFile.name);
      this.isFileUpload = true
      const currentUser = this.authService.getCurrentUser();
      if(currentUser){
        const userId = currentUser.uid
        
      const path = `music/${userId}/${this.selectedFile.name}`
      const uploadTask = await this.fireStorage.upload(path, this.selectedFile)
      const url = uploadTask.ref.getDownloadURL()
    }else{
      console.error('Brak zalogowanego użytkownika.');
    }
    }

    
  }

 

}
