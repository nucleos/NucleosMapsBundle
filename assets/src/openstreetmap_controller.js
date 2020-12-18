'use strict';

import { Controller } from 'stimulus';

function OpenStreetMap(element, options) {
    const defaultOptions = {
        zoom: 13,
    };

    this.element = element;
    this.options = { ...defaultOptions, ...options };

    const position = [this.options.center.latitude, this.options.center.longitude];

    this.options.center = position;

    Promise.all([import('leaflet'), import('leaflet-extra-markers')]).then(([L, LM]) => {
        this.map = L.map(this.element, this.options);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
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

        const marker = L.marker(position, markerOptions).addTo(this.map);

        if (this.options.title) {
            marker.bindPopup(this.options.title).openPopup();
        }
    });
}

export default class extends Controller {
    connect() {
        let options = JSON.parse(this.element.getAttribute('data-openstreetmap'));
        if (Array.isArray(options) && 0 === options.length) {
            options = {};
        }

        const openStreetMap = new OpenStreetMap(this.element, options);

        this._dispatchEvent('openstreetmap:connect', { openStreetMap: openStreetMap });
    }

    _dispatchEvent(name, payload = null, canBubble = false, cancelable = false) {
        const userEvent = document.createEvent('CustomEvent');
        userEvent.initCustomEvent(name, canBubble, cancelable, payload);

        this.element.dispatchEvent(userEvent);
    }
}
