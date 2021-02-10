import { NgModule } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { AutomationService } from 'src/app/services/automation.service';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'

import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SingleAutomationComponent } from './automation-list/single-automation/single-automation.component';
import { AutomationListComponent } from './automation-list/automation-list.component';
import { AutomationFormComponent } from './automation-list/automation-form/automation-form.component';
import { HeaderComponent } from './header/header.component';
import { Routes,RouterModule } from '@angular/router';

const appRoutes: Routes=[
  {path: 'auth/signup', component: SignupComponent},
  {path: 'auth/signin', component: SigninComponent},
  {path: 'automations',canActivate: [AuthGuardService], component: AutomationListComponent},
  {path: 'automations/new',canActivate: [AuthGuardService], component: AutomationFormComponent},
  {path: 'automations/view/:id',canActivate: [AuthGuardService], component: SingleAutomationComponent},
  { path: '', redirectTo: 'automations', pathMatch: 'full' },
  { path: '**', redirectTo: 'automations' },
]

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    SingleAutomationComponent,
    AutomationListComponent,
    AutomationFormComponent,
    HeaderComponent
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
    AutomationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
