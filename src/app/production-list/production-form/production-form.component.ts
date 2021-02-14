import { Component, OnInit } from '@angular/core';
import { ProductionsService } from 'src/app/services/production.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'
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

  title: string = "test";
  reference: string = "test";
  watt: number = 0;
  photo: string;
  production: Production;

  constructor(private formBuilder: FormBuilder,
    private productionsService: ProductionsService,
    private router: Router) { }

  ngOnInit(): void {
    this.initFormm();
  }
  initFormm() {
    this.productionForm = this.formBuilder.group({
      title: [this.title, Validators.required],
      reference: [this.reference, Validators.required],
      watt: [this.watt, Validators.required],
    })
  }
  onSaveProduction() {
    const title = this.productionForm.get('title').value;
    const reference = this.productionForm.get('reference').value;
    const watt = this.productionForm.get('watt').value;
    const newProduction = new Production(title, reference, watt);
    if (this.fileDecteted) {
      this.savePhoto(newProduction).then(
        ()=>{
          this.productionsService.createNewProduction(newProduction);
          this.router.navigate(['/productions']);
        },
        ()=>{
          console.log("erreur");
        }
      );

    } else {
      this.productionsService.createNewProduction(newProduction);
      this.router.navigate(['/productions']);
    }
  }
  private savePhoto(newProduction: Production): Promise<unknown> {
    console.log('appel fait de this.savePhoto');
    return new Promise(
      (resolve,reject) => {
        this.fileIsUploading = true;
        this.productionsService.uploadFile(this.fileEvent).then(
          (url: string) => {
            this.fileUrl = url;
            this.fileIsUploading = false;
            this.fileUploaded = true;
            newProduction.photo = this.fileUrl;
            this.production=newProduction;
            console.log(newProduction);
            resolve(console.log("promise resolvé de save photo"));
          }
        );
        ()=>{
          reject(console.log("promise rejeté de save photo"))
        }
      }
    );
  }


  onSavePhoto(newProduction: Production): Promise<unknown> {
    return new Promise(
      (resolve) => {
        if (this.photo) {
          this.productionsService.removePhoto(this.production).then(
            () => {
              this.savePhoto(newProduction);
            }
          );
        }
        () => {
          resolve
        }
      }
    );
  }


  detectFiles(event: any) {
    this.fileEvent = event.target.files[0];
    this.fileDecteted = true;
  }
}
