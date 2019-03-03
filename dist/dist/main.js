/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/deviceList.js":
/*!***************************!*\
  !*** ./src/deviceList.js ***!
  \***************************/
/*! exports provided: handle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"handle\", function() { return handle; });\nfunction stringGenerate(name) {\n  var result = name + \", \" + name + \", wherefore art thou hiding?\";\n  return result;\n}\n\nfunction handle() {\n  var devices = [\"phone\", \"laptop\", \"backpack\", \"luggage\", \"tablet\", \"purse\", \"jacket\"];\n  var interval = 1000;\n  var currentDeviceIndex = 0;\n  setInterval(function () {\n    var deviceSpan = document.getElementById(\"deviceList\");\n    deviceSpan.innerHTML = stringGenerate(devices[currentDeviceIndex % devices.length]);\n    ++currentDeviceIndex;\n  }, interval);\n}\n\n//# sourceURL=webpack:///./src/deviceList.js?");

/***/ }),

/***/ "./src/getDevices.js":
/*!***************************!*\
  !*** ./src/getDevices.js ***!
  \***************************/
/*! exports provided: getDevices */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getDevices\", function() { return getDevices; });\n// returns promise containing an array of device names belonging to the user\nfunction getDevices(user) {\n  return firebase.database().ref(\"users/\" + user + \"/devices/\").once(\"value\").then(function (snapshot) {\n    var data = snapshot.val();\n    var devices = [];\n\n    for (var key in data) {\n      if (data.hasOwnProperty(key)) {\n        devices.push(data[key].name);\n      }\n    }\n\n    return devices;\n  });\n}\n\n//# sourceURL=webpack:///./src/getDevices.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var deviceListHandler = __webpack_require__(/*! ./deviceList */ \"./src/deviceList.js\");\n\nvar deviceList = __webpack_require__(/*! ./getDevices */ \"./src/getDevices.js\");\n\nvar renderDevices = __webpack_require__(/*! ./renderDevices */ \"./src/renderDevices.js\"); // deviceListHandler.handle();\n// Initialize and add the map\n\n\nfunction initMap(latitude, longitude) {\n  // The location of Uluru\n  var uluru = {\n    lat: latitude,\n    lng: longitude\n  }; // The map, centered at Uluru\n\n  var map = new google.maps.Map(document.getElementById('map'), {\n    zoom: 4,\n    center: uluru\n  }); // The marker, positioned at Uluru\n\n  var marker = new google.maps.Marker({\n    position: uluru,\n    map: map\n  });\n}\n\nvar provider = new firebase.auth.GoogleAuthProvider();\ndocument.getElementById(\"signin\").addEventListener(\"click\", function () {\n  firebase.auth().signInWithPopup(provider).then(function (result) {\n    // This gives you a Google Access Token. You can use it to access the Google API.\n    var token = result.credential.accessToken; // The signed-in user info.\n\n    var user = result.user;\n    document.getElementById(\"addDeviceButton\").addEventListener(\"click\", function () {\n      registerDevice(user.uid);\n    });\n    var devices = deviceList.getDevices(user.uid);\n    devices.then(function (response) {\n      for (var i = 0; i < response.length; ++i) {\n        var coordinates = renderDevices.render(response[i]);\n        coordinates.then(function (response) {\n          initMap(response.latitude, response.longitude);\n        });\n      }\n    }); // ...\n  }).catch(function (error) {\n    // Handle Errors here.\n    var errorCode = error.code;\n    var errorMessage = error.message;\n    console.log(errorMessage); // The email of the user's account used.\n\n    var email = error.email; // The firebase.auth.AuthCredential type that was used.\n\n    var credential = error.credential; // ...\n  });\n});\n\nfunction registerDevice(user) {\n  var textbox = document.getElementById(\"addDeviceText\");\n  var deviceName = textbox.value;\n\n  if (deviceName.length > 0) {\n    var key = firebase.database().ref(\"users/\" + user + \"/devices\").push().key;\n    firebase.database().ref(\"users/\" + user + \"/devices/\" + key).update({\n      name: deviceName\n    });\n  }\n}\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/renderDevices.js":
/*!******************************!*\
  !*** ./src/renderDevices.js ***!
  \******************************/
/*! exports provided: render */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\nfunction render(name) {\n  firebase.database().ref(\"locations/\" + name + \"/\").once(\"value\").then(function (snapshot) {\n    var data = snapshot.val();\n\n    if (data == null) {\n      return;\n    }\n\n    var keyCount = Object.keys(data).length;\n\n    if (keyCount > 0) {\n      var gotCurrentLocation = false;\n\n      for (var key in data) {\n        if (!gotCurrentLocation && data.hasOwnProperty(key)) {\n          if (gotCurrentLocation) {\n            return;\n          }\n\n          var deviceData = data[key];\n\n          if (deviceData != null) {\n            var currentLatitude = deviceData[\"latitude\"];\n            var currentLongitude = deviceData[\"longitude\"];\n            return {\n              latitude: currentLatitude,\n              longitude: currentLongitude\n            };\n          }\n\n          gotCurrentLocation = true;\n        }\n      }\n    }\n  });\n}\n\n//# sourceURL=webpack:///./src/renderDevices.js?");

/***/ })

/******/ });