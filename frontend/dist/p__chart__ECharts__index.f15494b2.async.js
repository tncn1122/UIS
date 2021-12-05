/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkantd_admin"] = self["webpackChunkantd_admin"] || []).push([[267],{

/***/ 12036:
/***/ (function(module) {

eval("// extracted by mini-css-extract-plugin\nmodule.exports = {\"chart\":\"chart___2X1o3\"};\n\n//# sourceURL=webpack://antd-admin/./src/pages/chart/ECharts/index.less?");

/***/ }),

/***/ 71790:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var antd_es_radio_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(88983);\n/* harmony import */ var antd_es_radio__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(82530);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(67294);\n/* harmony import */ var components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(61637);\n/* harmony import */ var _EchartsComponent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(60950);\n/* harmony import */ var _index_less_modules__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(12036);\n/* harmony import */ var _index_less_modules__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_index_less_modules__WEBPACK_IMPORTED_MODULE_4__);\n\n\n\n\n\n\nvar RadioGroup = antd_es_radio__WEBPACK_IMPORTED_MODULE_5__/* .default.Group */ .ZP.Group;\nvar chartList = [{\n  label: 'SimpleChart',\n  value: 'simple'\n}, {\n  label: 'ChartShowLoading',\n  value: 'loading'\n}, {\n  label: 'ChartAPI',\n  value: 'api'\n}, {\n  label: 'ChartWithEvent',\n  value: 'events'\n}, {\n  label: 'ThemeChart',\n  value: 'theme'\n}, {\n  label: 'DynamicChart',\n  value: 'dynamic'\n}, {\n  label: 'MapChart',\n  value: 'map'\n}, {\n  label: 'AirportCoord',\n  value: 'airport'\n}, {\n  label: 'Graph',\n  value: 'graph'\n}, {\n  label: 'Calendar',\n  value: 'calendar'\n}, {\n  label: 'Treemap',\n  value: 'treemap'\n}, {\n  label: 'Gauge',\n  value: 'gauge'\n}, {\n  label: 'GCalendar',\n  value: 'gcalendar'\n}, {\n  label: 'LunarCalendar',\n  value: 'lunar'\n}, {\n  label: 'Liquidfill',\n  value: 'liquid'\n}, {\n  label: 'BubbleGradient',\n  value: 'BubbleGradientComponent'\n}, {\n  label: 'TransparentBar3D',\n  value: 'TransparentBar3DComPonent'\n}];\n\nclass Chart extends react__WEBPACK_IMPORTED_MODULE_1__.Component {\n  constructor() {\n    super();\n    this.state = {\n      type: ''\n    };\n    this.handleRadioGroupChange = this.handleRadioGroupChange.bind(this);\n  }\n\n  handleRadioGroupChange(e) {\n    this.setState({\n      type: e.target.value\n    });\n  }\n\n  render() {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(components__WEBPACK_IMPORTED_MODULE_2__/* .Page */ .T3, {\n      inner: true,\n      id: \"EChartsMain\"\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(RadioGroup, {\n      options: chartList,\n      defaultValue: \"dynamic\",\n      onChange: this.handleRadioGroupChange\n    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(\"div\", {\n      className: (_index_less_modules__WEBPACK_IMPORTED_MODULE_4___default().chart)\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_EchartsComponent__WEBPACK_IMPORTED_MODULE_3__.default, {\n      type: this.state.type\n    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(\"div\", {\n      style: {\n        pading: 24,\n        marginTop: 24\n      }\n    }, \"All demos from\", ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(\"a\", {\n      href: \"https://github.com/hustcc/echarts-for-react\"\n    }, \"https://github.com/hustcc/echarts-for-react\")));\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Chart);\n\n//# sourceURL=webpack://antd-admin/./src/pages/chart/ECharts/index.js?");

/***/ })

}]);