'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _stimulus = require("stimulus");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var _default = /*#__PURE__*/function (_Controller) {
  (0, _inherits2["default"])(_default, _Controller);

  var _super = _createSuper(_default);

  function _default() {
    (0, _classCallCheck2["default"])(this, _default);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(_default, [{
    key: "connect",
    value: function connect() {
      var _this = this;

      var position = [this.latitudeValue, this.longitudeValue];
      var options = {
        center: position,
        zoom: this.zoomValue
      };
      Promise.resolve().then(function () {
        return _interopRequireWildcard(require('leaflet'));
      }).then(function (L) {
        _this.element.style.height = _this.heightValue + 'px';
        _this.map = L.map(_this.element, options);
        var map = _this.map;
        var layer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(_this.map);
        Promise.resolve().then(function () {
          return _interopRequireWildcard(require('leaflet-extra-markers'));
        }).then(function (LM) {
          var icon = LM.ExtraMarkers.icon({
            icon: 'fa-circle-o',
            markerColor: 'blue',
            shape: 'circle',
            prefix: 'fa'
          });
          var markerOptions = {
            icon: icon
          };

          var marker = _this._createMarker(L, map, position, markerOptions);

          _this._dispatchEvent('openstreetmap:addMarker', {
            map: map,
            layer: layer,
            marker: marker
          });
        });

        _this._dispatchEvent('openstreetmap:connect', {
          map: map,
          layer: layer
        });
      });
    }
  }, {
    key: "_createMarker",
    value: function _createMarker(L, map, position, markerOptions) {
      var marker = L.marker(position, markerOptions).addTo(map);

      if (this.titleValue) {
        marker.bindPopup(this.titleValue);
        var isClicked = false;
        marker.on({
          mouseover: function mouseover() {
            if (!isClicked) {
              this.openPopup();
            }
          },
          mouseout: function mouseout() {
            if (!isClicked) {
              this.closePopup();
            }
          },
          click: function click() {
            isClicked = true;
            this.openPopup();
          }
        });
        map.on({
          click: function click() {
            isClicked = false;
          },
          popupclose: function popupclose() {
            isClicked = false;
          }
        });
      }

      return marker;
    }
  }, {
    key: "disconnect",
    value: function disconnect() {
      if (!this.map) {
        return;
      }

      this.map.off();
      this.map.remove();
    }
  }, {
    key: "_dispatchEvent",
    value: function _dispatchEvent(name) {
      var payload = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var canBubble = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var cancelable = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var userEvent = document.createEvent('CustomEvent');
      userEvent.initCustomEvent(name, canBubble, cancelable, payload);
      this.element.dispatchEvent(userEvent);
    }
  }]);
  return _default;
}(_stimulus.Controller);

exports["default"] = _default;
(0, _defineProperty2["default"])(_default, "values", {
  latitude: Number,
  longitude: Number,
  zoom: Number,
  height: Number,
  title: String
});