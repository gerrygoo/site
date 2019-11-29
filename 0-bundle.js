(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./webpack/import.js":
/*!***************************!*\
  !*** ./webpack/import.js ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var wasm_stuff__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! wasm-stuff */ \"./webpack/wasm-stuff/pkg/wasm_stuff.js\");\n\n\nwasm_stuff__WEBPACK_IMPORTED_MODULE_0__[\"greet\"]();\n\n\n\n//# sourceURL=webpack:///./webpack/import.js?");

/***/ }),

/***/ "./webpack/wasm-stuff/pkg/wasm_stuff.js":
/*!**********************************************!*\
  !*** ./webpack/wasm-stuff/pkg/wasm_stuff.js ***!
  \**********************************************/
/*! exports provided: greet, __wbg_alert_9b040d9c09e6a4eb */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"greet\", function() { return greet; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbg_alert_9b040d9c09e6a4eb\", function() { return __wbg_alert_9b040d9c09e6a4eb; });\n/* harmony import */ var _wasm_stuff_bg_wasm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./wasm_stuff_bg.wasm */ \"./webpack/wasm-stuff/pkg/wasm_stuff_bg.wasm\");\n\n\n/**\n*/\nfunction greet() {\n    _wasm_stuff_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"greet\"]();\n}\n\nlet cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });\n\ncachedTextDecoder.decode();\n\nlet cachegetUint8Memory = null;\nfunction getUint8Memory() {\n    if (cachegetUint8Memory === null || cachegetUint8Memory.buffer !== _wasm_stuff_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer) {\n        cachegetUint8Memory = new Uint8Array(_wasm_stuff_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer);\n    }\n    return cachegetUint8Memory;\n}\n\nfunction getStringFromWasm(ptr, len) {\n    return cachedTextDecoder.decode(getUint8Memory().subarray(ptr, ptr + len));\n}\n\nconst __wbg_alert_9b040d9c09e6a4eb = function(arg0, arg1) {\n    alert(getStringFromWasm(arg0, arg1));\n};\n\n\n\n//# sourceURL=webpack:///./webpack/wasm-stuff/pkg/wasm_stuff.js?");

/***/ }),

/***/ "./webpack/wasm-stuff/pkg/wasm_stuff_bg.wasm":
/*!***************************************************!*\
  !*** ./webpack/wasm-stuff/pkg/wasm_stuff_bg.wasm ***!
  \***************************************************/
/*! exports provided: memory, greet */
/***/ (function(module, exports, __webpack_require__) {

eval("\"use strict\";\n// Instantiate WebAssembly module\nvar wasmExports = __webpack_require__.w[module.i];\n__webpack_require__.r(exports);\n// export exports from WebAssembly module\nfor(var name in wasmExports) if(name != \"__webpack_init__\") exports[name] = wasmExports[name];\n// exec imports from WebAssembly module (for esm order)\n/* harmony import */ var m0 = __webpack_require__(/*! ./wasm_stuff.js */ \"./webpack/wasm-stuff/pkg/wasm_stuff.js\");\n\n\n// exec wasm module\nwasmExports[\"__webpack_init__\"]()\n\n//# sourceURL=webpack:///./webpack/wasm-stuff/pkg/wasm_stuff_bg.wasm?");

/***/ })

}]);