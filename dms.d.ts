declare type DmsArray = [number, number, number, string];
declare type Hemisphere = "N" | "S" | "E" | "W";
declare type DmsParseResult = [string, string, string, string, string];

declare class Dms {
    constructor(dd:number, logOrLat:string);
    dd:number;
    hemisphere:string;
    getDmsArray(): DmsArray;
    toString(): string;
}

declare class DmsCoordinates {
    constructor(latitude:number, longitude:number);
    longitude:Dms;
    latitude: Dms;
    getDmsArrays(): {
        longitude: DmsArray;
        latitude: DmsArray;
    }
    toString(): string;
    static parseDms(dmsStr:string):DmsParseResult;
    static dmsRe:RegExp;
}

declare module "dms" {
    export = DmsCoordinates;
}