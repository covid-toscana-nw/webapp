import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ColorHelper } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-decedutiguariti',
  templateUrl: './decedutiguariti.component.html',
  styleUrls: ['./decedutiguariti.component.scss']
})

export class DecedutiguaritiComponent implements OnInit{
  
  single: any[];
  multi: any[];
  datasetToscana: any;
  loaded: Boolean = false;
  public colors: ColorHelper;
  public chartNames: string[];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Data';
  showYAxisLabel = true;
  yAxisLabel = 'Numero';
  animations: boolean = true;
  public activeEntries: any[] = [];

  colorScheme = {
    domain: ['#1976d2', '#ffb300', '#9e9e9e']
  };

  constructor(private dataService : DataService) {
    dataService.getContagiToscana().then(arg => {
      this.datasetToscana = dataService.data_for_all_charts['toscana']; 
      this.multi = [
          this.datasetToscana["decessi-totali"],
          this.datasetToscana["guariti-clinici-totali"]
      ];
      this.chartNames = this.multi.map((d: any) => d.name);
      this.colors = new ColorHelper(
      this.colorScheme, 
      'ordinal', 
      this.chartNames, 
      this.colorScheme
      );
      this.loaded=true;
    });
  }

  public ngOnInit(): void {
    this.dataService.getContagiToscana().then(arg =>{
        // Get chartNames
        this.chartNames = this.multi.map((d: any) => d.name);
        // Convert hex colors to ColorHelper for consumption by legend
        this.colors = new ColorHelper(this.colorScheme, 'ordinal', this.chartNames, this.colorScheme);
    });
  }

  onSelect(event) {
    console.log(event);
  }

  onToggleChange(value: MatSlideToggleChange) {
    if(this.loaded == false) { return; }

    if(value.checked == true){
      this.multi = [
          this.datasetToscana["decessi-totali"],
          this.datasetToscana["guariti-clinici-totali"],
          this.datasetToscana["contagi-totali"],
      ];
      this.chartNames = this.multi.map((d: any) => d.name);
    } else {
      this.multi = [
          this.datasetToscana["decessi-totali"],
          this.datasetToscana["guariti-clinici-totali"]
      ];
      this.chartNames = this.multi.map((d: any) => d.name);
    }
  }

  public legendLabelActivate(item: any): void {
     this.activeEntries = [item];      
  }

  public legendLabelDeactivate(item: any): void {
     this.activeEntries = [];
  } 
}