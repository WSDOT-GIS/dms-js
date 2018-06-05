dms.js
======

[![Build Status](https://travis-ci.org/WSDOT-GIS/dms-js.svg?branch=master)](https://travis-ci.org/WSDOT-GIS/dms-js)

A JavaScript library for converting between decimal degrees and degrees, minutes, and seconds (DMS).

Installation
------------

```console
$ npm install dms-conversion
```

or

```console
$ yarn add dms-conversion
```

### Example ###

TypeScript example (from [Jasmine] test)

```typescript
import DmsCoordinates, { parseDms } from "dms-conversion";

describe("DmsCoordinates", () => {
    const long = -122.902336120571;
    const lat = 46.9845854731319;

    it(`(${lat}, ${long}) coordinates should be ~ 46°59′5″ N, 122°54′8″ W`, () => {
        const dmsCoords = new DmsCoordinates(lat, long);
        expect(dmsCoords instanceof DmsCoordinates).toBe(true);

        const {longitude, latitude} = dmsCoords.dmsArrays;

        let [d, m, s, nsew] = longitude;
        expect(d).toBe(122);
        expect(m).toBe(54);
        expect(Math.round(s)).toBe(8);
        expect(nsew).toBe("W");

        [d, m, s, nsew] = latitude;

        expect(d).toBe(46);
        expect(m).toBe(59);
        expect(Math.round(s)).toBe(5);
        expect(nsew).toBe("N");

        expect(dmsCoords.toString()).toMatch(/46°59′4.\d+″ N, 122°54′8.\d+″ W/i);
    });

    it("Regexp should work", () => {
        const v = ["46°59′5″ N", "122°54′8″ W"];
        v.forEach((s) =>
            expect(s.match(DmsCoordinates.dmsRe)).toBeTruthy(true)
        );
        const [x, y] = v.map(parseDms);
        expect(typeof x).toEqual("number");
        expect(typeof y).toEqual("number");
    });

    it("Invalid numbers should throw exception", () => {
        const x = parseDms("");
        expect(isNaN(x)).toBe(true);
        expect(() => {
            const dmsc = new DmsCoordinates(lat, x);
        }).toThrowError(RangeError);
        expect(() => {
            const dmsc = new DmsCoordinates("this should fail" as any, long);
        }).toThrowError(TypeError);

    });
});
```

Alternatives
------------

[nerik/formatcoords](https://github.com/nerik/formatcoords)

[Jasmine]:https://jasmine.github.io/