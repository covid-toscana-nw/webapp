import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ColorHelper } from '@swimlane/ngx-charts';
import { DataService } from '../data.service';

@Component({
  selector: 'app-cartedatacontagiatizone',
  templateUrl: './cartedatacontagiatizone.component.html',
  styleUrls: ['./cartedatacontagiatizone.component.scss']
})

export class CartedatacontagiatizoneComponent implements OnInit{
  multi: any[];
  loaded: Boolean = false;
  public colors: ColorHelper;

  // options

  colorScheme = {
    domain: ['#1976d2', '#ffb300', '#e53935', '#43a047', '#FFFFFF', '#8e24aa']
  };
  cardColor: string = '#232837';

  constructor(private dataService : DataService) {
    dataService.getContagiToscana().then(arg => {
      this.multi = dataService.data_for_all_charts['aree'];
      console.log(this.multi);
      this.loaded=true;
    });
  }

  public ngOnInit(): void {
  }

  onSelect(data): void {
    //console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

}