import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';

@Component({
  selector: 'app-incrementopercentuale',
  templateUrl: './incrementopercentuale.component.html',
  styleUrls: ['./incrementopercentuale.component.scss'],
  providers: [ DataService ]
})

export class IncrementopercentualeComponent {
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
  yAxisLabel = 'Incremento percentuale %';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(dataService : DataService) {
    dataService.getContagiToscana().then(arg => {
      this.single = dataService.data_for_all_charts['tasso-crescita'][0]['series'];
      this.loaded=true;
    });
  }

  onSelect(event) {
    console.log(event);
  }
}