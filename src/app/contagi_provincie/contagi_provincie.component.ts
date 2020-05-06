import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ColorHelper } from '@swimlane/ngx-charts';
import { DataService } from '../data.service';

@Component({
  selector: 'app-contagi-provincie',
  templateUrl: './contagi_provincie.component.html',
  styleUrls: ['./contagi_provincie.component.scss']
})

export class ContagiProvincieComponent implements OnInit{
  multi: any[];
  loaded: Boolean = false;
  public activeEntries: any[] = [];
  public chartNames: string[];
  public colors: ColorHelper;

  // options
  legend: boolean = false;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Data';
  yAxisLabel: string = 'Contagiati';
  timeline: boolean = true;
  chartTitle : string = 'Contagi Provincie';

  colorScheme = {
    domain: ['#1976d2', '#ffb300', '#e53935', '#43a047', '#0097a7', '#8e24aa']
  };

  constructor(private dataService : DataService) {
    dataService.getContagiToscana().then(arg => {
      
      let temp = dataService.data_for_all_charts['provincie'].map(x => { return [x[1], x[4]]; });
      this.multi = [].concat(...temp);
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

  onSelect(data): void {
    //console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    //console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    //console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  public legendLabelActivate(item: any): void {
     this.activeEntries = [item];      
  }

  public legendLabelDeactivate(item: any): void {
     this.activeEntries = [];
  }

}