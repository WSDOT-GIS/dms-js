var DmsCoordinates = require("../dms.js");

describe("DmsCoordinates", function () {
	var long = -122.902336120571;
	var lat = 46.9845854731319;

	it("(46.9845854731319, 46.9845854731319) coordinates should be ~ 46°59′5″ N, 122°54′8″ W", function () {
		var dmsCoords = new DmsCoordinates(lat, long);
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

	it("Regexp should work", function () {
		var v = ["46°59′5″ N", "122°54′8″ W"];
		v.forEach(function (s) {
			expect(s.match(DmsCoordinates.dmsRe)).toBeTruthy(true);
		});
	});

	it("Invalid numbers should throw exception", function () {
		var x = DmsCoordinates.parseDms("");
		expect(isNaN(x)).toBe(true);
		expect(function () {
			var dmsc = new DmsCoordinates(lat, x);
		}).toThrowError(RangeError);
		expect(function () {
			var dmsc = new DmsCoordinates("this should fail", long);
		}).toThrowError(TypeError);

	});
});