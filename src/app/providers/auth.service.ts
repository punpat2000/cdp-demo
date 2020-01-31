import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from '../models/user.model'
import { Observable, of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators'

@Injectable({providedIn: 'root'})
export class AuthService {
     /**variable type is obs emit partiUser type */
    constructor( /**run everytime when create new instant(one instant per user) */
        private afAuth : AngularFireAuth,
        private afs: AngularFirestore,   /**read write database */     

    ){
        this.afAuth.authState.pipe(take(1)).subscribe(user =>{ /**pen new user or not */
          if(user){ 
              const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
              userRef.ref.get().then(value => { /**get=aow data at that time, then=promise wa ja tum arai */
                  if(value.exists){
                      console.log('user already exists, no data added');
                  }else{
                      const data : User = {
                          userId: user.uid,
                          email: user.email.toLowerCase(),
                          displayName: user.displayName,
                          role: {unspecified:true}
                      };
                      this.setUserData(data).catch(error =>{
                          console.log(error);
                      });
                  }
              });
          }   
      });
    }
    
    getUserData():Observable<User>{
      return this.afAuth.authState.pipe(    
              switchMap(user => { /**run newest data */
                  if (user){
                      return this.afs.doc<User>(`users/${user.uid}`).valueChanges(); /**ja emit when valuechange, return observable of document with document id as logged in uid */
                  }else{ /**aow other data tee pen obseravable kong uid nee ma display */
                      return of(null);
                  }
                  })
              );
    }
    
    setUserData(user: User) {
        return this.afs.doc<User>(`users/${user.userId}`).set(user);
    }
    
    updateUserData(user: User) {
        return this.afs.doc<User>(`users/${user.userId}`).update(user);
    }
    
    updateDisplayName(name:string){
      this.afAuth.authState.pipe(take(1)).subscribe(user =>{
          if(user){
              const userRef: AngularFirestoreDocument<any> = this.afs.doc(
                  `users/${user.uid}`
              );
              userRef.update({"displayName":name});
          }
      });
    }

}