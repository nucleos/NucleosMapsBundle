export default function GoogleMaps(element, options) {
  const defaultOptions = {
    zoom: 13,
    navigationControl: false,
    mapTypeControl: false,
    scaleControl: false,
    draggable: false,
    scrollwheel: false,
    title: false,
    icon: false,
    apiKey: ''
  };

  this.element = element;
  this.options = {...defaultOptions, ...options};

  const createMap = () => {
    loadScript().then(() => {
      const options = this.options;
      // eslint-disable-next-line
      options.mapTypeId = google.maps.MapTypeId.ROADMAP;

      options.center = {
        lng: this.options.center.longitude,
        lat: this.options.center.latitude
      };

      // eslint-disable-next-line
      this.map = new google.maps.Map(this.element, options);

      setMarker(this.options.center);
    });
  }

  const loadScript = async () => {
    function get(src) {
      return new Promise(function (resolve, reject) {
        const el = document.createElement("script");
        el.async = true;
        el.addEventListener("error", function () {
          reject(src);
        }, false);
        el.src = src;
        (document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0]).appendChild(el);

        window.googleMapsInitialized = function () {
          resolve(src);
        };
      });
    }

    const myPromises = await get("https://maps.googleapis.com/maps/api/js?key=" + this.options.apiKey + "&callback=googleMapsInitialized");

    return await Promise.all(myPromises);
  }

  const setMarker = (position) => {
    let markerOptions = {
      map: this.map,
      position: position
    };

    if (this.options.title) {
      markerOptions.title = this.options.title;
    }

    if (this.options.icon) {
      // eslint-disable-next-line
      markerOptions.icon = new google.maps.MarkerImage(options.icon);
    }

    // eslint-disable-next-line
    return new google.maps.Marker(markerOptions);
  }

  createMap();
}

// Bind
const weakMap = new WeakMap();

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-googlemaps]').forEach((element) => {
    if (weakMap.has(element) && weakMap.get(element).googleMap) {
      return;
    }

    const options = JSON.parse(element.dataset.googlemaps || '{}');

    weakMap.set(element, {
      googleMap: new GoogleMaps(element, options)
    });
  });
});
