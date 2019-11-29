/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./webpack/main.js":
/*!*************************!*\
  !*** ./webpack/main.js ***!
  \*************************/
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_require__.r, __webpack_exports__, module, __webpack_require__.* */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("module.exports = (async () => {\n__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var wasm_stuff__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! wasm-stuff */ \"./webpack/wasm-stuff/pkg/wasm_stuff.js\");\n/* harmony import */ var wasm_stuff__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(wasm_stuff__WEBPACK_IMPORTED_MODULE_0__);\nwasm_stuff__WEBPACK_IMPORTED_MODULE_0__ = await Promise.resolve(wasm_stuff__WEBPACK_IMPORTED_MODULE_0__);\n\n\n(0,wasm_stuff__WEBPACK_IMPORTED_MODULE_0__.greet)();\n\n\nreturn __webpack_exports__;\n})();\n\n//# sourceURL=webpack:///./webpack/main.js?");

/***/ }),

/***/ "./webpack/wasm-stuff/pkg/wasm_stuff.js":
/*!**********************************************!*\
  !*** ./webpack/wasm-stuff/pkg/wasm_stuff.js ***!
  \**********************************************/
/*! exports [maybe provided (runtime-defined)] [no usage info] */
/*! runtime requirements:  */
/***/ (() => {

eval("throw new Error(\"Module parse failed: Unexpected token (1:13)\\nYou may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders\\n> import async * as wasm from './wasm_stuff_bg.wasm';\\n| \\n| /**\");\n\n//# sourceURL=webpack:///./webpack/wasm-stuff/pkg/wasm_stuff.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => module['default'] :
/******/ 				() => module;
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		var hasOwnProperty = Object.prototype.hasOwnProperty;
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(hasOwnProperty.call(definition, key) && !hasOwnProperty.call(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./webpack/main.js");
/******/ 	// This entry module used 'module' so it can't be inlined
/******/ })()
;