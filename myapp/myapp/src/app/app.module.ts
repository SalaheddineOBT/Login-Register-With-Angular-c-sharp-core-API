import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { NaveComponent } from './nave/nave.component';
import { ConnectionService } from './services/connection.service';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    NaveComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
      ConnectionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
