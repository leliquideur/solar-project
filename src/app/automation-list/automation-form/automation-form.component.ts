import { Component, OnInit } from '@angular/core';
import { AutomationsService } from 'src/app/services/automation.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import { Automation } from 'src/app/models/Automation.model';

@Component({
  selector: 'app-automation-form',
  templateUrl: './automation-form.component.html',
  styleUrls: ['./automation-form.component.scss']
})
export class AutomationFormComponent implements OnInit {

  automationForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private automationsService: AutomationsService,
    private router: Router) { }

  ngOnInit(): void {
    this.initFormm();
  }
  initFormm() {
    this.automationForm = this.formBuilder.group({
      title: ['', Validators.required],
      reference: ['', Validators.required],
      cycleTime: ['', Validators.required],
      ampere: ['', Validators.required]
    })
  }
  onSaveAutomation() {
    const title = this.automationForm.get('title').value;
    const reference = this.automationForm.get('reference').value;
    const cycleTime = this.automationForm.get('cycleTime').value * 2;
    const ampere = this.automationForm.get('ampere').value;
    const newAutomation = new Automation(title, reference, cycleTime, ampere);
    this.automationsService.createNewAutomation(newAutomation);
    this.router.navigate(['/automations']);
  }

}
