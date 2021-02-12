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
  public createNewAutomation(newAutomation: Automation): void {
    this.automations.push(newAutomation);
    this.saveAutomations();
    this.emitAutomations();
  }
  removeAutomation(automation: Automation) {
    console.log('appel de la fonction removeAutomation')
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
    }else{
      console.log('Pas de photo trouvée ');
    }
console.log('67');
    const automationIndexToRemove = this.automations.findIndex(
      (automationEl) => {
        if (automationEl === automation) {
          return true;
        }
      }
    );
    this.automations.splice(automationIndexToRemove, 1);
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
