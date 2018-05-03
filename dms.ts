/**
 * dms module
 * @module dms
 */

// Just return a value to define the module export.
// This example returns an object, but the module
// can return a function as the exported value.

// Matches DMS DmsCoordinates
// http://regexpal.com/?flags=gim&regex=^%28-%3F\d%2B%28%3F%3A\.\d%2B%29%3F%29[%C2%B0%3Ad]%3F\s%3F%28%3F%3A%28\d%2B%28%3F%3A\.\d%2B%29%3F%29[%27%E2%80%B2%3A]%3F\s%3F%28%3F%3A%28\d%2B%28%3F%3A\.\d%2B%29%3F%29[%22%E2%80%B3]%3F%29%3F%29%3F\s%3F%28[NSEW]%29%3F&input=40%3A26%3A46N%2C79%3A56%3A55W%0A40%3A26%3A46.302N%2079%3A56%3A55.903W%0A40%C2%B026%E2%80%B247%E2%80%B3N%2079%C2%B058%E2%80%B236%E2%80%B3W%0A40d%2026%E2%80%B2%2047%E2%80%B3%20N%2079d%2058%E2%80%B2%2036%E2%80%B3%20W%0A40.446195N%2079.948862W%0A40.446195%2C%20-79.948862%0A40%C2%B0%2026.7717%2C%20-79%C2%B0%2056.93172%0A
const dmsRe = /^(-?\d+(?:\.\d+)?)[°:d]?\s?(?:(\d+(?:\.\d+)?)['′ʹ:]?\s?(?:(\d+(?:\.\d+)?)["″ʺ]?)?)?\s?([NSEW])?/i;
// Results of match will be [full coords string, Degrees, minutes (if any), seconds (if any), hemisphere (if any)]
// E.g., ["40:26:46.302N", "40", "26", "46.302", "N"]
// E.g., ["40.446195N", "40.446195", undefined, undefined, "N"]

export type Direction = "W" | "E" | "S" | "N";

/**
 * Removes the decimal part of a number without rounding up.
 * @param {number} n
 * @returns {number}
 * @private
 */
function truncate(n: number) {
    return n > 0 ? Math.floor(n) : Math.ceil(n);
}

export class Dms {
    // tslint:disable-next-line:variable-name
    private _dd: number;
    // tslint:disable-next-line:variable-name
    private _hemisphere: Direction;

    /**
     * Value in decimal degrees
     * @member {number}
     * @readonly
     */
    public get dd(): number {
        return this._dd;
    }

    /**
     * Hemisphere
     * @member {string}
     * @readonly
     */
    public get hemisphere(): Direction {
        return this._hemisphere;
    }

    /**
     * @constructor module:dms.Dms
     * @param {number} dd
     * @param {string} longOrLat
     */
    constructor(dd: number, longOrLat: string) {
        this._dd = dd;
        this._hemisphere = /^[WE]|(?:lon)/i.test(longOrLat) ? dd < 0 ? "W" : "E" : dd < 0 ? "S" : "N";
    }
    /**
     * Returns the DMS parts as an array.
     * The first three elements of the returned array are numbers:
     * degrees, minutes, and seconds respectively. The fourth
     * element is a string indicating the hemisphere: "N", "S", "E", or "W".
     * @returns {Array.<(number|string)>}
     * @deprecated
     */
    public getDmsArray(): [number, number, number, Direction] {
        return this.dmsArray;
    }

    /**
     * Returns the DMS parts as an array.
     * The first three elements of the returned array are numbers:
     * degrees, minutes, and seconds respectively. The fourth
     * element is a string indicating the hemisphere: "N", "S", "E", or "W".
     * @returns {Array.<(number|string)>}
     */
    get dmsArray(): [number, number, number, Direction] {
        const absDD = Math.abs(this._dd);
        const degrees = truncate(absDD);
        const minutes = truncate((absDD - degrees) * 60);
        const seconds = (absDD - degrees - minutes / 60) * Math.pow(60, 2);
        return [degrees, minutes, seconds, this._hemisphere];
    }
    /**
     * Returns the DMS value as a string.
     * @returns {string}
     */
    public toString(): string {
        const dmsArray = this.getDmsArray();
        return `${dmsArray[0]}°${dmsArray[1]}′${dmsArray[2]}″ ${dmsArray[3]}`;
    }
}

/**
 * @typedef {Object} DmsArrays
 * @property {Array.<(number|string)>} longitude
 * @property {Array.<(number|string)>} latitude
 */

export default class DmsCoordinates {
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
    public static dmsRe: RegExp = dmsRe;
    // tslint:disable-next-line:variable-name
    private _longitude: Dms;
    // tslint:disable-next-line:variable-name
    private _latitude: Dms;

    /**
     * Longitude
     * @type {module:dms.Dms} longitude - Longitude (X coordinate);
     */
    get longitude(): Dms {
        return this._longitude;
    }
    /**
     * Latitude
     * @type {module:dms.Dms} longitude - Latitude (y coordinate);
     */
    get latitude(): Dms {
        return this._latitude;
    }
    /**
     * Represents a location on the earth in WGS 1984 coordinates.
     * @constructor module:dms.DmsCoordinates
     * @param {number} latitude - WGS 84 Y coordinates
     * @param {number} longitude - WGS 84 X coordinates
     * @throws {TypeError} - latitude and longitude must be numbers.
     * @throws {RangeError} - latitude must be between -180 and 180, and longitude between -90 and 90. Neither can be NaN.
     */
    constructor(private lat: number, private lon: number) {
        if (typeof lat !== "number" || typeof lon !== "number") {
            throw TypeError("The longitude and latitude parameters must be numbers.");
        }
        if (isNaN(lon) || lon < -180 || lon > 180) {
            throw RangeError("longitude must be between -180 and 180");
        }
        if (isNaN(lat) || lat < -90 || lat > 90) {
            throw RangeError("latitude must be between -90 and 90");
        }
        this._longitude = new Dms(lon, "long");
        this._latitude = new Dms(lat, "lat");
    }

    /**
     * Returns an object containing arrays containing degree / minute / second components.
     * @returns {DmsArrays}
     * @deprecated
     */
    public getDmsArrays() {
        return this.dmsArrays;
    }

    /**
     * Returns an object containing arrays containing degree / minute / second components.
     * @type {DmsArrays}
     */
    public get dmsArrays() {
        return {
            longitude: this.longitude.getDmsArray(),
            latitude: this.latitude.getDmsArray(),
        };
    }

    /**
     * Returns the coordinates to a comma-separated string.
     * @returns {string}
     */
    public toString() {
        return [this.latitude, this.longitude].join(", ");
    }
}

/**
 * Parses a Degrees Minutes Seconds string into a Decimal Degrees number.
 * @param {string} dmsStr A string containing a coordinate in either DMS or DD format.
 * @return {Number} If dmsStr is a valid coordinate string, the value in decimal degrees will be returned. Otherwise NaN will be returned.
 */
export function parseDms(dmsStr: string): number {
    let output: number = NaN;
    const dmsMatch = dmsRe.exec(dmsStr);
    if (dmsMatch) {
        const degrees = Number(dmsMatch[1]);

        const minutes = typeof (dmsMatch[2]) !== "undefined" ? Number(dmsMatch[2]) / 60 : 0;
        const seconds = typeof (dmsMatch[3]) !== "undefined" ? Number(dmsMatch[3]) / 3600 : 0;
        const hemisphere = dmsMatch[4] || null;
        if (hemisphere !== null && /[SW]/i.test(hemisphere)) {
            output = -Math.abs(degrees) - minutes - seconds;
        } else {
            output = degrees + minutes + seconds;
        }
    }
    return output;
}
