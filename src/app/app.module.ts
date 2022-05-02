import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';

import { CookieService } from 'ngx-cookie-service';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app.routing';
import { JwtInterceptorModule } from './interceptor/jwt-interceptor.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    RouterModule,
    ComponentsModule,
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    JwtInterceptorModule
  ],
  providers:[
    CookieService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
