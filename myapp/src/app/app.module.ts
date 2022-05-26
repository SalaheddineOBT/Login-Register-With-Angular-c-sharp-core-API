import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NaveComponent } from './components/nave/nave.component';
import { ConnectionService } from './services/connection.service';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    NaveComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
      ConnectionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
