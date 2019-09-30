import { Injectable } from '@angular/core';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Stop } from '../model/stop';
@Injectable({
  providedIn: 'root'
})
export class StopService {

  constructor(private http: HttpClient) { }
  getStops() {
    const Header: HttpHeaders = new HttpHeaders({
      'Cache-Control': 'no-cache'
   });
    return this.http.get<Stop[]>(environment.urlApi + '/stops', { headers: Header});
  }
}
