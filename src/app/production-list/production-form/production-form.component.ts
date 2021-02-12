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
  fileIsUploading=false;
  fileUrl: string;
  fileEvent: File;
  fileUploaded = false;
  fileDecteted=false;

  constructor(private formBuilder: FormBuilder,
    private productionsService: ProductionsService,
    private router: Router) { }

  ngOnInit(): void {
    this.initFormm();
  }
  initFormm() {
    this.productionForm = this.formBuilder.group({
      title: ['', Validators.required],
      reference: ['', Validators.required],
      watt: ['', Validators.required],
    })
  }
  onSaveProduction() {
    const title = this.productionForm.get('title').value;
    const reference = this.productionForm.get('reference').value;
    const watt = this.productionForm.get('watt').value;
    const newProduction = new Production(title, reference, watt);
    if(this.fileDecteted){
      this.fileIsUploading = true;
      this.productionsService.uploadFile(this.fileEvent).then(
        (url: string)=>{
          this.fileUrl=url;
          this.fileIsUploading=false;
          this.fileUploaded=true;
          newProduction.photo = this.fileUrl;
          this.productionsService.createNewProduction(newProduction);
          this.router.navigate(['/productions']);
        },
        ()=>{
          this.productionsService.createNewProduction(newProduction);
          this.router.navigate(['/productions']);
        }
      );

    }
    this.productionsService.createNewProduction(newProduction);
    this.router.navigate(['/productions']);
  }

  detectFiles(event: any){
    this.fileEvent=event.target.files[0];
    this.fileDecteted=true;
  }
}
