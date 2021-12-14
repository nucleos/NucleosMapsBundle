'use strict';

import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
    static values = {
        latitude: Number,
        longitude: Number,
        zoom: Number,
        height: Number,
        title: String,
    };

    connect() {
        let position = [this.latitudeValue, this.longitudeValue];

        let options = {
            center: position,
            zoom: this.zoomValue,
        };

        import('leaflet').then((L) => {
            this.element.style.height = this.heightValue + 'px';

            this.map = L.map(this.element, options);
            const map = this.map;

            let layer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            }).addTo(this.map);

            import('leaflet-extra-markers').then((LM) => {
                const icon = LM.ExtraMarkers.icon({
                    icon: 'fa-circle-o',
                    markerColor: 'blue',
                    shape: 'circle',
                    prefix: 'fa',
                });

                const markerOptions = {
                    icon: icon,
                };

                let marker = this._createMarker(L, map, position, markerOptions);

                this._dispatchEvent('openstreetmap:addMarker', { map: map, layer: layer, marker: marker });
            });

            this._dispatchEvent('openstreetmap:connect', { map: map, layer: layer });
        });
    }

    _createMarker(L, map, position, markerOptions) {
        let marker = L.marker(position, markerOptions).addTo(map);

        if (this.titleValue) {
            marker.bindPopup(this.titleValue);

            let isClicked = false;

            marker.on({
                mouseover: function () {
                    if (!isClicked) {
                        this.openPopup();
                    }
                },
                mouseout: function () {
                    if (!isClicked) {
                        this.closePopup();
                    }
                },
                click: function () {
                    isClicked = true;
                    this.openPopup();
                },
            });

            map.on({
                click: function () {
                    isClicked = false;
                },
                popupclose: function () {
                    isClicked = false;
                },
            });
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
