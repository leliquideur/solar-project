import { Component } from '@angular/core';
import firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(){
    var firebaseConfig = {
   apiKey: "AIzaSyAxc7Fnn516gddQw0ClOamqYnchNSqEQHg",
   authDomain: "calcul-d-installation-solaire.firebaseapp.com",
   databaseURL: "https://calcul-d-installation-solaire-default-rtdb.europe-west1.firebasedatabase.app",
   projectId: "calcul-d-installation-solaire",
   storageBucket: "calcul-d-installation-solaire.appspot.com",
   messagingSenderId: "944102497714",
   appId: "1:944102497714:web:36a2745911442bccddd8ab",
   measurementId: "G-9F753X47K0"
 };
 // Initialize Firebase
 firebase.initializeApp(firebaseConfig);
  }
}
