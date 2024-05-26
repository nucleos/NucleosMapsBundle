'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _stimulus = require("@hotwired/stimulus");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var _default = exports["default"] = /*#__PURE__*/function (_Controller) {
  function _default() {
    (0, _classCallCheck2["default"])(this, _default);
    return _callSuper(this, _default, arguments);
  }
  (0, _inherits2["default"])(_default, _Controller);
  return (0, _createClass2["default"])(_default, [{
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
}(_stimulus.Controller);
(0, _defineProperty2["default"])(_default, "values", {
  latitude: Number,
  longitude: Number,
  zoom: Number,
  height: Number,
  title: String
});