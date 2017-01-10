export declare type Direction = "W" | "E" | "S" | "N";
export declare class Dms {
    private _dd;
    private _hemisphere;
    /**
     * Value in decimal degrees
     * @member {number}
     * @readonly
     */
    readonly dd: number;
    /**
     * Hemisphere
     * @member {string}
     * @readonly
     */
    readonly hemisphere: Direction;
    /**
     * @constructor module:dms.Dms
     * @param {number} dd
     * @param {string} longOrLat
     */
    constructor(dd: number, longOrLat: string);
    /**
     * Returns the DMS parts as an array.
     * The first three elements of the returned array are numbers:
     * degrees, minutes, and seconds respectively. The fourth
     * element is a string indicating the hemisphere: "N", "S", "E", or "W".
     * @returns {Array.<(number|string)>}
     * @deprecated
     */
    getDmsArray(): [number, number, number, Direction];
    /**
     * Returns the DMS parts as an array.
     * The first three elements of the returned array are numbers:
     * degrees, minutes, and seconds respectively. The fourth
     * element is a string indicating the hemisphere: "N", "S", "E", or "W".
     * @returns {Array.<(number|string)>}
     */
    readonly dmsArray: [number, number, number, Direction];
    /**
     * Returns the DMS value as a string.
     * @returns {string}
     */
    toString(): string;
}
/**
 * @typedef {Object} DmsArrays
 * @property {Array.<(number|string)>} longitude
 * @property {Array.<(number|string)>} latitude
 */
export default class DmsCoordinates {
    private lat;
    private lon;
    /**
     * A regular expression matching DMS coordinate.
     * Example matches:
     * E.g., ["40:26:46.302N", "40", "26", "46.302", "N"]
     * E.g., ["40.446195N", "40.446195", undefined, undefined, "N"]
     * @type {RegExp}
     * @static
     */
    static dmsRe: RegExp;
    private _longitude;
    private _latitude;
    /**
     * Longitude
     * @type {module:dms.Dms} longitude - Longitude (X coordinate);
     */
    readonly longitude: Dms;
    /**
     * Latitude
     * @type {module:dms.Dms} longitude - Latitude (y coordinate);
     */
    readonly latitude: Dms;
    /**
     * Represents a location on the earth in WGS 1984 coordinates.
     * @constructor module:dms.DmsCoordinates
     * @param {number} latitude - WGS 84 Y coordinates
     * @param {number} longitude - WGS 84 X coordinates
     * @throws {TypeError} - latitude and longitude must be numbers.
     * @throws {RangeError} - latitude must be between -180 and 180, and longitude between -90 and 90. Neither can be NaN.
     */
    constructor(lat: number, lon: number);
    /**
     * Returns an object containing arrays containing degree / minute / second components.
     * @returns {DmsArrays}
     * @deprecated
     */
    getDmsArrays(): {
        longitude: [number, number, number, Direction];
        latitude: [number, number, number, Direction];
    };
    /**
     * Returns an object containing arrays containing degree / minute / second components.
     * @type {DmsArrays}
     */
    readonly dmsArrays: {
        longitude: [number, number, number, Direction];
        latitude: [number, number, number, Direction];
    };
    /**
     * Returns the coordinates to a comma-separated string.
     * @returns {string}
     */
    toString(): string;
}
/**
 * Parses a Degrees Minutes Seconds string into a Decimal Degrees number.
 * @param {string} dmsStr A string containing a coordinate in either DMS or DD format.
 * @return {Number} If dmsStr is a valid coordinate string, the value in decimal degrees will be returned. Otherwise NaN will be returned.
 */
export declare function parseDms(dmsStr: string): number;
