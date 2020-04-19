import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';
import { ColorHelper } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-datacontagiatitoscanano',
  templateUrl: './datacontagiatitoscanano.component.html',
  styleUrls: ['./datacontagiatitoscanano.component.scss']
})

export class DatacontagiatitoscananoComponent implements OnInit{
  multi: any[];
  public chartNames: string[];
  loaded: Boolean = false;
  public colors: ColorHelper;
  public activeEntries: any[] = [];

  // options
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Data';
  yAxisLabel: string = 'Contagiati';
  timeline: boolean = true;

  colorScheme = {
    domain: ['#1976d2', '#ffb300', '#e53935' ]
  };

  constructor(private dataService : DataService) {
    dataService.getContagiToscana().then(arg => {
      var datasetToscana = dataService.data_for_all_charts['toscana'];
      this.multi = [
        datasetToscana["contagi-totali"],
        datasetToscana["contagi-giornalieri"],
        datasetToscana["positivi-attuali"]
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

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  public legendLabelActivate(item: any): void {
     this.activeEntries = [item];      
  }

  public legendLabelDeactivate(item: any): void {
     this.activeEntries = [];
  }

}
