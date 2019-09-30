import { Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
@Injectable({
  providedIn: 'root'
})
export class MapService {
  public map: mapboxgl.Map;
  constructor() { }
  deletePointPulsingDot(name) {
    if (this.map.getLayer(name)) {
      this.map.removeLayer(name);
    }
  }
  addPointPulsingDot(name?, feats?, color?) {
    if (this.map.getLayer(name)) {
      this.map.removeLayer(name);
    }
    const size = 200;
    const mapObject = this.map;
    const pulsingDot = {
      width: size,
      height: size,
      data: new Uint8Array(size * size * 4),
      onAdd: null,
      render: null
    };
    pulsingDot.onAdd = function() {
      const canvas = document.createElement('canvas');
      canvas.width = this.width;
      canvas.height = this.height;
      this.context = canvas.getContext('2d');
    };
    pulsingDot.render = function() {
      const duration = 1000;
      const t = (performance.now() % duration) / duration;

      const radius = size / 2 * 0.3;
      const outerRadius = size / 2 * 0.7 * t + radius;
      const context = this.context;

      // draw outer circle
      context.clearRect(0, 0, this.width, this.height);
      context.beginPath();
      context.arc(this.width / 2, this.height / 2, outerRadius, 0, Math.PI * 2);
      context.fillStyle = 'rgba(255, 200, 200,' + (1 - t) + ')';
      context.fill();

      // draw inner circle
      context.beginPath();
      context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2);
      context.fillStyle = color;
      context.strokeStyle = 'white';
      context.lineWidth = 2 + 4 * (1 - t);
      context.fill();
      context.stroke();

      // update this image's data with data from the canvas
      this.data = context.getImageData(0, 0, this.width, this.height).data;

      // keep the map repainting
      mapObject.triggerRepaint();

      // return `true` to let the map know that the image was updated
      return true;
    };
    if (this.map.hasImage('pulsing-dot')) {
      this.map.removeImage('pulsing-dot');
    }
    this.map.addImage('pulsing-dot', pulsingDot, { pixelRatio: 2 });
    const nameSource = name + Math.floor(Math.random() * Math.floor(100000));
    this.map.addSource(nameSource, {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: feats
      }
    });
    this.map.addLayer({
      id: name,
      type: 'symbol',
      source: nameSource,
      layout: {
        'icon-image': 'pulsing-dot'
      }
    });
  }
  zoomTo(geometry) {
    const coordinates = geometry.coordinates;
    this.map.flyTo({
      center: coordinates
    });
  }
  drawGeojson(name: string, geojson: any, paintLayer?: any, typeLayer?, layoutLayer?) {
    const check = this.checkIfMapboxStyleIsLoaded();
    if (!check) {
      // It's not safe to manipulate layers yet, so wait 200ms and then check again
      setTimeout(() => {
        this.drawGeojson(name, geojson, paintLayer, typeLayer, layoutLayer);
      }, 200);
      return;
    }
    const layer = {
      id: name,
      type: typeLayer,
      source: {
        type: 'geojson',
        data: geojson
      }
    };
    if (layoutLayer) {
      // tslint:disable-next-line: no-string-literal
      layer['layout'] = layoutLayer;
    }
    if (paintLayer) {
      // tslint:disable-next-line: no-string-literal
      layer['paint'] = paintLayer;
    }
    this.map.addLayer(layer);
  }
  checkIfMapboxStyleIsLoaded() {
    if (this.map.isStyleLoaded()) {
      return true; // When it is safe to manipulate layers
    } else {
      return false; // When it is not safe to manipulate layers
    }
  }
  moveLayers(firstId, secondId) {
    const check = this.checkIfMapboxStyleIsLoaded();
    if (!check) {
      // It's not safe to manipulate layers yet, so wait 200ms and then check again
      setTimeout(() => {
        this.moveLayers(firstId, secondId);
      }, 200);
      return;
    }
    this.map.moveLayer(firstId, secondId);
  }
  setVisibilityLayer(id, visible) {
    this. map.setLayoutProperty(id, 'visibility', visible ? 'visible' : 'none');
  }
  setLayerData(id, data) {
    this.map.getSource(id).setData(data);
  }
}
