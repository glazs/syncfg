SYNCFG
======

The simplest way to store variables in configuration files.
It provides an object synchronized with the file,
ensuring data is saved each time you set properties.

Works similarly to localStorage for Node.js,
but no manual serialization is needed.
A perfect solution for storing API authentication data
without involving a database.

Based on ES6 proxy, this package ensures seamless and automatic
data persistence. Ideal for configuration management,
file-based storage, and handling settings in Node.js applications.


Features
--------
 - As simple as possible
 - As fast as possible
 - Access the same instance from multiple files
 - Store any serializable data types, including arrays and objects


Important notices
-----------------
 - The module doesn't watch for manual file changes. Restart to load your local changes
 - The file is saved each time you set a parameter. Use setMultiple to reduce storage calls
 - You can't create a parameter named "setMultiple"; it's reserved as a method


Installation
------------
```
npm install --save syncfg
```


Usage
-----
```js

// import
import syncfg from 'syncfg'

// initalize 
const config = syncfg('path/to/config.json')



// Setting a parameter updates the file automatically
config.param = 'value'

// Reading a parameter
console.log(config.param)

// Deleting a parameter
delete config.param



// Setting multiple parameters but writing to the file once
config.setMultiple({a:1, b:2})

// Reading multiple parameters.
const {param1, param2} = config


```


License
-------
Internet Systems Consortium License


Keywords
--------
Configuration management, config file, localStorage alternative, Node.js storage,
automatic serialization, API keys storage, ES6 proxy, file synchronization,
data persistence, Node.js settings, JSON storage, config manager, Node.js config,
file-based storage, Node.js persistence, settings management.