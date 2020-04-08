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
import { pianaDiLuccaData } from './pianadiluccadata';
import { apuaneData } from './apuanedata';
import { lunigianaData } from './lunigianadata';
import { DataService } from '../data.service';

@Component({

  selector: 'app-datacontagiatitoscanano',
  templateUrl: './datacontagiatitoscanano.component.html',
  styleUrls: ['./datacontagiatitoscanano.component.scss'],
  providers: [ DataService ]
})

export class DatacontagiatitoscananoComponent {
  multi: any[];
  view: any[] = [700, 500];

  // options
  legend: boolean = true;
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
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  constructor(dataService : DataService) {
    this.multi = dataService.getContagiToscana();
    Object.assign(this, this.multi );
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

}