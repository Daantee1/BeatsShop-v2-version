import {  AfterViewInit, Component, OnInit } from '@angular/core';
import WaveSurfer from 'wavesurfer.js';
import { MusicService } from '../../services/music.service';
import { MusicDetails } from '../../types/music.type';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-musicplayer',
  templateUrl: './musicplayer.component.html',
  styleUrl: './musicplayer.component.scss',
})
export class MusicplayerComponent implements AfterViewInit {
  wavesurfer: WaveSurfer[] = [];
  isPlaying: boolean[] = [];
  isMute: boolean[] = [];
  isLoggedIn: boolean = false;
  licenseType: string = '';
  price?: any = '';
  audioPath: string[] = [];
  imgPath: string[] = [];
  musicDetails: MusicDetails[] = [];
  userDetails: MusicDetails[] = [];

  constructor(
    private musicService: MusicService,
    private authService: AuthService,
   
  ) {
    this.authService.loggedIn.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
    
  }
  ngAfterViewInit(): void {
    this.fetchUserMusic();
     this.fetchMusic();
     setTimeout(() => {
      this.initWaveSurfer(this.audioPath);
    }, 500);
  }

  initWaveSurfer(audioPaths: string[]) {
    if (audioPaths && Array.isArray(audioPaths) && audioPaths.length > 0) {
      
      const reversedAudioPaths = [...audioPaths].reverse();
      const reversedImgPaths = [...this.imgPath].reverse();
      this.imgPath = reversedImgPaths;
  
      reversedAudioPaths.forEach((audioURL, index) => {
        const wavesurfer = WaveSurfer.create({
          container: `#waveform-${index}`, 
          waveColor: '#dde5ec',
          progressColor: '#03cebf',
          height: 80,
          barWidth: 4,
          hideScrollbar: true,
          barRadius: 4,
        });
  
        this.wavesurfer.push(wavesurfer);
        
        if (audioURL) {
          wavesurfer.load(audioURL);
          console.log('Załadowano plik audio:', audioURL);
        } else {
          console.error(`Brak ścieżki do pliku audio dla indeksu ${index}.`);
        }
      });
    }
  }
  
  async fetchMusic() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      const userId = currentUser.uid;
      console.log('user id', userId)
      this.musicService
        .getMusicDetailsByUserId(userId)
        .subscribe((data: any) => {
          let musicDetailsArray: any = [];
          musicDetailsArray = data;
          this.musicDetails = musicDetailsArray;
        });
        
    }
  }
  
  fetchUserMusic() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      const userId = currentUser.uid;
      this.musicService.getMusicByUser(userId).subscribe((data: any) => {
        this.userDetails = data;
        this.audioPath = this.userDetails
          .filter((detail) => detail.id.endsWith('.wav'))
          .map((detail) => detail.url);
        this.imgPath = this.userDetails
          .filter((detail) => detail.id.endsWith('.png'))
          .map((detail) => detail.url);
        
      });
    }
  }
  
  pausePlaying(index: number) {
    if(this.wavesurfer) {
      this.isPlaying[index] = false;
      this.wavesurfer[index].playPause();
    }
    
  }
  startPlaying(index: number) {
    if(this.wavesurfer ){
    this.isPlaying[index] = true;
    this.wavesurfer[index].playPause();
    }
  }
  stopPlaying(index: number) {
    if(this.wavesurfer){
    this.isPlaying[index] = false;
    this.wavesurfer[index].stop();
    }
  }

  soundOn(index: number) {
    if(this.wavesurfer){
    this.isMute[index] = true;
    this.wavesurfer[index].setMuted(true);
    }
  }
  soundOff(index: number) {
    if(this.wavesurfer){
    this.isMute[index] = false;
    this.wavesurfer[index].setMuted(false);
    }
  }
}
