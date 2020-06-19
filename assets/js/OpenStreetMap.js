import 'leaflet/dist/leaflet.css'
import 'leaflet-extra-markers/dist/css/leaflet.extra-markers.min.css'

import L from 'leaflet';
import 'leaflet-extra-markers';

export default function OpenStreetMap(element, options) {
  const defaultOptions = {
    zoom: 13
  };

  this.element = element;
  this.options = {...defaultOptions, ...options};

  const createMap = () => {
    const position = [this.options.center.latitude, this.options.center.longitude];

    const options = this.options;
    options.center = position;

    this.map = L.map(this.element, options);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    setMarker(position);
  }

  const setMarker = (position) => {
    const icon = L.ExtraMarkers.icon({
      icon: 'fa-circle-o',
      markerColor: 'blue',
      shape: 'circle',
      prefix: 'fa'
    });

    const options = {
      icon: icon,
    };

    const marker = L.marker(position, options).addTo(this.map);

    if (this.options.title) {
      marker
        .bindPopup(this.options.title)
        .openPopup();
    }

    return marker;
  }

  createMap();
}


// Bind
const weakMap = new WeakMap();

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-openstreetmap]').forEach((element) => {
    if (weakMap.has(element) && weakMap.get(element).openStreetMap) {
      return;
    }

    const options = JSON.parse(element.dataset.openstreetmap || '{}');

    weakMap.set(element, {
      openStreetMap: new OpenStreetMap(element, options)
    });
  });
});
