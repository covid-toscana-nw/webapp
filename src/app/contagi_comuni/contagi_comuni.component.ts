import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ColorHelper } from '@swimlane/ngx-charts';
import { DataService } from '../data.service';

@Component({
  selector: 'app-contagi-comuni',
  templateUrl: './contagi_comuni.component.html',
  styleUrls: ['./contagi_comuni.component.scss']
})

export class ContagiComuniComponent implements OnInit{
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
  chartTitle : string = 'Comune di ';
  comune_di_interesse : string = "Lucca";

  colorScheme = {
    domain: ['#1976d2', '#ffb300', '#e53935', '#43a047', '#0097a7', '#8e24aa']
  };

  constructor(private dataService : DataService) {
    dataService.getContagiToscana().then(arg => {
      
      let temp = dataService.data_for_all_charts['comuni'].filter(
        (comune : any[]) => comune[0].name.startsWith(this.comune_di_interesse)
      );
      this.multi = temp[0].slice(0,4);
      this.loaded=true;
    });
  }

  public ngOnInit(): void {

    this.dataService.getContagiToscana().then(arg =>{
        // Get chartNames
        this.chartNames = this.multi.map((d: any) => d.name.split(" ").slice(1).join(" "));
        this.chartTitle = this.chartTitle + this.comune_di_interesse;
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