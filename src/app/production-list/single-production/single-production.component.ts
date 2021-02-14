import { Component, OnInit } from '@angular/core';
import{Production}from'../../models/Production.model';
import{ProductionsService}from'../../services/production.service';
import{ActivatedRoute,Router}from'@angular/router';

@Component({
  selector: 'app-single-production',
  templateUrl: './single-production.component.html',
  styleUrls: ['./single-production.component.scss']
})
export class SingleProductionComponent implements OnInit {
  production: Production;
  id:number;
  constructor(private route: ActivatedRoute,
              private productionsService: ProductionsService,
              private router: Router) { }

  ngOnInit(): void {
    this.production=new Production('','',0,);
    this.id =this.route.snapshot.params["id"];
    this.productionsService.getSingleProduction(this.id).then(
      (production:Production)=>{
              this.production=production;
      }
    );
  }
  onBack(){
    this.router.navigate(['/productions']);
  }
  onDeleteProduction(production: Production){
    this.productionsService.removeProduction(production);
    this.onBack();
  }
  onModifyProduction(production: Production){
    this.router.navigate(['/productions','new',this.id]);
  }

}
