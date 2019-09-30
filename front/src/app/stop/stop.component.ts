import { Component, OnInit } from '@angular/core';
import { StopService } from '../services/stop.service';
import { Stop } from '../model/stop';
import { MapService } from '../modules/map/map.service';
import { AppState } from '../model/app.state';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { LoadStops } from '../actions/stop.actions';
@Component({
  selector: 'app-stop',
  templateUrl: './stop.component.html',
  styleUrls: ['./stop.component.css']
})
export class StopComponent implements OnInit {
  public stopsRx: Observable<Array<Stop>>;
  public loading$: Observable<boolean>;
  public error$: Observable<Error>;
  public stops: Stop[];
  public stopsOriginal: Stop[];
  public midOn: number;
  public midOff: number;
  public midWalk: number;
  public midBike: number;
  public average: number;
  public defaultChoice: string;
  public searchTxt: string;
  public selectedStop: Stop;
  constructor(private stopService: StopService, private mapService: MapService, private store: Store<AppState>) {
    this.defaultChoice = 'on';
    this.searchTxt = '';
  }

  ngOnInit() {
    this.stopsRx = this.store.select(st => st.Stations.stops);
    this.loading$ = this.store.select(st => st.Stations.loading);
    this.error$ = this.store.select(st => st.Stations.error);
    this.store.dispatch(new LoadStops());
    this.stopsRx.subscribe((res: Stop[]) => {
      if (res.length > 0) {
        this.stops = res;
        this.orderStops();
        this.addColors();
        this.stopsOriginal = JSON.parse(JSON.stringify(this.stops));
        const feats: any[] = [];
        this.stops.forEach(s => {
          feats.push({
            type: 'Feature',
            geometry: s.geom,
            properties: {
              name: s.name,
              color_on: s.color_on,
              color_off: s.color_off,
              color_bike: s.color_bike,
              color_walk: s.color_walk
            }
          });
        });
        this.addLayers(feats);
      }
    });
  }
  /**
   *
   *
   * @param  feats : features of new data for sources
   * @memberof StopComponent
   */
  setLayersData(feats) {
    this.mapService.setLayerData('stopsPopOn', feats);
    this.mapService.setLayerData('stopsWalk', feats);
    this.mapService.setLayerData('stopsPopOff', feats);
    this.mapService.setLayerData('stopsBike', feats);
  }
  /**
   *
   *
   * @param {*} feats: features data for sources
   * @memberof StopComponent
   */
  addLayers(feats) {
    this.mapService.drawGeojson('stopsLine', this.createStopLine(), {
      'line-color': 'blue',
      'line-width': 5
    }, 'line');
    this.mapService.drawGeojson('stopsPopOn', {
      type: 'FeatureCollection',
      features: feats
    }, {
      // make circles larger as the user zooms from z12 to z22
      'circle-radius': {
        base: 1.75,
        stops: [[12, 10], [22, 180]]
      },
      'circle-color': [
        'match',
        ['get', 'color_on'],
        '#00FF00', '#00FF00',
        '#7FFF00', '#7FFF00',
        '#FFFF00', '#FFFF00',
        '#FF6900', '#FF6900',
        '#FF0000'
      ]
    }, 'circle', {
      visibility: 'visible'
    });
    this.mapService.drawGeojson('stopsWalk', {
      type: 'FeatureCollection',
      features: feats
    }, {
      // make circles larger as the user zooms from z12 to z22
      'circle-radius': {
        base: 1.75,
        stops: [[12, 10], [22, 180]]
      },
      'circle-color': [
        'match',
        ['get', 'color_walk'],
        '#00FF00', '#00FF00',
        '#7FFF00', '#7FFF00',
        '#FFFF00', '#FFFF00',
        '#FF6900', '#FF6900',
        '#FF0000'
      ]
    }, 'circle', {
      visibility: 'none'
    });
    this.mapService.drawGeojson('stopsPopOff', {
      type: 'FeatureCollection',
      features: feats
    }, {
      // make circles larger as the user zooms from z12 to z22
      'circle-radius': {
        base: 1.75,
        stops: [[12, 10], [22, 180]]
      },
      'circle-color': [
        'match',
        ['get', 'color_off'],
        '#00FF00', '#00FF00',
        '#7FFF00', '#7FFF00',
        '#FFFF00', '#FFFF00',
        '#FF6900', '#FF6900',
        '#FF0000'
      ]
    }, 'circle', {
      visibility: 'none'
    });
    this.mapService.drawGeojson('stopsBike', {
      type: 'FeatureCollection',
      features: feats
    }, {
      // make circles larger as the user zooms from z12 to z22
      'circle-radius': {
        base: 1.75,
        stops: [[12, 10], [22, 180]]
      },
      'circle-color': [
        'match',
        ['get', 'color_bike'],
        '#00FF00', '#00FF00',
        '#7FFF00', '#7FFF00',
        '#FFFF00', '#FFFF00',
        '#FF6900', '#FF6900',
        '#FF0000'
      ]
    }, 'circle', {
      visibility: 'none'
    });
    // this.mapService.moveLayers('stopsLine', 'stopsPopOn');
  }
  choose(event) {
    this.defaultChoice = event;
    this.mapService.deletePointPulsingDot('zoomStop');
    this.mapService.setVisibilityLayer('stopsPopOn', false);
    this.mapService.setVisibilityLayer('stopsBike', false);
    this.mapService.setVisibilityLayer('stopsPopOff', false);
    this.mapService.setVisibilityLayer('stopsWalk', false);
    this.average = this.midOn;
    switch (event) {
      case 'on':
        this.mapService.setVisibilityLayer('stopsPopOn', true);
        this.mapService.moveLayers('stopsLine', 'stopsPopOn');
        this.average = this.midOn;
        break;
      case 'off':
        this.mapService.setVisibilityLayer('stopsPopOff', true);
        this.mapService.moveLayers('stopsLine', 'stopsPopOff');
        this.average = this.midOff;
        break;
      case 'walk':
        this.mapService.setVisibilityLayer('stopsWalk', true);
        this.mapService.moveLayers('stopsLine', 'stopsWalk');
        this.average = this.midWalk;
        break;
      case 'bike':
        this.mapService.setVisibilityLayer('stopsBike', true);
        this.mapService.moveLayers('stopsLine', 'stopsBike');
        this.average = this.midBike;
        break;
      default:
        break;
    }
    if (this.selectedStop) {
      this.zoom(this.selectedStop);
    }
  }
  /**
   *
   *
   * @memberof StopComponent
   * order stops by next_stop_id
   */
  orderStops() {
    let stops: Stop[] = JSON.parse(JSON.stringify(this.stops));
    const stopOrdred: Stop[] = [this.stops.find(s => s.prev_stop_id === 'null')];
    if (stopOrdred[0]) {
      stops.splice(0, 1);
      while (stops.length > 0) {
        const nextStp = stops.findIndex(s => s.stop_id === stops[stops.length - 1].next_stop_id);
        if (nextStp >= 0) {
          stopOrdred.push(stops[nextStp]);
          stops.splice(nextStp, 1);
        } else {
          stops = [];
        }
      }
    }
    if (stopOrdred.length === this.stops.length) {
      this.stops = stopOrdred;
    }
  }
  /**
   *
   *
   * @param {Stop} stop
   * @memberof StopComponent
   * zoom on stop by using a PulsingDot and stop color
   */
  zoom(stop: Stop) {
    this.selectedStop = stop;
    let columnColor = 'color_on';
    switch (this.defaultChoice) {

      case 'off':
        columnColor = 'color_off';
        break;
      case 'walk':
        columnColor = 'color_walk';
        break;
      case 'bike':
        columnColor = 'color_bike';
        break;
      default:
        break;
    }
    this.mapService.addPointPulsingDot('zoomStop', [{
      type: 'Feature',
      geometry: stop.geom,
      properties: { color: stop[columnColor] }
    }], stop[columnColor]);
    this.mapService.zoomTo(stop.geom);
  }
  /**
   *
   *
   * @param  column
   * @memberof StopComponent
   * caculate statistics to create colors of legend
   */
  getMaxMinMid(column): any {
    let max = 0;
    let min = 0;
    let sum = 0;
    this.stops.forEach(s => {
      if (s.people_on > max) {
        max = s.people_on;
      }
      if (s[column] < min) {
        min = s[column];
      }
      sum += s[column];
    });
    const mid = sum / this.stops.length;
    return { mini: min, maxi: max, midel: mid };
  }
  /**
   *
   *
   * @param  columnColor
   * @param  stats
   * @param  colors
   * @param  columnStat
   * @memberof StopComponent
   * caculate statistics to create colors of legend
   */
  setColorsByStatColumn(columnStat, columnColor, stats, colors) {
    const classs: any[] = [stats.mini, stats.mini + (stats.midel - stats.mini) / 2,
    stats.midel, stats.midel + (stats.maxi - stats.midel) / 2, stats.maxi];
    this.stops.forEach(st => {
      if (st[columnStat] < classs[1]) {
        st[columnColor] = colors[0];
      }
      if (st[columnStat] > classs[3]) {
        st[columnColor] = colors[4];
      }
      for (let i = 1; i < classs.length - 1; i++) {
        if ((st[columnStat] >= classs[i - 1]) && (st[columnStat] < classs[i])) {
          st[columnColor] = colors[i - 1];
        }
      }
    });
  }
  /**
   *
   *
   * @memberof StopComponent
   * caculate statistics to create colors of legend
   */
  addColors() {
    const statOn = this.getMaxMinMid('people_on');
    const colors: string[] = ['#00FF00',
      '#7FFF00',
      '#FFFF00',
      '#FF6900',
      '#FF0000'];
    this.setColorsByStatColumn('people_on', 'color_on', statOn, colors);
    const statOff = this.getMaxMinMid('people_off');
    this.setColorsByStatColumn('people_off', 'color_off', statOff, colors);
    const statBike = this.getMaxMinMid('reach_pop_30_bike');
    this.setColorsByStatColumn('reach_pop_30_bike', 'color_bike', statBike, colors.reverse());
    const statWalk = this.getMaxMinMid('reach_pop_30_walk');
    this.setColorsByStatColumn('reach_pop_30_walk', 'color_walk', statWalk, colors.reverse());
    this.midOn = statOn.midel;
    this.midWalk = statWalk.midel;
    this.midBike = statBike.midel;
    this.midOff = statOff.midel;
    this.average = this.midOn;
  }
  /**
   *
   *
   * @memberof StopComponent
   * Create the line of all stops
   * @returns geojson LineString
   */
  createStopLine(): any {
    const geojson = {
      type: 'FeatureCollection',
      features: [{
        type: 'Feature',
        geometry: {
          type: 'LineString',
          properties: {},
          coordinates: []
        }
      }]
    };
    this.stops.forEach(s => {
      geojson.features[0].geometry.coordinates.push(s.geom.coordinates);
    });
    return geojson;
  }
  /**
   *
   * @param {string} text
   * @memberof StopComponent
   * search stops by name and filter map
   */
  filter(text: string) {
    this.mapService.deletePointPulsingDot('zoomStop');
    if (text !== '') {
      this.stops = JSON.parse(JSON.stringify(
        this.stopsOriginal.filter(s => s.name.toLowerCase().indexOf(this.searchTxt.toLowerCase()) !== -1)));
    } else {
      this.stops = JSON.parse(JSON.stringify(this.stopsOriginal));
    }
    const feats: any[] = [];
    this.stops.forEach(s => {
      feats.push({
        type: 'Feature',
        geometry: s.geom,
        properties: {
          name: s.name,
          color_on: s.color_on,
          color_off: s.color_off,
          color_bike: s.color_bike,
          color_walk: s.color_walk
        }
      });
    });
    this.setLayersData({
      type: 'FeatureCollection',
      features: feats
    });
  }
}
