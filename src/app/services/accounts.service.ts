import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { User } from '../types/user.type';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  doc,
  setDoc,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import * as bcrypt from 'bcryptjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  constructor(private firestore: Firestore, private router: Router, private afAuth: AngularFireAuth) {}

  private accountList: User[] = [];
  userData!: Observable<any>;
  private accountListObs = new BehaviorSubject<User[]>(this.accountList);
  private userLoggedDetails: User = {
    email: '',
    login: '',
    password: '',
  };
  private userLoggedDetailsObs = new BehaviorSubject<User>(this.userLoggedDetails);

  getUserLoggedDetailsObs(): Observable <User>{
    return this.userLoggedDetailsObs
  }

  addAccountToDB(user: User) {
  const hashedPassword = bcrypt.hashSync(user.password, 10)

    const accountWithHashedPassword: User = {
    login: user.login,
    email: user.email,
    password: hashedPassword,
    
  }
    this.accountList.push(accountWithHashedPassword);
    this.accountListObs.next(this.accountList);
    const collectionInstance = collection(this.firestore, 'users');
    addDoc(collectionInstance, accountWithHashedPassword)
      .then(() => {
        console.log('Data Saved Successfully');
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(this.accountList);
  }

  changePassword(userId: any, password: any){
    const userDocRef = doc(this.firestore, `users/${userId}`);
    const hashedPassword = bcrypt.hashSync(password, 10)
    setDoc(userDocRef, {password: hashedPassword}, {merge: true})
    console.log('Hasło zmienione pomyślnie')
    this.router.navigate(['/Home'])
  }

  getUsersAuth(): Observable<any> {
    return this.accountListObs.asObservable();
  }
  
  
  

  getAccountListObs() {
    return this.accountListObs.asObservable();
  }

  getData(): Observable<any> {
    const collectionInstance = collection(this.firestore, 'users');
    collectionData(collectionInstance, { idField: 'id' }).subscribe((val) => {
      console.log(val);
    });
    return (this.userData = collectionData(collectionInstance, {
      idField: 'id',
    }));
  }

  getDataForLogin(email: string, password: string) {
    const emailLowerCase = email.toLowerCase();
    const collectionInstance = collection(this.firestore, 'users');
    collectionData(collectionInstance, { idField: 'id' }).subscribe(
      (data: any[]) => {
        const user = data.find((userData: any) => {
          return (
            emailLowerCase === userData.email.toLowerCase() &&
            bcrypt.compareSync(password, userData.password)
            
          );
        });

        if (user) {
          this.userLoggedDetails = user;
          this.userLoggedDetailsObs.next(this.userLoggedDetails);
          console.log('Zalogowano pomyślnie');
          this.router.navigate(['/Dashborad']);
        } else {
          console.log('Nieprawidłowe dane logowania');
        }
      }
    );
  }
}
