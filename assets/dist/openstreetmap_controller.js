'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _interopRequireWildcard2 = _interopRequireDefault(require("@babel/runtime/helpers/interopRequireWildcard"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _stimulus = require("stimulus");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

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

      Promise.all([Promise.resolve().then(function () {
        return (0, _interopRequireWildcard2["default"])(require('leaflet'));
      }), Promise.resolve().then(function () {
        return (0, _interopRequireWildcard2["default"])(require('leaflet-extra-markers'));
      })]).then(function (_ref) {
        var _ref2 = (0, _slicedToArray2["default"])(_ref, 2),
            L = _ref2[0],
            LM = _ref2[1];

        _this.element.style.height = _this.data.get('height') + 'px';
        var position = [_this.data.get('latitude'), _this.data.get('longitude')];
        var options = {
          center: position
        };
        _this.map = L.map(_this.element, options);
        var map = _this.map;
        var layer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(_this.map);
        var icon = LM.ExtraMarkers.icon({
          icon: 'fa-circle-o',
          markerColor: 'blue',
          shape: 'circle',
          prefix: 'fa'
        });
        var markerOptions = {
          icon: icon
        };
        var markers = [_this._createMarker(L, position, markerOptions)];

        _this._dispatchEvent('openstreetmap:connect', {
          map: map,
          layer: layer,
          markers: markers
        });
      });
    }
  }, {
    key: "_createMarker",
    value: function _createMarker(L, position, markerOptions) {
      var marker = L.marker(position, markerOptions).addTo(this.map);

      if (this.data.get('title')) {
        marker.bindPopup(this.data.get('title')).openPopup();
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