import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import firebase from "firebase/app";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public isAuth : boolean;
  public emailIsAuth: string;
  constructor(private authService: AuthService) { }

  ngOnInit(){
    firebase.auth().onAuthStateChanged(
      (user)=>{
        if(user){
          this.isAuth = true;
          this.emailIsAuth=user.email;
        }else{
          this.isAuth = false;
          this.emailIsAuth=null;
        }
      }
    );
  }
  onSignOut(){
    this.authService.signOutUser();
  }
}
