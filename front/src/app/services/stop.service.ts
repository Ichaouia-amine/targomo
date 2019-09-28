import { Injectable } from '@angular/core';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class StopService {

  constructor(private http: HttpClient) { }
  getStops() {
    const Header: HttpHeaders = new HttpHeaders({
      'Cache-Control': 'no-cache'
   });
    return this.http.get(environment.urlApi + '/stops', { headers: Header});
  }
}
