import { Component, OnInit } from '@angular/core';
import { ProductionsService } from 'src/app/services/production.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'
import { Production } from 'src/app/models/Production.model';

@Component({
  selector: 'app-production-form',
  templateUrl: './production-form.component.html',
  styleUrls: ['./production-form.component.scss']
})
export class ProductionFormComponent implements OnInit {

  productionForm: FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileEvent: File;
  fileUploaded = false;
  fileDecteted = false;

  title: string = "Test";
  reference: string = "Test";
  watt: number = 1;
  photo: string;
  oldProduction: Production;
  production: Production;
  id: number;
  event: any;

  constructor(
    /*private rd: Renderer2,*/
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private productionsService: ProductionsService,
    private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    if (this.id) {
      this.productionsService.getSingleProduction(this.id).then(
        (production: Production) => {
          console.log(production.title)
          this.oldProduction=this.production = production;
          this.oldProduction.uid=this.id;
          this.initFormm();
        }
      );
    } else {
      this.initFormm();
    }
  }
  initFormm() {
    if (this.production) {/*init si c'est une modife grace au numéro d'id*/
      console.log("Producteur reconnu: " + this.production.title);
      this.title = this.production.title;
      this.reference = this.production.reference;
      this.watt = this.production.watt;
      if (this.production.photo) {
        this.photo = this.production.photo;
        console.log(this.production.photo);
      }
    }
    this.productionForm = this.formBuilder.group({
      title: [this.title, Validators.required],
      reference: [this.reference, Validators.required],
      watt: [this.watt, Validators.required]
    })
  }
  onSaveProduction() {
    const title = this.productionForm.get('title').value;
    const reference = this.productionForm.get('reference').value;
    const watt = this.productionForm.get('watt').value;
    const newProduction = new Production(title, reference, watt);
    if (this.photo) {
      newProduction.photo = this.photo;
    }
    if (this.fileDecteted) {
      console.log("file detected");
      this.onSavePhoto(newProduction, this.oldProduction);
    } else {
      this.productionsService.createOrModifyNewProduction(newProduction, this.id, this.oldProduction);
      this.router.navigate(['/productions']);
    }
  }
  private savePhoto(newProduction: Production): Promise<unknown> {
    console.log('appel fait de this.savePhoto');
    return new Promise(
      (resolve, reject) => {
        this.fileIsUploading = true;
        this.productionsService.uploadFile(this.fileEvent).then(
          (url: string) => {
            this.fileUrl = url;
            this.fileIsUploading = false;
            this.fileUploaded = true;
            newProduction.photo = this.fileUrl;
            this.production = newProduction;
            console.log(newProduction);
            resolve(console.log("promise resolvé de save photo"));
          }
        );
        () => {
          reject(console.log("promise rejeté de save photo"))
        }
      }
    );
  }
  onSavePhoto(newProduction: Production,oldProduction?: Production): Promise<unknown> {
    return new Promise(
      (resolve) => {
        if (this.photo) {
          console.log("if photo > removePhoto");
          this.productionsService.removePhoto(this.production).then(
            () => {
              console.log("save photo");
              this.savePhoto(newProduction).then(
                () => {
                  this.productionsService.createOrModifyNewProduction(newProduction, this.id, oldProduction);
                  this.router.navigate(['/productions']);
                },
                () => {
                  console.log("erreur");
                }
              );
            },
          );
        } else {
          this.savePhoto(newProduction).then(
            () => {
              this.productionsService.createOrModifyNewProduction(newProduction, this.id, oldProduction);
              this.router.navigate(['/productions']);
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
