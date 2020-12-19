'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _stimulus = require("stimulus");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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

      this._prepareApi(this.data.get('apikey')).then(function () {
        var options = _objectSpread({}, _this.defaultOptions); // eslint-disable-next-line no-undef


        options.mapTypeId = google.maps.MapTypeId.ROADMAP;
        options.center = {
          lng: _this.data.get('longitude'),
          lat: _this.data.get('latitude')
        }; // eslint-disable-next-line

        _this.map = new google.maps.Map(_this.element, options);
        var map = _this.map;
        var markers = [_this._createMarker(options.center)];

        _this._dispatchEvent('googlemaps:connect', {
          map: map,
          markers: markers
        });
      });
    }
  }, {
    key: "_createMarker",
    value: function _createMarker(position) {
      var markerOptions = {
        map: this.map,
        position: position
      };

      if (this.data.get('title')) {
        markerOptions.title = this.data.get('title');
      }

      if (this.data.get('icon')) {
        // eslint-disable-next-line
        markerOptions.icon = new google.maps.MarkerImage(this.data.get('icon'));
      } // eslint-disable-next-line


      return new google.maps.Marker(markerOptions);
    }
  }, {
    key: "_prepareApi",
    value: function () {
      var _prepareApi2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(apiKey) {
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
                return get('https://maps.googleapis.com/maps/api/js?key=' + apiKey + '&callback=googleMapsInitialized');

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

      function _prepareApi(_x) {
        return _prepareApi2.apply(this, arguments);
      }

      return _prepareApi;
    }()
  }, {
    key: "disconnect",
    value: function disconnect() {
      if (!this.map) {
        return;
      }

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
(0, _defineProperty2["default"])(_default, "defaultOptions", {
  zoom: 13,
  navigationControl: false,
  mapTypeControl: false,
  scaleControl: false,
  draggable: false,
  scrollwheel: false,
  title: false,
  icon: false,
  apiKey: ''
});