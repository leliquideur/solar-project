import firebase from 'firebase/app';
import DataSnapshot = firebase.database.DataSnapshot;

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Automation } from '../models/automation.model';

import 'firebase/database';
import 'firebase/storage';

@Injectable()
export class AutomationsService {

  public automations: Automation[] = [];
  public automationsSubject = new Subject<Automation[]>();
  constructor() {
    this.getAutomations();
  }
  public emitAutomations(): void {
    this.automationsSubject.next(this.automations);
  }
  public saveAutomations(): void {
    firebase.database().ref('/automations').set(this.automations);
  }
  public getAutomations(): void {
    firebase.database().ref('/automations')
      .on('value', (data: DataSnapshot) => {
        this.automations = data.val() ? data.val() : [];
        this.emitAutomations();
      },
    );
  }
  public getSingleAutomation(id: number): Promise<unknown> {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/automations/' + id).once('value').then(
          (data: DataSnapshot) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          },
        );
      },
    );
  }
  removePhoto(automation: Automation): Promise<unknown> {
    return new Promise(
      (resolve, reject) => {
        const storageRef = firebase.storage().refFromURL(automation.photo);
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
  public createOrModifyNewAutomation(newAutomation: Automation, id?: number, oldAutomation?: Automation): void {
    if(id){
      console.log("on va remove l'id"+oldAutomation.uid);
      if(oldAutomation.photo === newAutomation.photo){
        this.removeAutomationButNoPhoto(oldAutomation)
      }else{
        this.removeAutomation(oldAutomation);
      }
      this.automations.push(newAutomation);
      console.log("fill")
    }else{
      /*newAutomation.id=this.automations.keys;*/
      this.automations.push(newAutomation)
      console.log("push")
    }
    this.saveAutomations();
    this.emitAutomations();
  }
  removeAutomationButNoPhoto(automation: Automation) {
    console.log('appel de la fonction removeAutomationButNoPhoto automation.uid= '+automation.uid)
    this.automations.splice(automation.uid, 1);
    this.saveAutomations();
    this.emitAutomations();
  }
  removeAutomation(automation: Automation) {
    console.log('appel de la fonction removeAutomation automation.uid= '+automation.uid)
    if (automation.photo) {
      const storageRef = firebase.storage().refFromURL(automation.photo);
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
    this.automations.splice(automation.uid, 1);
    this.saveAutomations();
    this.emitAutomations();
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
