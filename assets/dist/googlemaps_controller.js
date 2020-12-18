'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _stimulus = require("stimulus");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function GoogleMaps(element, options) {
  var _this = this;

  var defaultOptions = {
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
  this.options = _objectSpread(_objectSpread({}, defaultOptions), options);

  var createMap = function createMap() {
    loadScript().then(function () {
      var options = _this.options; // eslint-disable-next-line

      options.mapTypeId = google.maps.MapTypeId.ROADMAP;
      options.center = {
        lng: _this.options.center.longitude,
        lat: _this.options.center.latitude
      }; // eslint-disable-next-line

      _this.map = new google.maps.Map(_this.element, options);
      setMarker(_this.options.center);
    });
  };

  var loadScript = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var get, myPromises;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              get = function _get(src) {
                return new Promise(function (resolve, reject) {
                  var el = document.createElement('script');
                  el.async = true;
                  el.addEventListener('error', function () {
                    reject(src);
                  }, false);
                  el.src = src;
                  (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(el);

                  window.googleMapsInitialized = function () {
                    resolve(src);
                  };
                });
              };

              _context.next = 3;
              return get('https://maps.googleapis.com/maps/api/js?key=' + _this.options.apiKey + '&callback=googleMapsInitialized');

            case 3:
              myPromises = _context.sent;
              _context.next = 6;
              return Promise.all(myPromises);

            case 6:
              return _context.abrupt("return", _context.sent);

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function loadScript() {
      return _ref.apply(this, arguments);
    };
  }();

  var setMarker = function setMarker(position) {
    var markerOptions = {
      map: _this.map,
      position: position
    };

    if (_this.options.title) {
      markerOptions.title = _this.options.title;
    }

    if (_this.options.icon) {
      // eslint-disable-next-line
      markerOptions.icon = new google.maps.MarkerImage(options.icon);
    } // eslint-disable-next-line


    return new google.maps.Marker(markerOptions);
  };

  createMap();
}

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
      var options = JSON.parse(this.element.getAttribute('data-googlemaps'));

      if (Array.isArray(options) && 0 === options.length) {
        options = {};
      }

      var googleMaps = new GoogleMaps(this.element, options);

      this._dispatchEvent('googlemaps:connect', {
        googleMaps: googleMaps
      });
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