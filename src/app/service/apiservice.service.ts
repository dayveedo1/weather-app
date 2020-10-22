import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
  
  baseUrl = 'http://api.weatherstack.com/';
  accessKey = '11cc2c7c579d668aaa99838d3f25b1af';

  constructor(private _http: HttpClient) { }

  getWeatherDetails(e:any):any{
    return this._http.get(this.baseUrl + '/current?access_key='+this.accessKey + '&query='+ e );

  }
}
