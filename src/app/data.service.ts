import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
 
export class DataService {

  data_for_all_charts : any[];
  loadFileTask : Promise<any>;
  httpc : HttpClient;
  loaded : Boolean;
 
  all_datasets : string = environment.dataSourceUrl;

  constructor(httpClient: HttpClient) {
 
	this.httpc = httpClient;
	this.loadFileTask = this.httpc.get<any>(this.all_datasets).toPromise().then(
	  				res => { this.loaded = true; console.log(res); this.data_for_all_charts = res; },
	          		msg => {  }
	  			);
  }

  getContagiToscana() {
    if(!this.loaded)
	  	return this.loadFileTask;
	else {
		return Promise.resolve('done');
	}
  }
}
