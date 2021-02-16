import { Injectable } from '@angular/core';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  protected userID: any;
  constructor() { }
  createNewUser(email: string, password: string) {
    /* j'ai du rajouter void sur les 2 promise*/
    return new Promise(
      (resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(
          () => {
            resolve(console.log("Promise de createNewUser ok"));
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }
  signInUser(email: string, password: string) {
      return new Promise(
        (resolve, reject) => {
          firebase.auth().signInWithEmailAndPassword(email, password).then(
            () => {

              resolve(console.log("Promise de signInUser ok"));
            },
            (error) => {
              reject(error);
            }
          );
        }
      );
  }

  signOutUser() {
    firebase.auth().signOut();
  }
}
