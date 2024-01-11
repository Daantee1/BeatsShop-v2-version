import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MixMasterPageComponent } from './components/mix-master-page/mix-master-page.component';
import { AboutMePageComponent } from './components/about-me-page/about-me-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { DashboradComponent } from './components/dashborad/dashborad.component';
import { MyMusicComponent } from './components/my-music/my-music.component';
import { CartPageComponent } from './components/cart-page/cart-page.component';
import { NewBeatsPageComponent } from './components/new-beats-page/new-beats-page.component';


const routes: Routes = [
  {path: '', redirectTo: 'Home', pathMatch: 'full'},
  {path: 'Home', component: HomeComponent},
  {path:'Mix-Master-Page', component: MixMasterPageComponent},
  {path: 'About-Me-Page', component: AboutMePageComponent},
  {path: 'Login-Page', component:LoginPageComponent},
  {path: 'Register-Page', component:RegisterPageComponent},
  {path: 'Dashborad', component:DashboradComponent},
  {path: 'Cart-Page', component: CartPageComponent},
  {path: "New-Beats-Page", component: NewBeatsPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
