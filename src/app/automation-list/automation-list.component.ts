import { Component, OnInit, OnDestroy } from '@angular/core';
import { AutomationsService } from 'src/app/services/automation.service';
import { Automation } from 'src/app/models/Automation.model';
import {Subscription} from 'rxjs/Subscription';
import { Router } from '@angular/router';

@Component({
  selector: 'app-automation-list',
  templateUrl: './automation-list.component.html',
  styleUrls: ['./automation-list.component.scss']
})
export class AutomationListComponent implements OnInit, OnDestroy {
  automations: Automation[];
  automationsSubsciption: Subscription;
  constructor(private automationsService: AutomationsService,
              private router: Router) { }

  ngOnInit(): void {
    this.automationsSubsciption=this.automationsService.automationsSubject.subscribe(
      (automations: Automation[])=>{
        this.automations=automations;
      }
    );
    this.automationsService.emitAutomations();
  }
  onNewAutomation(){
    this.router.navigate(['/automations','new'])
  }
  onDeleteAutomation(automation: Automation){
    this.automationsService.removeAutomation(automation);
  }
  onViewAutomation(id: number){
    this.router.navigate(['/automations','view',id]);
  }
  ngOnDestroy(){
    this.automationsSubsciption.unsubscribe();
  }

}
