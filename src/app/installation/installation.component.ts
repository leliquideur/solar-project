import { Component, OnInit } from '@angular/core';
import { Installation } from 'src/app/models/Installation.model';
import { Automation } from 'src/app/models/Automation.model';
import { Production } from 'src/app/models/Production.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router'
import { AutomationsService } from 'src/app/services/automation.service';

@Component({
  selector: 'app-instllalation',
  templateUrl: './installation.component.html',
  styleUrls: ['./installation.component.scss']
})
export class InstallationComponent implements OnInit {
  automations: Automation[];
  automationsSubsciption: Subscription;
  /*automation: Automation;*/
  installationForm: FormGroup;
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

  constructor(
    private automationsService: AutomationsService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.automationsSubsciption = this.automationsService.automationsSubject.subscribe(
      (automations: Automation[]) => {
        this.automations = automations.filter(automation => automation.type ==="Automatisme");
        this.security = automations.filter(automation => automation.type ==="Sécurité");
        this.accesory = automations.filter(automation => automation.type ==="Accesoire");
      }
    );
    this.automationsService.emitAutomations();
    this.id = this.route.snapshot.params["id"];
    /*if (this.id) {
      this.automationsService.getSingleAutomation(this.id).then(
        (automation: Automation) => {
          this.oldAutomation = this.automation = automation;
          this.oldAutomation.uid = this.id;
          this.initFormm();
        }
      );
    } else {*/
    this.initFormm();
    /*}*/
  }
  initFormm() {
    /*if (this.automation) {/*init si c'est une modife grace au numéro d'id*
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
    }*
    this.automation =*/
      this.installationForm = this.formBuilder.group({
        businessName: [this.businessName, Validators.required],
        automation: [this.automation, Validators.required],
        security: [this.security, Validators.required],
        accesory: [this.accesory, Validators.required],
        production: [this.production, Validators.required],
        cycleDay: [this.cycleDay, Validators.required],
        cycleAmpere: [this.cycleAmpere, Validators.required],
      });
  }

}
