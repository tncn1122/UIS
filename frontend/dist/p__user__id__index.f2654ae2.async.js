/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkantd_admin"] = self["webpackChunkantd_admin"] || []).push([[249],{

/***/ 27279:
/***/ (function(module) {

eval("// extracted by mini-css-extract-plugin\nmodule.exports = {\"content\":\"content___1cwoH\",\"item\":\"item___3dCj-\"};\n\n//# sourceURL=webpack://antd-admin/./src/pages/user/%5Bid%5D/index.less?");

/***/ }),

/***/ 57322:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(67294);\n/* harmony import */ var umi__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(15854);\n/* harmony import */ var components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(61637);\n/* harmony import */ var _index_less_modules__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(27279);\n/* harmony import */ var _index_less_modules__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_index_less_modules__WEBPACK_IMPORTED_MODULE_2__);\nvar _dec, _class;\n\n\n\n\n\nvar UserDetail = (_dec = (0,umi__WEBPACK_IMPORTED_MODULE_3__/* .connect */ .$j)(_ref => {\n  var userDetail = _ref.userDetail;\n  return {\n    userDetail\n  };\n}), _dec(_class = class UserDetail extends react__WEBPACK_IMPORTED_MODULE_0__.PureComponent {\n  render() {\n    var userDetail = this.props.userDetail;\n    var data = userDetail.data;\n    var content = [];\n\n    for (var key in data) {\n      if ({}.hasOwnProperty.call(data, key)) {\n        content.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", {\n          key: key,\n          className: (_index_less_modules__WEBPACK_IMPORTED_MODULE_2___default().item)\n        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", null, key), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", null, String(data[key]))));\n      }\n    }\n\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(components__WEBPACK_IMPORTED_MODULE_1__/* .Page */ .T3, {\n      inner: true\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", {\n      className: (_index_less_modules__WEBPACK_IMPORTED_MODULE_2___default().content)\n    }, content));\n  }\n\n}) || _class);\n/* harmony default export */ __webpack_exports__[\"default\"] = (UserDetail);\n\n//# sourceURL=webpack://antd-admin/./src/pages/user/%5Bid%5D/index.js?");

/***/ })

}]);