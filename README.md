# dms-conversion

A JavaScript library for converting between decimal degrees and degrees, minutes, and seconds (DMS).

[![npm version](https://img.shields.io/npm/v/dms-conversion.svg)](https://www.npmjs.org/package/dms-conversion) [![npm license](https://img.shields.io/npm/l/dms-conversion.svg)](https://www.npmjs.org/package/dms-conversion)

[![Node.js CI](https://github.com/WSDOT-GIS/dms-js/actions/workflows/node.js.yml/badge.svg)](https://github.com/WSDOT-GIS/dms-js/actions/workflows/node.js.yml) [![GitHub issues](https://img.shields.io/github/issues/WSDOT-GIS/dms-js.svg)](https://github.com/WSDOT-GIS/dms-js/issues) [![GitHub](https://img.shields.io/github/forks/WSDOT-GIS/dms-js.svg?style=flat-square)](https://github.com/WSDOT-GIS/dms-js/forks)

## Installation

```console
npm install dms-conversion
```

### Example

TypeScript example (from [Jasmine] test)

<!-- spell:disable -->
```typescript
import DmsCoordinates, { parseDms } from "dms-conversion";

describe("DmsCoordinates", () => {
  const long = -122.902336120571;
  const lat = 46.9845854731319;

  it(`(${lat}, ${long}) coordinates should be ~ 46°59′5″ N, 122°54′8″ W`, () => {
    const dmsCoords = new DmsCoordinates(lat, long);
    expect(dmsCoords instanceof DmsCoordinates).toBe(true);

    const { longitude, latitude } = dmsCoords.dmsArrays;

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
    v.forEach((s) => expect(s.match(DmsCoordinates.dmsRe)).toBeTruthy(true));
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
<!-- spell:enable -->

## Alternatives

<!-- spell:disable -->
[nerik/formatcoords](https://github.com/nerik/formatcoords)
<!-- spell:enable -->

[jasmine]: https://jasmine.github.io/
