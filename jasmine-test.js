/// <reference path="dms.js"/>

describe("dms.js test suite", function () {
	it("test dms.js", function () {
		var long = -122.902336120571;
		var lat = 46.9845854731319;

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
	});
});