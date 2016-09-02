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

```javascript
    // Convert decimal degrees to DMS string.
    var DmsCoordinates = require("dms.js").default;

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
    var dmsStrings = ["46°59′5″ N", "122°54′8″ W"];
    var dmsCoords = dmsStrings.map(DmsCoordinates.parseDms); // [-122.902336120571, 46.9845854731319]
```

API
---

<a name="module_dms"></a>

## dms
dms module


* [dms](#module_dms)
    * _instance_
        * [.longitude](#module_dms+longitude) : <code>[Dms](#module_dms.Dms)</code>
        * [.latitude](#module_dms+latitude) : <code>[Dms](#module_dms.Dms)</code>
        * [.dmsArrays](#module_dms+dmsArrays) : <code>DmsArrays</code>
        * ~~[.getDmsArrays()](#module_dms+getDmsArrays) ⇒ <code>DmsArrays</code>~~
        * [.toString()](#module_dms+toString) ⇒ <code>string</code>
    * _static_
        * [.Dms](#module_dms.Dms)
            * [new Dms(dd, longOrLat)](#new_module_dms.Dms_new)
            * [.dd](#module_dms.Dms+dd) : <code>number</code>
            * [.hemisphere](#module_dms.Dms+hemisphere) : <code>string</code>
            * [.dmsArray](#module_dms.Dms+dmsArray) ⇒ <code>Array.&lt;(number\|string)&gt;</code>
            * ~~[.getDmsArray()](#module_dms.Dms+getDmsArray) ⇒ <code>Array.&lt;(number\|string)&gt;</code>~~
            * [.toString()](#module_dms.Dms+toString) ⇒ <code>string</code>
        * [.DmsCoordinates](#module_dms.DmsCoordinates)
            * [new DmsCoordinates(latitude, longitude)](#new_module_dms.DmsCoordinates_new)
            * [.dmsRe](#module_dms.DmsCoordinates.dmsRe) : <code>RegExp</code>
        * [.parseDms(dmsStr)](#module_dms.parseDms) ⇒ <code>Number</code>
    * _inner_
        * [~DmsArrays](#module_dms..DmsArrays) : <code>Object</code>

<a name="module_dms+longitude"></a>

### dms.longitude : <code>[Dms](#module_dms.Dms)</code>
Longitude

**Kind**: instance property of <code>[dms](#module_dms)</code>  
<a name="module_dms+latitude"></a>

### dms.latitude : <code>[Dms](#module_dms.Dms)</code>
Latitude

**Kind**: instance property of <code>[dms](#module_dms)</code>  
<a name="module_dms+dmsArrays"></a>

### dms.dmsArrays : <code>DmsArrays</code>
Returns an object containing arrays containing degree / minute / second components.

**Kind**: instance property of <code>[dms](#module_dms)</code>  
<a name="module_dms+getDmsArrays"></a>

### ~~dms.getDmsArrays() ⇒ <code>DmsArrays</code>~~
***Deprecated***

Returns an object containing arrays containing degree / minute / second components.

**Kind**: instance method of <code>[dms](#module_dms)</code>  
<a name="module_dms+toString"></a>

### dms.toString() ⇒ <code>string</code>
Returns the coordinates to a comma-separated string.

**Kind**: instance method of <code>[dms](#module_dms)</code>  
<a name="module_dms.Dms"></a>

### dms.Dms
**Kind**: static class of <code>[dms](#module_dms)</code>  

* [.Dms](#module_dms.Dms)
    * [new Dms(dd, longOrLat)](#new_module_dms.Dms_new)
    * [.dd](#module_dms.Dms+dd) : <code>number</code>
    * [.hemisphere](#module_dms.Dms+hemisphere) : <code>string</code>
    * [.dmsArray](#module_dms.Dms+dmsArray) ⇒ <code>Array.&lt;(number\|string)&gt;</code>
    * ~~[.getDmsArray()](#module_dms.Dms+getDmsArray) ⇒ <code>Array.&lt;(number\|string)&gt;</code>~~
    * [.toString()](#module_dms.Dms+toString) ⇒ <code>string</code>

<a name="new_module_dms.Dms_new"></a>

#### new Dms(dd, longOrLat)

| Param | Type |
| --- | --- |
| dd | <code>number</code> | 
| longOrLat | <code>string</code> | 

<a name="module_dms.Dms+dd"></a>

#### dms.dd : <code>number</code>
Value in decimal degrees

**Kind**: instance property of <code>[Dms](#module_dms.Dms)</code>  
**Read only**: true  
<a name="module_dms.Dms+hemisphere"></a>

#### dms.hemisphere : <code>string</code>
Hemisphere

**Kind**: instance property of <code>[Dms](#module_dms.Dms)</code>  
**Read only**: true  
<a name="module_dms.Dms+dmsArray"></a>

#### dms.dmsArray ⇒ <code>Array.&lt;(number\|string)&gt;</code>
Returns the DMS parts as an array.The first three elements of the returned array are numbers:degrees, minutes, and seconds respectively. The fourthelement is a string indicating the hemisphere: "N", "S", "E", or "W".

**Kind**: instance property of <code>[Dms](#module_dms.Dms)</code>  
<a name="module_dms.Dms+getDmsArray"></a>

#### ~~dms.getDmsArray() ⇒ <code>Array.&lt;(number\|string)&gt;</code>~~
***Deprecated***

Returns the DMS parts as an array.The first three elements of the returned array are numbers:degrees, minutes, and seconds respectively. The fourthelement is a string indicating the hemisphere: "N", "S", "E", or "W".

**Kind**: instance method of <code>[Dms](#module_dms.Dms)</code>  
<a name="module_dms.Dms+toString"></a>

#### dms.toString() ⇒ <code>string</code>
Returns the DMS value as a string.

**Kind**: instance method of <code>[Dms](#module_dms.Dms)</code>  
<a name="module_dms.DmsCoordinates"></a>

### dms.DmsCoordinates
**Kind**: static class of <code>[dms](#module_dms)</code>  

* [.DmsCoordinates](#module_dms.DmsCoordinates)
    * [new DmsCoordinates(latitude, longitude)](#new_module_dms.DmsCoordinates_new)
    * [.dmsRe](#module_dms.DmsCoordinates.dmsRe) : <code>RegExp</code>

<a name="new_module_dms.DmsCoordinates_new"></a>

#### new DmsCoordinates(latitude, longitude)
Represents a location on the earth in WGS 1984 coordinates.

**Throws**:

- <code>TypeError</code> - latitude and longitude must be numbers.
- <code>RangeError</code> - latitude must be between -180 and 180, and longitude between -90 and 90. Neither can be NaN.


| Param | Type | Description |
| --- | --- | --- |
| latitude | <code>number</code> | WGS 84 Y coordinates |
| longitude | <code>number</code> | WGS 84 X coordinates |

<a name="module_dms.DmsCoordinates.dmsRe"></a>

#### DmsCoordinates.dmsRe : <code>RegExp</code>
A regular expression matching DMS coordinate.Example matches:E.g., ["40:26:46.302N", "40", "26", "46.302", "N"]E.g., ["40.446195N", "40.446195", undefined, undefined, "N"]

**Kind**: static property of <code>[DmsCoordinates](#module_dms.DmsCoordinates)</code>  
<a name="module_dms.parseDms"></a>

### dms.parseDms(dmsStr) ⇒ <code>Number</code>
Parses a Degrees Minutes Seconds string into a Decimal Degrees number.

**Kind**: static method of <code>[dms](#module_dms)</code>  
**Returns**: <code>Number</code> - If dmsStr is a valid coordinate string, the value in decimal degrees will be returned. Otherwise NaN will be returned.  

| Param | Type | Description |
| --- | --- | --- |
| dmsStr | <code>string</code> | A string containing a coordinate in either DMS or DD format. |

<a name="module_dms..DmsArrays"></a>

### dms~DmsArrays : <code>Object</code>
**Kind**: inner typedef of <code>[dms](#module_dms)</code>  
**Properties**

| Name | Type |
| --- | --- |
| longitude | <code>Array.&lt;(number\|string)&gt;</code> | 
| latitude | <code>Array.&lt;(number\|string)&gt;</code> | 

