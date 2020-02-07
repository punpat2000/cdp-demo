import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from '../models/user.model'
import { Observable, of, from, Subject } from 'rxjs';
import { switchMap, take } from 'rxjs/operators'


@Injectable({ providedIn: 'root' })
export class AuthService {

    private eventEmitter:Subject<string> = new Subject<string>();
    /**variable type is obs emit partiUser type */
    constructor( /**run everytime when create new instant(one instant per user) */
        private afAuth: AngularFireAuth,
        private afs: AngularFirestore,   /**read write database */

    ) {
        this.afAuth.authState.pipe(take(1)).subscribe(user => { /**pen new user or not */
            if (user) {
                const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
                userRef.ref.get().then(value => { /**get=aow data at that time, then=promise wa ja tum arai */
                    if (value.exists) {
                        console.log('user already exists, no data added');
                    } else {
                        const data: User = {
                            userId: user.uid,
                            fullName: user.displayName,
                            email: null,
                            displayName: user.displayName,
                            role: {
                                admin: false,
                                editor: false,
                                sales: false,
                                accountant: false,
                                unspecified: true
                            }
                        };
                        this.setUserData(data).then(() => {
                            console.log('new user created');
                            this.eventEmitter.next('created');
                        },err=>{
                            console.log('error',err);
                        }).catch(error => {
                            console.log(error);
                        });
                    }
                }).catch(err => {
                });
            } else {
                console.log('no user found in db')
            }
        });
    }

    getEmitter():Observable<string>{
        return this.eventEmitter.asObservable();
    }
    getUserData(): Observable<User> {
        return this.afAuth.authState.pipe(
            switchMap(user => { /**run newest data */
                if (user) {
                    return this.afs.doc<User>(`users/${user.uid}`).valueChanges(); /**ja emit when valuechange, return observable of document with document id as logged in uid */
                } else { /**aow other data tee pen obseravable kong uid nee ma display */
                    return of(null);
                }
            })
        );
    }

    setUserData(user: User) {
        return this.afs.doc<User>(`users/${user.userId}`).set(user);
    }

    updateUserData(user: User) {
        return this.afs.doc<User>(`users/${user.userId}`).update(user).then(() => {
            console.log('user update success');
        }
        ).catch(err=>{
            console.log('error',err);
        });
    }

    updateDisplayName(name: string) {
        this.afAuth.authState.pipe(take(1)).subscribe(user => {
            if (user) {
                const userRef: AngularFirestoreDocument<any> = this.afs.doc(
                    `users/${user.uid}`
                );
                userRef.update({ displayName: name });
            }
        });
    }

    isAuthorized(allowedRoles: string[]): Observable<boolean> {
        let role: string;
        return from(this.getUserData()
            .pipe<User>(take(1))
            .toPromise()
            .then(
                user => {
                    user;
                    if (user.role.unspecified === true) {
                        role = "unspecified";
                    }
                    else if (user.role.admin === true) {
                        role = "admin";
                    }
                    else if (user.role.accountant === true) {
                        role = "accountant";
                    }
                    else if (user.role.sales === true) {
                        role = "sales";
                    }
                    else if (user.role.editor === true) {
                        role = "editor";
                    }
                    return allowedRoles.includes(role);
                }));
    }
}