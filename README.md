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
            * [.longitude](#module_dms--DmsCoordinates+longitude) : <code>number</code>
            * [.latitude](#module_dms--DmsCoordinates+latitude) : <code>number</code>
            * [.getDmsArrays()](#module_dms--DmsCoordinates+getDmsArrays) ⇒ <code>DmsArrays</code>
            * [.toString()](#module_dms--DmsCoordinates+toString) ⇒ <code>string</code>
        * _static_
            * [.parseDms](#module_dms--DmsCoordinates.parseDms) ⇒ <code>Number</code>
            * [.dmsRe](#module_dms--DmsCoordinates.dmsRe) : <code>RegExp</code>
        * _inner_
            * [~DmsArrays](#module_dms--DmsCoordinates..DmsArrays) : <code>Object</code>

<a name="exp_module_dms--DmsCoordinates"></a>

### DmsCoordinates ⏏
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

<a name="module_dms--DmsCoordinates+longitude"></a>

#### dmsCoordinates.longitude : <code>number</code>
**Kind**: instance property of <code>[DmsCoordinates](#exp_module_dms--DmsCoordinates)</code>  
<a name="module_dms--DmsCoordinates+latitude"></a>

#### dmsCoordinates.latitude : <code>number</code>
**Kind**: instance property of <code>[DmsCoordinates](#exp_module_dms--DmsCoordinates)</code>  
<a name="module_dms--DmsCoordinates+getDmsArrays"></a>

#### dmsCoordinates.getDmsArrays() ⇒ <code>DmsArrays</code>
Returns an object containing arrays containing degree / minute / second components.

**Kind**: instance method of <code>[DmsCoordinates](#exp_module_dms--DmsCoordinates)</code>  
<a name="module_dms--DmsCoordinates+toString"></a>

#### dmsCoordinates.toString() ⇒ <code>string</code>
Returns the coordinates to a comma-separated string.

**Kind**: instance method of <code>[DmsCoordinates](#exp_module_dms--DmsCoordinates)</code>  
<a name="module_dms--DmsCoordinates.parseDms"></a>

#### DmsCoordinates.parseDms ⇒ <code>Number</code>
Parses a Degrees Minutes Seconds string into a Decimal Degrees number.

**Kind**: static property of <code>[DmsCoordinates](#exp_module_dms--DmsCoordinates)</code>  
**Returns**: <code>Number</code> - If dmsStr is a valid coordinate string, the value in decimal degrees will be returned. Otherwise NaN will be returned.  

| Param | Type | Description |
| --- | --- | --- |
| dmsStr | <code>string</code> | A string containing a coordinate in either DMS or DD format. |

<a name="module_dms--DmsCoordinates.dmsRe"></a>

#### DmsCoordinates.dmsRe : <code>RegExp</code>
A regular expression matching DMS coordinate.Example matches:E.g., ["40:26:46.302N", "40", "26", "46.302", "N"]E.g., ["40.446195N", "40.446195", undefined, undefined, "N"]

**Kind**: static property of <code>[DmsCoordinates](#exp_module_dms--DmsCoordinates)</code>  
<a name="module_dms--DmsCoordinates..DmsArrays"></a>

#### DmsCoordinates~DmsArrays : <code>Object</code>
**Kind**: inner typedef of <code>[DmsCoordinates](#exp_module_dms--DmsCoordinates)</code>  
**Properties**

| Name | Type |
| --- | --- |
| longitude | <code>Array.&lt;(number\|string)&gt;</code> | 
| latitude | <code>Array.&lt;(number\|string)&gt;</code> | 

