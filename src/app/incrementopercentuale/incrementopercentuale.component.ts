/*import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-datacontagiati',
  templateUrl: './datacontagiati.component.html',
  styleUrls: ['./datacontagiati.component.scss']
})
export class DatacontagiatiComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}*/
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { single } from './data';
import { pianaDiLuccaData } from './pianadiluccadata';
import { apuaneData } from './apuanedata';
import { lunigianaData } from './lunigianadata';

@Component({
  selector: 'app-incrementopercentuale',
  templateUrl: './incrementopercentuale.component.html',
  styleUrls: ['./incrementopercentuale.component.scss']
})

export class IncrementopercentualeComponent {
  single: any[];
  multi: any[];

  view: any[] = [700, 500];

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

  constructor() {
    Object.assign(this, { single })
  }

  onSelect(event) {
    console.log(event);
  }
}