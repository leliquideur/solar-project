import { Injectable } from '@angular/core';
import { CanActivate,Router } from '@angular/router';
import {Observable} from 'rxjs/Observable';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

@Injectable()
export class AuthGuardService implements CanActivate{
  protected user: any;
  constructor(private router: Router) { }
  canActivate(): Observable<boolean> | Promise<boolean> | boolean{
    return new Promise(
    (resolve)=>{
        firebase.auth().onAuthStateChanged(
          (user)=>{
            if(user){
              this.user=user;
              resolve(true);
            }else{
              this.router.navigate(['/auth','signin']);
              resolve(false);
            }
          },
        );
      }
    );
  }
  getUserUID(){
    return this.user
  }
}
