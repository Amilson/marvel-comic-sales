import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { SigninCredentials, MarvelAuthUser, SignupCredentials } from 'app/interfaces';
import { Observable, of } from 'rxjs';
import { map, mergeMap, switchMap, take, tap } from 'rxjs/operators';
import firebase from 'firebase/app';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class MarvelAuthService {
  user$: Observable<MarvelAuthUser>;

  constructor(
    private fireAuth: AngularFireAuth,
    private fireStore: AngularFirestore,
    private router: Router
  ) {
    this.user$ = this.fireAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.fireStore.doc<MarvelAuthUser>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  private saveUser(user: any) {
    const userRef: AngularFirestoreDocument<MarvelAuthUser> = this.fireStore.doc(
      `users/${user.uid}`
    );

    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };

    return userRef.set(data, { merge: true });
  }

  private handleUser(user: any) {
    const userRef: AngularFirestoreDocument<MarvelAuthUser> = this.fireStore.doc(
      `users/${user.uid}`
    );

    return userRef
      .get()
      .pipe(
        take(1),
        map((user) => {
          if (!user.exists) {
            throw {
              code: 'auth/user-not-registered',
            };
          }
          return user;
        })
      )
      .toPromise();
  }

  async signin(authCredentials: SigninCredentials) {
    const { email, password } = authCredentials;
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }

  async signup(user: SignupCredentials) {
    const { email, password } = user;
    const credential = await this.fireAuth.createUserWithEmailAndPassword(email, password);
    return this.saveUser({ ...credential.user, displayName: user.displayName });
  }

  async googleSignin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential = await this.fireAuth.signInWithPopup(provider);
    return this.handleUser(credential.user);
  }

  async facebookSignin() {
    const provider = new firebase.auth.FacebookAuthProvider();
    const credential = await this.fireAuth.signInWithPopup(provider);
    return this.handleUser(credential.user);
  }

  async googleSignup() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential = await this.fireAuth.signInWithPopup(provider);
    return this.saveUser(credential.user);
  }

  async signOut() {
    await this.fireAuth.signOut();
    this.router.navigate(['/main/logged-out']);
  }
}
