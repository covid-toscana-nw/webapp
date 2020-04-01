import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HttpClientModule } from '@angular/common/http';
import { DatacontagiatiComponent } from './datacontagiati/datacontagiati.component';

@NgModule({

  declarations: [
    AppComponent,
    DatacontagiatiComponent
  ],

  imports: [

    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgxChartsModule,
    BrowserAnimationsModule

  ],

  providers: [],

  bootstrap: [AppComponent]

})

export class AppModule { }