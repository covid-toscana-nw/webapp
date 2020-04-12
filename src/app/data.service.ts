import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  data_for_all_charts : any[];
  httpc : HttpClient;
  loaded : Boolean;
 
//   all_datasets : string = 'https://raw.githubusercontent.com/michele-carignani/bollettini-toscana-nw-datasets/master/toscana_nw_all_datasets.json';
  all_datasets : string = 'http://localhost:8080/toscana_nw_all_datasets.json';

  constructor(httpClient: HttpClient) {
 
	  this.httpc = httpClient;

  }

  getContagiToscana() {
    if(!this.loaded)
	  	return new Promise((resolve, reject) => {
	  		this.httpc.get<any>(this.all_datasets).toPromise()
	  			.then(
	  				res => { console.log(res); this.data_for_all_charts = res; this.loaded = true; resolve(); },
	          		msg => { reject(msg); }
	  			)
	  	});
	else
		return Promise.resolve('done');
  }
}
