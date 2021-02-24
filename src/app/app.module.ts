import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { AuthService } from 'src/app/services/auth.service';
import { AutomationsService } from 'src/app/services/automation.service';
import { InstallationService } from 'src/app/services/installation.service';
import { ProductionsService } from 'src/app/services/production.service';
import { AppComponent } from './app.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AutomationFormComponent } from './automation-list/automation-form/automation-form.component';
import { AutomationListComponent } from './automation-list/automation-list.component';
import { SingleAutomationComponent } from './automation-list/single-automation/single-automation.component';
import { HeaderComponent } from './header/header.component';
import { InstallationComponent } from './installation/installation.component';
import { ProductionFormComponent } from './production-list/production-form/production-form.component';
import { ProductionListComponent } from './production-list/production-list.component';
import { SingleProductionComponent } from './production-list/single-production/single-production.component';



const appRoutes: Routes = [
  { path: 'auth/signup', component: SignupComponent },
  { path: 'auth/signin', component: SigninComponent },
  { path: 'automations', canActivate: [AuthGuardService], component: AutomationListComponent },
  { path: 'automations/new', canActivate: [AuthGuardService], component: AutomationFormComponent },
  { path: 'automations/new/:id', canActivate: [AuthGuardService], component: AutomationFormComponent },
  { path: 'automations/view/:id', canActivate: [AuthGuardService], component: SingleAutomationComponent },
  { path: 'installation', canActivate: [AuthGuardService], component: InstallationComponent },
  { path: 'productions', canActivate: [AuthGuardService], component: ProductionListComponent },
  { path: 'productions/new', canActivate: [AuthGuardService], component: ProductionFormComponent },
  { path: 'productions/new/:id', canActivate: [AuthGuardService], component: ProductionFormComponent },
  { path: 'productions/view/:id', canActivate: [AuthGuardService], component: SingleProductionComponent },
  { path: '', redirectTo: 'installation', pathMatch: 'full' },
  { path: '**', redirectTo: 'installation' },
]

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    SingleAutomationComponent,
    AutomationListComponent,
    AutomationFormComponent,
    HeaderComponent,
    ProductionListComponent,
    ProductionFormComponent,
    SingleProductionComponent,
    InstallationComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthService,
    AuthGuardService,
    AutomationsService,
    ProductionsService,
    InstallationService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
