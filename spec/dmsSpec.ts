import DmsCoordinates, { parseDms } from "../dms";

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
    expect(s).toBeCloseTo(5, 0);
    expect(nsew).toBe("N");

    expect(dmsCoords.toString()).toMatch(/46°59′4.\d+″ N, 122°54′8.\d+″ W/i);
  });

  it("should be able to correclty parse DMS into decimal degrees", () => {
    const v = ["46°59′5″ N", "122°54′8″ W"];
    v.forEach(s => expect(s.match(DmsCoordinates.dmsRe)).toBeTruthy(true));
    const [y, x] = v.map(parseDms);
    expect(typeof x).toEqual("number");
    expect(typeof y).toEqual("number");
    expect(x).toBeCloseTo(long);
    expect(y).toBeCloseTo(lat);
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

  it("should be able to parse Greenwich Meridian coordinates correctly", () => {
    const dmsStringsWest = ["0°0′0″ N", "0°59′59″ W"];
    const dmsCoordsWest = dmsStringsWest.map(parseDms);
    const dmsStringsEast = ["0°0′0″ N", "0°59′59″ E"];
    const dmsCoordsEast = dmsStringsEast.map(parseDms);
    // console.log(dmsCoordsWest, dmsCoordsEast);

    expect(dmsCoordsEast[0]).toEqual(dmsCoordsWest[0]);
    expect(dmsCoordsWest[1]).toBeLessThan(0);
  });
});
