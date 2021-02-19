import { Component, OnInit } from '@angular/core';
import { Installation } from 'src/app/models/Installation.model';
import { Automation } from 'src/app/models/Automation.model';
import { Production } from 'src/app/models/Production.model';
import { FormArray, FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router'
import { AutomationsService } from 'src/app/services/automation.service';
/*!!!!!!!!!!!! voir https://angular.io/guide/reactive-forms*/
@Component({
  selector: 'app-instllalation',
  templateUrl: './installation.component.html',
  styleUrls: ['./installation.component.scss']
})
export class InstallationComponent implements OnInit {
  automations: Automation[];
  securities: Automation[];
  accessories: Automation[];
  automationsSubsciption: Subscription;
  /*automation: Automation;*/

  installation: Installation;
  id: Number;
  /*instalation models*/
  public businessName: String;
  public automation: Automation;
  public security: Automation[];
  public accesory: Automation[];
  public production: Production;
  public cycleDay: number;
  public cycleAmpere: number;




  /*Test FormGroup*/
  public installationForm = new FormGroup({});
  public consumerFormGroup: FormGroup;
  public securitiesFormGroup= new FormGroup({});
  public securitiesFormArray = new FormArray([]);
  public accessoriesFormGroup= new FormGroup({});
  public accessoriesFormArray= new FormArray([]);





  constructor(
    private automationsService: AutomationsService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {

    this.automationsSubsciption = this.automationsService.automationsSubject.subscribe(
      (automations: Automation[]) => {
        this.automations = automations.filter(automation => automation.type === "Automatisme");
        this.securities = automations.filter(security => security.type === "Sécurité");
        this.accessories = automations.filter(accessory => accessory.type === "Accessoire");

        this.initFormm();
      }
    );
    this.automationsService.emitAutomations();
    this.id = this.route.snapshot.params["id"];


  }
  initFormm() {

    this.installationForm = this.formBuilder.group({
      businessNameFormControl: ['', Validators.required],
      consumerFormGroup: this.formBuilder.group({
        automationFormGroup: this.formBuilder.group({
          modelAutomationFormControl: ['', Validators.required],
          nombreAutomationFormControl: ['', Validators.required],
        }),
        securitiesFormArray: this.securitiesFormArray,
        accessoriesFormArray: this.accessoriesFormArray,
      })
    })
  }
  onRemoveSecurity(i: any){
    this.securitiesFormArray.removeAt(i)
  }
  addSecurity() {
    this.securitiesFormArray.push(
      new FormGroup({
        modelSecurityFormControl: new FormControl('', [Validators.required]),
        nombreSecurityFormControl: new FormControl(1, [Validators.required]),
      }))
  }
  get securitiesGetter() {
    return this.installationForm.get('securitiesFormArray') as FormArray;
  }
  onRemoveAccesory(i: any){
    this.accessoriesFormArray.removeAt(i)
  }
  addAccesory() {
    this.accessoriesFormArray.push(
      new FormGroup({
        modelAccesoryFormControl: new FormControl('', [Validators.required]),
        nombreAccesoryFormControl: new FormControl(1, [Validators.required]),
      }))
  }
  get AccesoryGetter() {
    return this.installationForm.get('accessoriesFormArray') as FormArray;
  }

}
