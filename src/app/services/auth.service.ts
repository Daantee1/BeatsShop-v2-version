import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  loggedIn = new BehaviorSubject(false)
  currentUser: firebase.User | null = null;

  constructor(private fireauth: AngularFireAuth, private router: Router) {
    this.fireauth.authState.subscribe((user) => {
      if (user) {
        this.currentUser = user;
        
      } else {
        this.currentUser = null;
        
      }
    });
  }

  

  logIn(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then((userCredential) => {
      
      localStorage.setItem('token', 'true');;
      
      this.loggedIn.next(true)
     
    }),
      (err: any) => {
        alert('Sth went wrong!');
        this.router.navigate(['/Login-Page']);
      };
  }
  
  register(email: string, password: string){
    this.fireauth.createUserWithEmailAndPassword(email, password).then(()=>{
     
    }),
    (err:any) =>{
      alert(err.message)
    }
  }

  getCurrentUser(): firebase.User | null {
    return this.currentUser;
  }
  
  logout() {
    this.fireauth.signOut().then(
      () => {
        localStorage.removeItem('token');
        this.router.navigate(['/Login-Page']);
        this.loggedIn.next(false)
      },
      (err: any) => {
        alert(err.message);
      }
    );
  }
}
