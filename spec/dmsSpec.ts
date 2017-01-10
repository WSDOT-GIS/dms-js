import { default as DmsCoordinates, parseDms } from "../dms";

describe("DmsCoordinates", function () {
    const long = -122.902336120571;
    const lat = 46.9845854731319;

    it(`(${lat}, ${long}) coordinates should be ~ 46°59′5″ N, 122°54′8″ W`, function () {
        const dmsCoords = new DmsCoordinates(lat, long);
        expect(dmsCoords instanceof DmsCoordinates).toBe(true);

        const dmsArrays = dmsCoords.getDmsArrays();

        let [d, m, s, nsew] = dmsArrays.longitude;
        expect(d).toBe(122);
        expect(m).toBe(54);
        expect(Math.round(s)).toBe(8);
        expect(nsew).toBe("W");

        [d, m, s, nsew] = dmsArrays.latitude;

        expect(d).toBe(46);
        expect(m).toBe(59);
        expect(Math.round(s)).toBe(5);
        expect(nsew).toBe("N");

        expect(dmsCoords.toString().match(/46°59′4.\d+″ N, 122°54′8.\d+″ W/i)).toBeTruthy(dmsCoords.toString());
    });

    it("Regexp should work", function () {
        const v = ["46°59′5″ N", "122°54′8″ W"];
        v.forEach(s =>
            expect(s.match(DmsCoordinates.dmsRe)).toBeTruthy(true)
        );
        const xy = v.map(parseDms);
        expect(typeof xy[0]).toEqual("number");
        expect(typeof xy[1]).toEqual("number");
    });

    it("Invalid numbers should throw exception", function () {
        let x = parseDms("");
        expect(isNaN(x)).toBe(true);
        expect(function () {
            let dmsc = new DmsCoordinates(lat, x);
        }).toThrowError(RangeError);
        expect(function () {
            let dmsc = new DmsCoordinates("this should fail" as any, long);
        }).toThrowError(TypeError);

    });
});