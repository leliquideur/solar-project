import { Component, OnInit } from '@angular/core';
import{Automation}from'../../models/Automation.model';
import{AutomationsService}from'../../services/automation.service';
import{ActivatedRoute,Router}from'@angular/router';

@Component({
  selector: 'app-single-automation',
  templateUrl: './single-automation.component.html',
  styleUrls: ['./single-automation.component.scss']
})
export class SingleAutomationComponent implements OnInit {
  automation: Automation;

  constructor(private route: ActivatedRoute,
              private automationsService: AutomationsService,
              private router: Router) { }

  ngOnInit(): void {
    this.automation=new Automation('','',0,0);
    const id =this.route.snapshot.params["id"];
    this.automationsService.getSingleAutomation(+id).then(
      (automation:Automation)=>{
              this.automation=automation;
      }
    );
  }
  onBack(){
    this.router.navigate(['/automations']);
  }
  onDeleteAutomation(automation: Automation){
    this.automationsService.removeAutomation(automation);
  }

}
