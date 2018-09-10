(function (global, factory) {
   if (typeof define === "function" && define.amd) {
      define(['module', 'exports'], factory);
   } else if (typeof exports !== "undefined") {
      factory(module, exports);
   } else {
      var mod = {
         exports: {}
      };
      factory(mod, mod.exports);
      global.VueConst = mod.exports;
   }
})(this, function (module, exports) {
   'use strict';

   Object.defineProperty(exports, "__esModule", {
      value: true
   });

   var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
      return typeof obj;
   } : function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
   };

   function deepFreeze(obj) {
      var propNames = Object.getOwnPropertyNames(obj);
      for (var name in propNames) {
         var prop = obj[name];
         if ((typeof prop === 'undefined' ? 'undefined' : _typeof(prop)) === 'object' && prop !== null) {
            deepFreeze(prop);
         }
      }
      return Object.freeze(obj);
   }

   function error(message) {
      console.error(message);
   }

   exports.default = {
      install: function install(Vue) {
         Vue.mixin({
            beforeCreate: function beforeCreate() {
               var _this = this;

               var constants = this.$options.const;
               if (!constants) return;
               this.$options.computed = this.$options.computed || {};

               var _loop = function _loop(key) {
                  if (key !== key.toUpperCase()) {
                     error('Constant \'' + key + '\' must be all upper case');
                     return {
                        v: void 0
                     };
                  }
                  if (constants.hasOwnProperty(key)) {
                     var frozen = deepFreeze(constants[key]);
                     _this.$options.computed[key] = {
                        get: function get() {
                           return frozen;
                        },
                        set: function set() {
                           return error('Constant \'' + key + '\' cannot be changed');
                        }
                     };
                  }
               };

               for (var key in constants) {
                  var _ret = _loop(key);

                  if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
               }
            }
         });
      }
   };
   module.exports = exports['default'];
});