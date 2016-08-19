dms.js
======

[![Build Status](https://travis-ci.org/WSDOT-GIS/dms-js.svg?branch=master)](https://travis-ci.org/WSDOT-GIS/dms-js)
[![bitHound Score](https://www.bithound.io/WSDOT-GIS/dms-js/badges/score.svg)](https://www.bithound.io/WSDOT-GIS/dms-js)
[![bitHound Dependencies](https://www.bithound.io/github/WSDOT-GIS/dms-js/badges/dependencies.svg)](https://www.bithound.io/github/WSDOT-GIS/dms-js/master/dependencies/npm)
[![bitHound Dev Dependencies](https://www.bithound.io/github/WSDOT-GIS/dms-js/badges/devDependencies.svg)](https://www.bithound.io/github/WSDOT-GIS/dms-js/master/dependencies/npm)
[![bitHound Code](https://www.bithound.io/github/WSDOT-GIS/dms-js/badges/code.svg)](https://www.bithound.io/github/WSDOT-GIS/dms-js)

A JavaScript library for converting between decimal degrees and degrees, minutes, and seconds (DMS).

<a name="module_dms"></a>

## dms
dms module


* [dms](#module_dms)
    * [DmsCoordinates](#exp_module_dms--DmsCoordinates) ⏏
        * [new DmsCoordinates(latitude, longitude)](#new_module_dms--DmsCoordinates_new)
        * _instance_
            * [.getDmsArrays()](#module_dms--DmsCoordinates+getDmsArrays) ⇒ <code>DmsArrays</code>
            * [.toString()](#module_dms--DmsCoordinates+toString) ⇒ <code>string</code>
        * _static_
            * [.dmsRe](#module_dms--DmsCoordinates.dmsRe) : <code>RegExp</code>
            * [.parseDms(dmsStr)](#module_dms--DmsCoordinates.parseDms) ⇒ <code>Number</code>
        * _inner_
            * [~Dms](#module_dms--DmsCoordinates..Dms)
                * [.getDmsArray()](#module_dms--DmsCoordinates..Dms+getDmsArray) ⇒ <code>Array.&lt;(number\|string)&gt;</code>
                * [.toString()](#module_dms--DmsCoordinates..Dms+toString)
            * [~longitude](#module_dms--DmsCoordinates..longitude) : <code>Dms</code>
            * [~longitude](#module_dms--DmsCoordinates..longitude) : <code>Dms</code>
            * [~truncate(n)](#module_dms--DmsCoordinates..truncate) ⇒ <code>number</code>
            * [~DmsArrays](#module_dms--DmsCoordinates..DmsArrays) : <code>Object</code>

<a name="exp_module_dms--DmsCoordinates"></a>

### DmsCoordinates ⏏
Represents DMS coordinates.

**Kind**: Exported class  
<a name="new_module_dms--DmsCoordinates_new"></a>

#### new DmsCoordinates(latitude, longitude)
Represents a location on the earth in WGS 1984 coordinates.

**Throws**:

- <code>TypeError</code> - latitude and longitude must be numbers.
- <code>RangeError</code> - latitude must be between -180 and 180, and longitude between -90 and 90. Neither can be NaN.


| Param | Type | Description |
| --- | --- | --- |
| latitude | <code>number</code> | WGS 84 Y coordinates |
| longitude | <code>number</code> | WGS 84 X coordinates |

<a name="module_dms--DmsCoordinates+getDmsArrays"></a>

#### dmsCoordinates.getDmsArrays() ⇒ <code>DmsArrays</code>
Returns an object containing arrays containing degree / minute / second components.

**Kind**: instance method of <code>[DmsCoordinates](#exp_module_dms--DmsCoordinates)</code>  
<a name="module_dms--DmsCoordinates+toString"></a>

#### dmsCoordinates.toString() ⇒ <code>string</code>
Returns the coordinates to a comma-separated string.

**Kind**: instance method of <code>[DmsCoordinates](#exp_module_dms--DmsCoordinates)</code>  
<a name="module_dms--DmsCoordinates.dmsRe"></a>

#### DmsCoordinates.dmsRe : <code>RegExp</code>
A regular expression matching DMS coordinate.Example matches:E.g., ["40:26:46.302N", "40", "26", "46.302", "N"]E.g., ["40.446195N", "40.446195", undefined, undefined, "N"]

**Kind**: static property of <code>[DmsCoordinates](#exp_module_dms--DmsCoordinates)</code>  
<a name="module_dms--DmsCoordinates.parseDms"></a>

#### DmsCoordinates.parseDms(dmsStr) ⇒ <code>Number</code>
Parses a Degrees Minutes Seconds string into a Decimal Degrees number.

**Kind**: static method of <code>[DmsCoordinates](#exp_module_dms--DmsCoordinates)</code>  
**Returns**: <code>Number</code> - If dmsStr is a valid coordinate string, the value in decimal degrees will be returned. Otherwise NaN will be returned.  

| Param | Type | Description |
| --- | --- | --- |
| dmsStr | <code>string</code> | A string containing a coordinate in either DMS or DD format. |

<a name="module_dms--DmsCoordinates..Dms"></a>

#### DmsCoordinates~Dms
Represents a DMS position

**Kind**: inner class of <code>[DmsCoordinates](#exp_module_dms--DmsCoordinates)</code>  

* [~Dms](#module_dms--DmsCoordinates..Dms)
    * [.getDmsArray()](#module_dms--DmsCoordinates..Dms+getDmsArray) ⇒ <code>Array.&lt;(number\|string)&gt;</code>
    * [.toString()](#module_dms--DmsCoordinates..Dms+toString)

<a name="module_dms--DmsCoordinates..Dms+getDmsArray"></a>

##### dms.getDmsArray() ⇒ <code>Array.&lt;(number\|string)&gt;</code>
Returns the DMS parts as an array.The first three elements of the returned array are numbers:degrees, minutes, and seconds respectively. The fourthelement is a string indicating the hemisphere: "N", "S", "E", or "W".

**Kind**: instance method of <code>[Dms](#module_dms--DmsCoordinates..Dms)</code>  
<a name="module_dms--DmsCoordinates..Dms+toString"></a>

##### dms.toString()
Returns the DMS value as a string.

**Kind**: instance method of <code>[Dms](#module_dms--DmsCoordinates..Dms)</code>  
<a name="module_dms--DmsCoordinates..longitude"></a>

#### DmsCoordinates~longitude : <code>Dms</code>
Longitude

**Kind**: inner property of <code>[DmsCoordinates](#exp_module_dms--DmsCoordinates)</code>  
<a name="module_dms--DmsCoordinates..longitude"></a>

#### DmsCoordinates~longitude : <code>Dms</code>
Latitude

**Kind**: inner property of <code>[DmsCoordinates](#exp_module_dms--DmsCoordinates)</code>  
<a name="module_dms--DmsCoordinates..truncate"></a>

#### DmsCoordinates~truncate(n) ⇒ <code>number</code>
Removes the decimal part of a number without rounding up.

**Kind**: inner method of <code>[DmsCoordinates](#exp_module_dms--DmsCoordinates)</code>  

| Param | Type |
| --- | --- |
| n | <code>number</code> | 

<a name="module_dms--DmsCoordinates..DmsArrays"></a>

#### DmsCoordinates~DmsArrays : <code>Object</code>
**Kind**: inner typedef of <code>[DmsCoordinates](#exp_module_dms--DmsCoordinates)</code>  
**Properties**

| Name | Type |
| --- | --- |
| longitude | <code>Array.&lt;(number\|string)&gt;</code> | 
| latitude | <code>Array.&lt;(number\|string)&gt;</code> | 

