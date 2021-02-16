import { Component, OnInit } from '@angular/core';
import { Production } from '../../models/Production.model';
import { ProductionsService } from '../../services/production.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-single-production',
  templateUrl: './single-production.component.html',
  styleUrls: ['./single-production.component.scss']
})
export class SingleProductionComponent implements OnInit {
  production: Production;
  id: number;
  constructor(private route: ActivatedRoute,
    private productionsService: ProductionsService,
    private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    this.production = new Production('', '', 0);
    this.productionsService.getSingleProduction(this.id).then(
      (production: Production) => {
        this.production = production;
        this.production.uid = this.id;
      }
    );
  }
  onBack() {
    this.router.navigate(['/productions']);
  }
  onDeleteProduction(production: Production) {
    if (confirm('Supprimer votre appareils ?')) {
      console.log("this.production.uid=" + this.production.uid)
      this.productionsService.removeProduction(production);
      this.onBack();
    } else {
      return null;
    }
  }
  onModifyProduction() {
    this.router.navigate(['/productions', 'new', this.id]);
  }
}
