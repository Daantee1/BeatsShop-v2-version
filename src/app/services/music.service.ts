import { query, } from '@angular/animations';
import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, getDoc, getDocs, setDoc,} from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { where } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AuthService } from './auth.service';



@Injectable({
  providedIn: 'root'
})
export class MusicService {

  private musicList: any[] = []
  private musicListObs = new BehaviorSubject<any[]>(this.musicList)
  musicData!: Observable<any>

  

  constructor(private firestore: Firestore, private fireStorage: AngularFireStorage, private authService: AuthService) { }

  async addMusic(music: any){
    this.musicList.push(music);
  const currentUser = this.authService.getCurrentUser();

  if (currentUser) {
    const userId = currentUser.uid;
    try {
      const userDocRef = doc(collection(this.firestore, `music/${userId}/tracks`)); 

      music.id = this.generateRandomId(); 
      music.url = this.generateRandomId(); 

      await setDoc(userDocRef, music);
      console.log('Nowy dokument dodany dla użytkownika o ID:', userId);
    } catch (e) {
      console.error('Błąd dodawania dokumentu:', e);
    }
  }
  }




getData(): Observable<any> {
  const collectionInstance = collection(this.firestore, 'music');
  collectionData(collectionInstance, { idField: 'id' }).subscribe((val) => {
  });
  return (this.musicData = collectionData(collectionInstance, {
    idField: 'id',
  }));
}



getMusicDetailsByUserId(userId: string): Observable<any> {

  const userMusicCollectionRef = collection(this.firestore, `music/${userId}/tracks`);
  
  return new Observable<any>((observer) => {
    getDocs(userMusicCollectionRef)
      .then((querySnapshot) => {
        const musicDetails: any = [];
        querySnapshot.forEach((doc) => {
          musicDetails.push(doc.data());
        });

        if (musicDetails.length > 0) {
          observer.next(musicDetails);
        } else {
          observer.error('Brak dokumentów');
        }
      })
      .catch((error) => {
        observer.error(error);
      });
  });
}




getMusicByUser(userId: string): Observable<any[]> {
  const storagePath = `music/${userId}`

  return new Observable<any[]>((observer) => {
    const musicData: any[] = [];

    this.fireStorage.ref(storagePath).listAll().subscribe((res: any) => {
      res.items.forEach((itemRef: any) => {
        itemRef.getDownloadURL().then((url: any) => {
          musicData.push({ id: itemRef.name, url }); 
          observer.next(musicData); 
        });
      });
    }, (error: any) => {
      observer.error(error); 
    });
  });
}

generateRandomId() {
  return [...Array(20)].map(() => Math.floor(Math.random() * 36).toString(36)).join('');
}
}


