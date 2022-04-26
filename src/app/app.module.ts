import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HashLocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { PagesModule } from './pages/pages.module';

import { CookieService } from 'ngx-cookie-service';
import { JwtInterceptor } from './interceptor/jwt.interceptor';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    PagesModule,
    RouterModule,
    ComponentsModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers:[
    CookieService,
    HashLocationStrategy,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
