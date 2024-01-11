import { Component } from '@angular/core';
import { MusicService } from '../../services/music.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-my-music',
  templateUrl: './my-music.component.html',
  styleUrl: './my-music.component.scss'
})
export class MyMusicComponent {

  constructor(private musicService: MusicService, private authService: AuthService) { 
    console.log(this.musicService.getData())
  }
}
