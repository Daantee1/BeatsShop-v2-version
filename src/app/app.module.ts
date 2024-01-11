import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import 'flowbite';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { MixMasterPageComponent } from './components/mix-master-page/mix-master-page.component';
import { AboutMePageComponent } from './components/about-me-page/about-me-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { FormsModule } from '@angular/forms';
import {AngularFireModule} from'@angular/fire/compat'
import {AngularFireAuth, AngularFireAuthModule} from '@angular/fire/compat/auth'
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { AuthService } from './services/auth.service';
import { DashboradComponent } from './components/dashborad/dashborad.component';
import { AddMusicComponent } from './components/add-music/add-music.component';
import { MyMusicComponent } from './components/my-music/my-music.component';
import { MusicplayerComponent } from './components/musicplayer/musicplayer.component';
import { query, where } from '@firebase/firestore';
import { SettingsPageComponent } from './components/settings-page/settings-page.component';
import { NewBeatsPageComponent } from './components/new-beats-page/new-beats-page.component';
import { CartPageComponent } from './components/cart-page/cart-page.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    MixMasterPageComponent,
    AboutMePageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    DashboradComponent,
    AddMusicComponent,
    MyMusicComponent,
    MusicplayerComponent,
    SettingsPageComponent,
    NewBeatsPageComponent,
    CartPageComponent,

   
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp(environment.firebaseConfig)

  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
