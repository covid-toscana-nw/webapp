import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HttpClientModule } from '@angular/common/http';
import { DatacontagiatizoneComponent } from './datacontagiatizone/datacontagiatizone.component';
import { DatacontagiatitoscananoComponent } from './datacontagiatitoscanano/datacontagiatitoscanano.component';
import { IncrementopercentualeComponent } from './incrementopercentuale/incrementopercentuale.component';
import { DecedutiguaritiComponent } from './decedutiguariti/decedutiguariti.component';
import { ContagiComuniComponent } from './contagi_comuni/contagi_comuni.component';
import { ContagiProvincieComponent } from './contagi_provincie/contagi_provincie.component';
import { MenuComponent } from './menu/menu.component';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatListModule} from '@angular/material/list';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {DataService} from './data.service';

@NgModule({

  declarations: [
    AppComponent,
    DatacontagiatizoneComponent,
    DatacontagiatitoscananoComponent,
    IncrementopercentualeComponent,
    DecedutiguaritiComponent,
    ContagiComuniComponent,
    ContagiProvincieComponent,
    MenuComponent
  ],

  imports: [

    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatListModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule

  ],

  providers: [
    DataService
  ],

  bootstrap: [AppComponent]

})

export class AppModule { }