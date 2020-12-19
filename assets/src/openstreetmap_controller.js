'use strict';

import { Controller } from 'stimulus';

export default class extends Controller {
    connect() {
        Promise.all([import('leaflet'), import('leaflet-extra-markers')]).then(([L, LM]) => {
            this.element.style.height = this.data.get('height') + 'px';

            let position = [this.data.get('latitude'), this.data.get('longitude')];
            let options = {
                center: position,
            };

            this.map = L.map(this.element, options);
            const map = this.map;

            let layer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            }).addTo(this.map);

            const icon = LM.ExtraMarkers.icon({
                icon: 'fa-circle-o',
                markerColor: 'blue',
                shape: 'circle',
                prefix: 'fa',
            });

            const markerOptions = {
                icon: icon,
            };

            let markers = [this._createMarker(L, position, markerOptions)];

            this._dispatchEvent('openstreetmap:connect', { map: map, layer: layer, markers: markers });
        });
    }

    _createMarker(L, position, markerOptions) {
        const marker = L.marker(position, markerOptions).addTo(this.map);

        if (this.data.get('title')) {
            marker.bindPopup(this.data.get('title')).openPopup();
        }
        return marker;
    }

    disconnect() {
        if (!this.map) {
            return;
        }

        this.map.off();
        this.map.remove();
    }

    _dispatchEvent(name, payload = null, canBubble = false, cancelable = false) {
        const userEvent = document.createEvent('CustomEvent');
        userEvent.initCustomEvent(name, canBubble, cancelable, payload);

        this.element.dispatchEvent(userEvent);
    }
}
