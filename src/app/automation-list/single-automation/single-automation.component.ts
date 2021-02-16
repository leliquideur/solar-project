import { Component, OnInit } from '@angular/core';
import { Automation } from '../../models/Automation.model';
import { AutomationsService } from '../../services/automation.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-single-automation',
  templateUrl: './single-automation.component.html',
  styleUrls: ['./single-automation.component.scss']
})
export class SingleAutomationComponent implements OnInit {
  automation: Automation;
  id: number;
  constructor(private route: ActivatedRoute,
    private automationsService: AutomationsService,
    private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    this.automation = new Automation('','','',0,0,0,0);
    this.automationsService.getSingleAutomation(this.id).then(
      (automation: Automation) => {
        this.automation = automation;
        this.automation.uid = this.id;
      }
    );
  }
  onBack() {
    this.router.navigate(['/automations']);
  }
  onDeleteAutomation(automation: Automation) {
    if (confirm('Supprimer votre appareils ?')) {
      console.log("this.automation.uid=" + this.automation.uid)
      this.automationsService.removeAutomation(automation);
      this.onBack();
    } else {
      return null;
    }
  }
  onModifyAutomation() {
    this.router.navigate(['/automations', 'new', this.id]);
  }
}
