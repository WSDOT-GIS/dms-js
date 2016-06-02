/*global define,module*/
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    /**
     * dms module
     * @module dms
     */
    // Just return a value to define the module export.
    // This example returns an object, but the module
    // can return a function as the exported value.
    // Matches DMS DmsCoordinates
    // http://regexpal.com/?flags=gim&regex=^%28-%3F\d%2B%28%3F%3A\.\d%2B%29%3F%29[%C2%B0%3Ad]%3F\s%3F%28%3F%3A%28\d%2B%28%3F%3A\.\d%2B%29%3F%29[%27%E2%80%B2%3A]%3F\s%3F%28%3F%3A%28\d%2B%28%3F%3A\.\d%2B%29%3F%29[%22%E2%80%B3]%3F%29%3F%29%3F\s%3F%28[NSEW]%29%3F&input=40%3A26%3A46N%2C79%3A56%3A55W%0A40%3A26%3A46.302N%2079%3A56%3A55.903W%0A40%C2%B026%E2%80%B247%E2%80%B3N%2079%C2%B058%E2%80%B236%E2%80%B3W%0A40d%2026%E2%80%B2%2047%E2%80%B3%20N%2079d%2058%E2%80%B2%2036%E2%80%B3%20W%0A40.446195N%2079.948862W%0A40.446195%2C%20-79.948862%0A40%C2%B0%2026.7717%2C%20-79%C2%B0%2056.93172%0A
    var dmsRe = /^(-?\d+(?:\.\d+)?)[°:d]?\s?(?:(\d+(?:\.\d+)?)['′ʹ:]?\s?(?:(\d+(?:\.\d+)?)["″ʺ]?)?)?\s?([NSEW])?/i;
    // Results of match will be [full coords string, Degrees, minutes (if any), seconds (if any), hemisphere (if any)]
    // E.g., ["40:26:46.302N", "40", "26", "46.302", "N"]
    // E.g., ["40.446195N", "40.446195", undefined, undefined, "N"]
    /**
     * Removes the decimal part of a number without rounding up.
     * @param {number} n
     * @returns {number}
     */
    function truncate(n) {
        return n > 0 ? Math.floor(n) : Math.ceil(n);
    }
    var Dms = (function () {
        function Dms(dd, longOrLat) {
            this.dd = dd;
            this.hemisphere = /^[WE]|(?:lon)/i.test(longOrLat) ? dd < 0 ? "W" : "E" : dd < 0 ? "S" : "N";
        }
        /**
         * Returns the DMS parts as an array.
         * The first three elements of the returned array are numbers:
         * degrees, minutes, and seconds respectively. The fourth
         * element is a string indicating the hemisphere: "N", "S", "E", or "W".
         * @returns {Array.<(number|string)>}
         */
        Dms.prototype.getDmsArray = function () {
            var absDD = Math.abs(this.dd);
            var degrees = truncate(absDD);
            var minutes = truncate((absDD - degrees) * 60);
            var seconds = (absDD - degrees - minutes / 60) * Math.pow(60, 2);
            return [degrees, minutes, seconds, this.hemisphere];
        };
        ;
        /**
         * Returns the DMS value as a string.
         */
        Dms.prototype.toString = function () {
            var dmsArray = this.getDmsArray();
            return dmsArray[0] + "\u00B0" + dmsArray[1] + "\u2032" + dmsArray[2] + "\u2033 " + dmsArray[3];
        };
        ;
        return Dms;
    }());
    var DmsCoordinates = (function () {
        /**
         * Represents a location on the earth in WGS 1984 coordinates.
         * @constructor
         * @alias module:dms
         * @param {number} latitude - WGS 84 Y coordinates
         * @param {number} longitude - WGS 84 X coordinates
         * @throws {TypeError} - latitude and longitude must be numbers.
         * @throws {RangeError} - latitude must be between -180 and 180, and longitude between -90 and 90. Neither can be NaN.
         */
        function DmsCoordinates(latitude, longitude) {
            if (typeof latitude !== "number" || typeof longitude !== "number") {
                throw TypeError("The longitude and latitude parameters must be numbers.");
            }
            if (isNaN(longitude) || longitude < -180 || longitude > 180) {
                throw RangeError("longitude must be between -180 and 180");
            }
            if (isNaN(latitude) || latitude < -90 || latitude > 90) {
                throw RangeError("latitude must be between -90 and 90");
            }
            this.longitude = new Dms(longitude, "long");
            this.latitude = new Dms(latitude, "lat");
        }
        /**
         * @typedef {Object} DmsArrays
         * @property {Array.<(number|string)>} longitude
         * @property {Array.<(number|string)>} latitude
         */
        /**
         * Returns an object containing arrays containing degree / minute / second components.
         * @returns {DmsArrays}
         */
        DmsCoordinates.prototype.getDmsArrays = function () {
            return {
                longitude: this.longitude.getDmsArray(),
                latitude: this.latitude.getDmsArray()
            };
        };
        ;
        /**
         * Returns the coordinates to a comma-separated string.
         * @returns {string}
         */
        DmsCoordinates.prototype.toString = function () {
            return [this.latitude, this.longitude].join(", ");
        };
        ;
        /** Parses a Degrees Minutes Seconds string into a Decimal Degrees number.
         * @param {string} dmsStr A string containing a coordinate in either DMS or DD format.
         * @return {Number} If dmsStr is a valid coordinate string, the value in decimal degrees will be returned. Otherwise NaN will be returned.
         */
        DmsCoordinates.parseDms = function (dmsStr) {
            var output = NaN;
            var dmsMatch = dmsRe.exec(dmsStr);
            if (dmsMatch) {
                var degrees = Number(dmsMatch[1]);
                var minutes = typeof (dmsMatch[2]) !== "undefined" ? Number(dmsMatch[2]) / 60 : 0;
                var seconds = typeof (dmsMatch[3]) !== "undefined" ? Number(dmsMatch[3]) / 3600 : 0;
                var hemisphere = dmsMatch[4] || null;
                if (hemisphere !== null && /[SW]/i.test(hemisphere)) {
                    degrees = Math.abs(degrees) * -1;
                }
                if (degrees < 0) {
                    output = degrees - minutes - seconds;
                }
                else {
                    output = degrees + minutes + seconds;
                }
            }
            return output;
        };
        // Results of match will be [full coords string, Degrees, minutes (if any), seconds (if any), hemisphere (if any)]
        // E.g., ["40:26:46.302N", "40", "26", "46.302", "N"]
        // E.g., ["40.446195N", "40.446195", undefined, undefined, "N"]
        /**
         * A regular expression matching DMS coordinate.
         * Example matches:
         * E.g., ["40:26:46.302N", "40", "26", "46.302", "N"]
         * E.g., ["40.446195N", "40.446195", undefined, undefined, "N"]
         * @type {RegExp}
         * @static
         */
        DmsCoordinates.dmsRe = dmsRe;
        return DmsCoordinates;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = DmsCoordinates;
});
//# sourceMappingURL=dms.js.map