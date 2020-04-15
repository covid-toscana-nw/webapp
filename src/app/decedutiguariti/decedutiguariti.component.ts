import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';

@Component({
  selector: 'app-decedutiguariti',
  templateUrl: './decedutiguariti.component.html',
  styleUrls: ['./decedutiguariti.component.scss'],
  providers: [ DataService ]
})

export class DecedutiguaritiComponent {
  
  single: any[];
  multi: any[];
  loaded: Boolean = false;

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

  colorScheme = {
    domain: ['#1976d2', '#ffb300', '#9e9e9e']
  };

  constructor(dataService : DataService) {
    dataService.getContagiToscana().then(arg => {
      this.multi = [dataService.data_for_all_charts['toscana'][3],dataService.data_for_all_charts['toscana'][5]];
      this.loaded=true;
    });
  }

  onSelect(event) {
    console.log(event);
  }
}