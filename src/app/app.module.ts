import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { provideHttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { apiKeyInterceptor } from './interceptors/api-key.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideHttpClient(),
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: apiKeyInterceptor, 
      multi: true 
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
