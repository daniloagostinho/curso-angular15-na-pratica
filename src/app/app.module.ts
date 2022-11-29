import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {HttpClientModule} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedMaterialModule } from './shared/shared-material/shared-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ContinuationRegisterComponent } from './components/continuation-register/continuation-register.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ContinuationRegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    SharedMaterialModule,
    HttpClientModule,
    ToastrModule.forRoot({
      closeButton: true,
      progressBar: true,
      positionClass: 'toast-top-right'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
