(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./webpack/import.js":
/*!***************************!*\
  !*** ./webpack/import.js ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var wasm_stuff__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! wasm-stuff */ \"./webpack/wasm-stuff/pkg/wasm_stuff.js\");\n/* harmony import */ var wasm_stuff_wasm_stuff_bg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! wasm-stuff/wasm_stuff_bg */ \"./webpack/wasm-stuff/pkg/wasm_stuff_bg.wasm\");\n\n\n\nconst CELL_SIZE = 8; // px\nconst GRID_COLOR = \"rgba(0, 0, 0, 0)\";\nconst DEAD_COLOR = \"rgba(0, 100, 250, 0.1)\";\nconst ALIVE_COLOR = \"#000000\";\n\nconst universe = wasm_stuff__WEBPACK_IMPORTED_MODULE_0__[\"Universe\"].new();\nconst width = universe.width();\nconst height = universe.height();\n\nconst canvas = document.getElementById(\"game-of-life-canvas\");\ncanvas.height = (CELL_SIZE + 1) * height + 1;\ncanvas.width = (CELL_SIZE + 1) * width + 1;\n\nconst ctx = canvas.getContext('2d');\n\nconst drawGrid = () => {\n  ctx.beginPath();\n  ctx.strokeStyle = GRID_COLOR;\n\n  // Vertical lines.\n  for (let i = 0; i <= width; i++) {\n    ctx.moveTo(i * (CELL_SIZE + 1) + 1, 0);\n    ctx.lineTo(i * (CELL_SIZE + 1) + 1, (CELL_SIZE + 1) * height + 1);\n  }\n\n  // Horizontal lines.\n  for (let j = 0; j <= height; j++) {\n    ctx.moveTo(0,                           j * (CELL_SIZE + 1) + 1);\n    ctx.lineTo((CELL_SIZE + 1) * width + 1, j * (CELL_SIZE + 1) + 1);\n  }\n\n  ctx.stroke();\n};\n\nconst getIndex = (row, column) => {\n  return row * width + column;\n};\n\nconst drawCells = () => {\n  const cellsPtr = universe.cells();\n  const cells = new Uint8Array(wasm_stuff_wasm_stuff_bg__WEBPACK_IMPORTED_MODULE_1__[\"memory\"].buffer, cellsPtr, width * height);\n\n  ctx.beginPath();\n\n  for (let row = 0; row < height; row++) {\n    for (let col = 0; col < width; col++) {\n      const idx = getIndex(row, col);\n\n      ctx.fillStyle = cells[idx] === wasm_stuff__WEBPACK_IMPORTED_MODULE_0__[\"Cell\"].Dead\n        ? DEAD_COLOR\n        : ALIVE_COLOR;\n\n      ctx.fillRect(\n        col * (CELL_SIZE + 1) + 1,\n        row * (CELL_SIZE + 1) + 1,\n        CELL_SIZE,\n        CELL_SIZE\n      );\n    }\n  }\n\n  ctx.stroke();\n};\n\nconst renderLoop = () => {\n  universe.tick();\n\n  drawGrid();\n  drawCells();\n\n  requestAnimationFrame(renderLoop);\n};\n\ndrawGrid();\ndrawCells();\nrequestAnimationFrame(renderLoop);\n\n\n\n//# sourceURL=webpack:///./webpack/import.js?");

/***/ }),

/***/ "./webpack/wasm-stuff/pkg/wasm_stuff.js":
/*!**********************************************!*\
  !*** ./webpack/wasm-stuff/pkg/wasm_stuff.js ***!
  \**********************************************/
/*! exports provided: Cell, Universe, __wbindgen_throw */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Cell\", function() { return Cell; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Universe\", function() { return Universe; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbindgen_throw\", function() { return __wbindgen_throw; });\n/* harmony import */ var _wasm_stuff_bg_wasm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./wasm_stuff_bg.wasm */ \"./webpack/wasm-stuff/pkg/wasm_stuff_bg.wasm\");\n\n\nlet cachegetInt32Memory = null;\nfunction getInt32Memory() {\n    if (cachegetInt32Memory === null || cachegetInt32Memory.buffer !== _wasm_stuff_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer) {\n        cachegetInt32Memory = new Int32Array(_wasm_stuff_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer);\n    }\n    return cachegetInt32Memory;\n}\n\nlet cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });\n\ncachedTextDecoder.decode();\n\nlet cachegetUint8Memory = null;\nfunction getUint8Memory() {\n    if (cachegetUint8Memory === null || cachegetUint8Memory.buffer !== _wasm_stuff_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer) {\n        cachegetUint8Memory = new Uint8Array(_wasm_stuff_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer);\n    }\n    return cachegetUint8Memory;\n}\n\nfunction getStringFromWasm(ptr, len) {\n    return cachedTextDecoder.decode(getUint8Memory().subarray(ptr, ptr + len));\n}\n/**\n*/\nconst Cell = Object.freeze({ Dead:0,Alive:1, });\n/**\n*/\nclass Universe {\n\n    static __wrap(ptr) {\n        const obj = Object.create(Universe.prototype);\n        obj.ptr = ptr;\n\n        return obj;\n    }\n\n    free() {\n        const ptr = this.ptr;\n        this.ptr = 0;\n\n        _wasm_stuff_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbg_universe_free\"](ptr);\n    }\n    /**\n    * @param {number} row\n    * @param {number} column\n    * @returns {number}\n    */\n    get_index(row, column) {\n        const ret = _wasm_stuff_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"universe_get_index\"](this.ptr, row, column);\n        return ret >>> 0;\n    }\n    /**\n    */\n    tick() {\n        _wasm_stuff_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"universe_tick\"](this.ptr);\n    }\n    /**\n    * @returns {Universe}\n    */\n    static new() {\n        const ret = _wasm_stuff_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"universe_new\"]();\n        return Universe.__wrap(ret);\n    }\n    /**\n    * @returns {string}\n    */\n    render() {\n        const retptr = 8;\n        const ret = _wasm_stuff_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"universe_render\"](retptr, this.ptr);\n        const memi32 = getInt32Memory();\n        const v0 = getStringFromWasm(memi32[retptr / 4 + 0], memi32[retptr / 4 + 1]).slice();\n        _wasm_stuff_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_free\"](memi32[retptr / 4 + 0], memi32[retptr / 4 + 1] * 1);\n        return v0;\n    }\n    /**\n    * @returns {number}\n    */\n    width() {\n        const ret = _wasm_stuff_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"universe_width\"](this.ptr);\n        return ret >>> 0;\n    }\n    /**\n    * @returns {number}\n    */\n    height() {\n        const ret = _wasm_stuff_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"universe_height\"](this.ptr);\n        return ret >>> 0;\n    }\n    /**\n    * @returns {number}\n    */\n    cells() {\n        const ret = _wasm_stuff_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"universe_cells\"](this.ptr);\n        return ret;\n    }\n}\n\nconst __wbindgen_throw = function(arg0, arg1) {\n    throw new Error(getStringFromWasm(arg0, arg1));\n};\n\n\n\n//# sourceURL=webpack:///./webpack/wasm-stuff/pkg/wasm_stuff.js?");

/***/ }),

/***/ "./webpack/wasm-stuff/pkg/wasm_stuff_bg.wasm":
/*!***************************************************!*\
  !*** ./webpack/wasm-stuff/pkg/wasm_stuff_bg.wasm ***!
  \***************************************************/
/*! exports provided: memory, __wbg_universe_free, universe_get_index, universe_tick, universe_new, universe_render, universe_width, universe_height, universe_cells, __wbindgen_free */
/***/ (function(module, exports, __webpack_require__) {

eval("\"use strict\";\n// Instantiate WebAssembly module\nvar wasmExports = __webpack_require__.w[module.i];\n__webpack_require__.r(exports);\n// export exports from WebAssembly module\nfor(var name in wasmExports) if(name != \"__webpack_init__\") exports[name] = wasmExports[name];\n// exec imports from WebAssembly module (for esm order)\n/* harmony import */ var m0 = __webpack_require__(/*! ./wasm_stuff.js */ \"./webpack/wasm-stuff/pkg/wasm_stuff.js\");\n\n\n// exec wasm module\nwasmExports[\"__webpack_init__\"]()\n\n//# sourceURL=webpack:///./webpack/wasm-stuff/pkg/wasm_stuff_bg.wasm?");

/***/ })

}]);