import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { MapService } from '../map.service';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor(private mapService: MapService) { }

  ngOnInit() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYWljaGFvdWlhIiwiYSI6ImNqa3I3MmtqcjNyN2Eza2t4bGVraGFwemgifQ.ozRWzQt-iFZEvoao3KJ8jA';
    this.mapService.map = new mapboxgl.Map({
      style: 'mapbox://styles/mapbox/light-v10',
      center: [13.372476, 52.522239],
      zoom: 12,
      pitch: 45,
      bearing: 0,
      container: 'map',
      antialias: true
    });
  }

}
