import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  datiToscana : any[];
  httpc : HttpClient;

  constructor(httpClient: HttpClient) {
 
	  this.httpc = httpClient;

  }

  getContagiToscana() {
  	return new Promise((resolve, reject) => {
  		this.httpc.get<string>('http://localhost:8080/DATI.json').toPromise()
  			.then(
  				res => { console.log(typeof(res)); this.datiToscana = [...res]; resolve(); },
          		msg => { reject(msg); }
  			)
  	});
  }
}
