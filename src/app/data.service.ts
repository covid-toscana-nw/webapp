import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  datiToscana : any[];
  httpc : HttpClient;

  all_datasets : string = 'https://raw.githubusercontent.com/michele-carignani/bollettini-toscana-nw-datasets/master/toscana_nw_all_datasets.json';

  constructor(httpClient: HttpClient) {
 
	  this.httpc = httpClient;

  }

  getContagiToscana() {
  	return new Promise((resolve, reject) => {
  		this.httpc.get<string>(this.all_datasets).toPromise()
  			.then(
  				res => { console.log(typeof(res)); this.datiToscana = [...res]; resolve(); },
          		msg => { reject(msg); }
  			)
  	});
  }
}
