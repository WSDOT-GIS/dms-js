dms.js
======

[![Build Status](https://travis-ci.org/WSDOT-GIS/dms-js.svg?branch=master)](https://travis-ci.org/WSDOT-GIS/dms-js)
[![bitHound Score](https://www.bithound.io/WSDOT-GIS/dms-js/badges/score.svg)](https://www.bithound.io/WSDOT-GIS/dms-js)
[![bitHound Dependencies](https://www.bithound.io/github/WSDOT-GIS/dms-js/badges/dependencies.svg)](https://www.bithound.io/github/WSDOT-GIS/dms-js/master/dependencies/npm)
[![bitHound Dev Dependencies](https://www.bithound.io/github/WSDOT-GIS/dms-js/badges/devDependencies.svg)](https://www.bithound.io/github/WSDOT-GIS/dms-js/master/dependencies/npm)
[![bitHound Code](https://www.bithound.io/github/WSDOT-GIS/dms-js/badges/code.svg)](https://www.bithound.io/github/WSDOT-GIS/dms-js)

A JavaScript library for converting between decimal degrees and degrees, minutes, and seconds (DMS).

Installation
------------

### NPM ###

```
npm install dms-conversion
```

### Bower ###

```
bower install dms
```

### Import ###

```javascript
import { default as DmsCoordinates, parseDms } from "dms-conversion";
```


#### EcmaScript 2015 ####
```javascript
// Convert decimal degrees to DMS string.
import DmsCoordinates from "dms-conversion";

let long = -122.902336120571;
let lat = 46.9845854731319;
let dmsCoords = new DmsCoordinates(lat, long);
console.log(dmsCoords.toString()) // 46°59′5″ N, 122°54′8″ W

// Get DMS coordinate parts as arrays.
let dmsArrays = dmsCoords.getDmsArrays();
let longArray = dmsArrays.longitude; // [122, 54, 8, "W"]
let latArray = dmsArrays.latitude; // [46, 59, 5, "N"]
```

```javascript
// DMS to decimal degrees.
import { parseDms } from "dms-conversion";
let dmsStrings = ["46°59′5″ N", "122°54′8″ W"];
let dmsCoords = dmsStrings.map(parseDms); // [-122.902336120571, 46.9845854731319]
```

#### EcmaScript 5 ####

```javascript
// Convert decimal degrees to DMS string.
var DmsCoordinates = require("dms-conversion").default;

var long = -122.902336120571;
var lat = 46.9845854731319;
var dmsCoords = new DmsCoordinates(lat, long);
console.log(dmsCoords.toString()) // 46°59′5″ N, 122°54′8″ W

// Get DMS coordinate parts as arrays.
var dmsArrays = dmsCoords.getDmsArrays();
var longArray = dmsArrays.longitude; // [122, 54, 8, "W"]
var latArray = dmsArrays.latitude; // [46, 59, 5, "N"]
```

```javascript
// DMS to decimal degrees.
var dms = require("dms-conversion");
var dmsStrings = ["46°59′5″ N", "122°54′8″ W"];
var dmsCoords = dmsStrings.map(dms.parseDms); // [-122.902336120571, 46.9845854731319]
```

Alternatives
------------

[nerik/formatcoords](https://github.com/nerik/formatcoords)
