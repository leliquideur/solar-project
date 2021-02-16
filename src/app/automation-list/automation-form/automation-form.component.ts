import { Component, OnInit } from '@angular/core';
import { AutomationsService } from 'src/app/services/automation.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'
import { Automation } from 'src/app/models/Automation.model';

@Component({
  selector: 'app-automation-form',
  templateUrl: './automation-form.component.html',
  styleUrls: ['./automation-form.component.scss']
})
export class AutomationFormComponent implements OnInit {

  automationForm: FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileEvent: File;
  fileUploaded = false;
  fileDecteted = false;

  title: string;
  reference: string;
  type: string;
  cycleTime: number;
  ampere: number;
  standBy: number;
  photo: string;
  oldAutomation: Automation;
  automation: Automation;
  id: number;
  event: any;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private automationsService: AutomationsService,
    private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    if (this.id) {
      this.automationsService.getSingleAutomation(this.id).then(
        (automation: Automation) => {
          this.oldAutomation = this.automation = automation;
          this.oldAutomation.uid = this.id;
          this.initFormm();
        }
      );
    } else {
      this.initFormm();
    }
  }
  initFormm() {
    if (this.automation) {/*init si c'est une modife grace au numéro d'id*/
      console.log("Producteur reconnu: " + this.automation.title);
      this.title = this.automation.title;
      this.reference = this.automation.reference;
      this.type = this.automation.type;
      this.cycleTime = this.automation.cycleTime;
      this.ampere = this.automation.ampere;
      this.standBy = this.automation.standBy;
      if (this.automation.photo) {
        this.photo = this.automation.photo;
        console.log(this.automation.photo);
      }
    }
    this.automationForm = this.formBuilder.group({
      title: [this.title, Validators.required],
      reference: [this.reference, Validators.required],
      type: [this.type, Validators.required],
      cycleTime: [this.cycleTime, Validators.required],
      ampere: [this.ampere, Validators.required],
      standBy: [this.standBy, Validators.required],
    })
  }
  onSaveAutomation() {
    const title = this.automationForm.get('title').value;
    const reference = this.automationForm.get('reference').value;
    const type = this.automationForm.get('type').value;
    const cycleTime = this.automationForm.get('cycleTime').value * 2;
    const ampere = this.automationForm.get('ampere').value;
    const standBy = this.automationForm.get('standBy').value;
    const cylceAmpere = cycleTime * ampere / 3600;
    const newAutomation = new Automation(title, reference, type, cycleTime, ampere, standBy, cylceAmpere);
    if (this.photo) {
      newAutomation.photo = this.photo;
    }
    if (this.fileDecteted) {
      console.log("file detected");
      this.onSavePhoto(newAutomation, this.oldAutomation);
    } else {
      this.automationsService.createOrModifyNewAutomation(newAutomation, this.id, this.oldAutomation);
      this.router.navigate(['/automations']);
    }
  }
  private savePhoto(newAutomation: Automation): Promise<unknown> {
    console.log('appel fait de this.savePhoto');
    return new Promise(
      (resolve, reject) => {
        this.fileIsUploading = true;
        this.automationsService.uploadFile(this.fileEvent).then(
          (url: string) => {
            this.fileUrl = url;
            this.fileIsUploading = false;
            this.fileUploaded = true;
            newAutomation.photo = this.fileUrl;
            this.automation = newAutomation;
            console.log(newAutomation);
            resolve(console.log("promise resolvé de save photo"));
          }
        );
        () => {
          reject(console.log("promise rejeté de save photo"))
        }
      }
    );
  }
  onSavePhoto(newAutomation: Automation, oldAutomation?: Automation): Promise<unknown> {
    return new Promise(
      (resolve) => {
        if (this.photo) {
          console.log("if photo > removePhoto");
          this.automationsService.removePhoto(this.automation).then(
            () => {
              console.log("save photo");
              this.savePhoto(newAutomation).then(
                () => {
                  this.automationsService.createOrModifyNewAutomation(newAutomation, this.id, oldAutomation);
                  this.router.navigate(['/automations']);
                },
                () => {
                  console.log("erreur");
                }
              );
            },
          );
        } else {
          this.savePhoto(newAutomation).then(
            () => {
              this.automationsService.createOrModifyNewAutomation(newAutomation, this.id, oldAutomation);
              this.router.navigate(['/automations']);
              resolve(console.log("promise resolvé de save photo"));
            },
            () => {
              console.log("erreur");
            }
          );
        }
      }
    );
  }
  detectFiles(event: any) {
    this.fileEvent = event.target.files[0];
    this.fileDecteted = true;
    this.event = event;
  }
  clearFiles() {
    this.event.srcElement.value = null;
    this.fileDecteted = false;
  }
}
