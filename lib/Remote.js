// Generated by CoffeeScript 1.4.0
(function() {
  var qs,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  qs = require('querystring');

  module.exports.Remote = (function() {

    function Remote(options) {
      this.options = options != null ? options : {};
      this.press = __bind(this.press, this);

      this.parseOptions = __bind(this.parseOptions, this);

      this.parseOptions();
      this.http = require('http');
      return this;
    }

    Remote.prototype.parseOptions = function() {
      var _base, _base1, _base2, _ref, _ref1, _ref2;
      if (this.options.code == null) {
        throw 'You must specify at least the remote code';
      }
      if ((_ref = (_base = this.options).host) == null) {
        _base.host = 'hd1.freebox.fr';
      }
      if ((_ref1 = (_base1 = this.options).port) == null) {
        _base1.port = 80;
      }
      return (_ref2 = (_base2 = this.options).path) != null ? _ref2 : _base2.path = '/pub/remote_control';
    };

    Remote.prototype.press = function(options, fn) {
      var req, _base, _base1, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8;
      if (options == null) {
        options = {};
      }
      if (fn == null) {
        fn = (function() {});
      }
      if (typeof options === 'string') {
        options = {
          key: options
        };
      }
      if (options.key == null) {
        throw 'You must specify at least the key';
      }
      if ((_ref = options.basePath) == null) {
        options.basePath = this.options.path;
      }
      if ((_ref1 = options.args) == null) {
        options.args = {};
      }
      if ((_ref2 = (_base = options.args).key) == null) {
        _base.key = options.key;
      }
      if ((_ref3 = (_base1 = options.args).code) == null) {
        _base1.code = this.options.code;
      }
      if ((_ref4 = options.query) == null) {
        options.query = qs.stringify(options.args);
      }
      if ((_ref5 = options.path) == null) {
        options.path = "" + options.basePath + "?" + options.query;
      }
      if ((_ref6 = options.host) == null) {
        options.host = this.options.host;
      }
      if ((_ref7 = options.port) == null) {
        options.port = this.options.port;
      }
      if ((_ref8 = options.method) == null) {
        options.method = 'GET';
      }
      req = this.http.request(options);
      req.on('error', function(err) {
        return fn(err, {});
      });
      req.end();
      return req.on('response', function(response) {
        var buffer;
        buffer = '';
        response.on('data', function(chunk) {
          return buffer += chunk;
        });
        return response.on('end', function() {
          switch (response.statusCode) {
            case 200:
              return fn(null, buffer);
            default:
              return fn({
                "code": "BADSTATUSCODE",
                "message": response.statusCode
              }, buffer);
          }
        });
      });
    };

    return Remote;

  })();

}).call(this);
