'use strict';

import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
    static values = {
        latitude: Number,
        longitude: Number,
        zoom: Number,
        height: Number,
        title: String,
        icon: String,
        apiKey: String,
    };

    static defaultOptions = {
        zoom: 13,
        navigationControl: false,
        mapTypeControl: false,
        scaleControl: false,
        draggable: false,
        scrollwheel: false,
    };

    connect() {
        this._prepareApi(this.apiKeyValue).then(() => {
            this.element.style.height = this.heightValue + 'px';

            let options = {
                ...this.defaultOptions,
                latitude: this.latitudeValue,
                longitude: this.longitudeValue,
                zoom: this.zoomValue,
                height: this.heightValue,
                title: this.titleValue,
                apiKey: this.apiKeyValue,
                // eslint-disable-next-line no-undef
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                center: {
                    lng: this.longitudeValue,
                    lat: this.latitudeValue,
                },
            };

            // eslint-disable-next-line
            this.map = new google.maps.Map(this.element, options);
            const map = this.map;

            let markers = [this._createMarker(options.center)];

            this._dispatchEvent('googlemaps:connect', { map: map, markers: markers });
        });
    }

    _createMarker(position) {
        let markerOptions = {
            map: this.map,
            position: position,
        };

        if (this.titleValue) {
            markerOptions.title = this.titleValue;
        }

        if (this.iconValue) {
            // eslint-disable-next-line
            markerOptions.icon = new google.maps.MarkerImage(this.iconValue);
        }

        // eslint-disable-next-line
        return new google.maps.Marker(markerOptions);
    }

    async _prepareApi(apiKey) {
        function get(src) {
            return new Promise(function (resolve, reject) {
                const el = document.createElement('script');
                el.async = true;
                el.addEventListener(
                    'error',
                    function () {
                        reject(src);
                    },
                    false
                );
                el.src = src;
                (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(el);

                window.googleMapsInitialized = function () {
                    resolve(src);
                };
            });
        }

        const myPromises = await get(
            'https://maps.googleapis.com/maps/api/js?key=' + apiKey + '&callback=googleMapsInitialized'
        );

        return await Promise.all(myPromises);
    }

    disconnect() {
        if (!this.map) {
            return;
        }

        this.map.remove();
    }

    _dispatchEvent(name, payload = null, canBubble = false, cancelable = false) {
        const userEvent = document.createEvent('CustomEvent');
        userEvent.initCustomEvent(name, canBubble, cancelable, payload);

        this.element.dispatchEvent(userEvent);
    }
}
