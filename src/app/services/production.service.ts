import firebase from 'firebase/app';
import DataSnapshot = firebase.database.DataSnapshot;

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Production } from '../models/production.model';

import 'firebase/database';
import 'firebase/storage';

@Injectable()
export class ProductionsService {

  public productions: Production[] = [];
  public productionsSubject = new Subject<Production[]>();
  constructor() {
    this.getProductions();
  }
  public emitProductions(): void {
    this.productionsSubject.next(this.productions);
  }
  public saveProductions(): void {
    firebase.database().ref('/productions').set(this.productions);
  }
  public getProductions(): void {
    firebase.database().ref('/productions')
      .on('value', (data: DataSnapshot) => {
        this.productions = data.val() ? data.val() : [];
        this.emitProductions();
      },
    );
  }
  public getSingleProduction(id: number): Promise<unknown> {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/productions/' + id).once('value').then(
          (data: DataSnapshot) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          },
        );
      },
    );
  }
  removePhoto(production: Production): Promise<unknown> {
    return new Promise(
      (resolve, reject) => {
        const storageRef = firebase.storage().refFromURL(production.photo);
        storageRef.delete().then(
          () => {
            console.log('Photo removed!');
            resolve(console.log("resole de removePhoto OK"));
          },
          (error) => {
            console.log('Could not remove photo! : ' + error);
          }
        );
        ()=>{
          reject(console.log("rejct de removePhoto OK"));
        }
      }
    )
  }
  public createOrModifyNewProduction(newProduction: Production, id?: number, oldProduction?: Production): void {
    if(id){
      console.log("on va remove l'id"+oldProduction.uid);
      this.removeProduction(oldProduction);
      this.productions.push(newProduction);
      console.log("fill")
    }else{
      /*newProduction.id=this.productions.keys;*/
      this.productions.push(newProduction)
      console.log("push")
    }
    this.saveProductions();
    this.emitProductions();
  }
  removeProduction(production: Production) {
    console.log('appel de la fonction removeProduction production.uid= '+production.uid)
    if (production.photo) {
      const storageRef = firebase.storage().refFromURL(production.photo);
      storageRef.delete().then(
        () => {
          console.log('Photo removed!');
        },
        (error) => {
          console.log('Could not remove photo! : ' + error);
        }
      );
    } else {
      console.log('Pas de photo trouvée ');
    }
    this.productions.splice(production.uid, 1);
    this.saveProductions();
    this.emitProductions();
  }
  public uploadFile(file: File): Promise<unknown> {
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref()
          .child('images/' + almostUniqueFileName + file.name).put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('Chargement…');
          },
          (error) => {
            console.log('Erreur de chargement ! : ' + error);
            reject();
          },
          () => {
            resolve(upload.snapshot.ref.getDownloadURL());
          },
        );
      },
    );
  }
}
