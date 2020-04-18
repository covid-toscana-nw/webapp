import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-decedutiguariti',
  templateUrl: './decedutiguariti.component.html',
  styleUrls: ['./decedutiguariti.component.scss']
})

export class DecedutiguaritiComponent {
  
  single: any[];
  multi: any[];
  datasetToscana: any;
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

  constructor(private dataService : DataService) {
    dataService.getContagiToscana().then(arg => {
      this.datasetToscana = dataService.data_for_all_charts['toscana']; 
      this.multi = [
          this.datasetToscana["decessi-totali"],
          this.datasetToscana["guariti-clinici-totali"]
      ];
      this.loaded=true;
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
    } else {
      this.multi = [
          this.datasetToscana["decessi-totali"],
          this.datasetToscana["guariti-clinici-totali"]
      ];
    }
  } 
}