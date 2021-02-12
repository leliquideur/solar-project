import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductionsService } from 'src/app/services/production.service';
import { Production } from 'src/app/models/Production.model';
import {Subscription} from 'rxjs/Subscription';
import { Router } from '@angular/router';

@Component({
  selector: 'app-production-list',
  templateUrl: './production-list.component.html',
  styleUrls: ['./production-list.component.scss']
})
export class ProductionListComponent implements OnInit, OnDestroy {
  productions: Production[];
  productionsSubsciption: Subscription;
  constructor(private productionsService: ProductionsService,
              private router: Router) { }

  ngOnInit(): void {
    this.productionsSubsciption=this.productionsService.productionsSubject.subscribe(
      (productions: Production[])=>{
        this.productions=productions;
      }
    );
    this.productionsService.emitProductions();
  }
  onNewProduction(){
    this.router.navigate(['/productions','new'])
  }

  onViewProduction(id: number){
    this.router.navigate(['/productions','view',id]);
  }
  ngOnDestroy(){
    this.productionsSubsciption.unsubscribe();
  }

}
