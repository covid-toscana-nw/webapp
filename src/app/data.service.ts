import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  contagi_toscana_nw : any[];

  constructor() { 


	this.contagi_toscana_nw = [
  
		  {
		    "name": "Toscana nord ovest",
		    "series": [
		      {
		        "name": "01/03/2020",
		        "value": 3
		      },
		      {
		        "name": "02/03/2020",
		        "value": 45
		      },
		      {
		        "name": "03/03/2020",
		        "value": 123
		      },
		      {
		        "name": "04/03/2020",
		        "value": 233
		      },
		      {
		        "name": "05/03/2020",
		        "value": 33
		      },
		      {
		        "name": "06/03/2020",
		        "value": 4
		      },
		    ]
		  }
		];


  }

  getContagiToscana() {
  	return this.contagi_toscana_nw;
  }


}
