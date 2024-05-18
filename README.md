Config file
===========

The Simplest way to store variables in configuration files.
It provides an object synchronized with the file,
ensuring data is saved each time you set properties.

Works similarly to localStorage for nodejs, but no manual serialization is needed.

A perfect solution for storing API authentication data without involving a database.

Based on ES6 proxy.


Features
--------
 - As simple as possible
 - As fast as possible
 - Access the same config object from multiple files
 - Store any serializable data types

Disadvantages
-------------
 - Can set only a single parameter per call
 - Writes to the file after each parameter set
 - No type checks, just pure JSON.stringify/parse

Installation
------------
```
npm install --save syncfg
```

Usage
-----
```
// import
import syncfg from 'syncfg'

// initalize 
const config = syncfg('config.json')

// Setting a parameter updates the file automatically
config.param = 'value'

// Reading a parameter
console.log(config.param)

// Reading multiple parameters
const {param1, param2} = config

```

License
-------
Internet Systems Consortium License
