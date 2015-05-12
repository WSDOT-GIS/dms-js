/*global describe, it, DmsCoordinates, expect, beforeEach*/
/// <reference path="../dms.js"/>

describe("DmsCoordinates", function () {
	var dmsCoords;
	var long = -122.902336120571;
	var lat = 46.9845854731319;

	beforeEach(function () {
		dmsCoords = new DmsCoordinates(lat, long);
	});

	it("(46.9845854731319, 46.9845854731319) coordinates should be ~ 46°59′5″ N, 122°54′8″ W", function () {
		expect(dmsCoords instanceof DmsCoordinates).toBe(true);

		var dmsArrays = dmsCoords.getDmsArrays();
		var longArray = dmsArrays.longitude, latArray = dmsArrays.latitude;
		expect(longArray[0]).toBe(122);
		expect(longArray[1]).toBe(54);
		expect(Math.round(longArray[2])).toBe(8);
		expect(longArray[3]).toBe("W");

		expect(latArray[0]).toBe(46);
		expect(latArray[1]).toBe(59);
		expect(Math.round(latArray[2])).toBe(5);
		expect(latArray[3]).toBe("N");

		expect(dmsCoords.toString().match(/46°59′4.\d+″ N, 122°54′8.\d+″ W/i)).toBeTruthy(true);
	});
});