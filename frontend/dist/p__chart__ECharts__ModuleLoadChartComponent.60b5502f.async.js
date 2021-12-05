/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkantd_admin"] = self["webpackChunkantd_admin"] || []).push([[62],{

/***/ 72272:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(67294);\n/* harmony import */ var echarts_for_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(22521);\n\n\n\nvar ModuleLoadChartComponent = () => {\n  var option = {\n    title: {\n      text: 'ECharts 入门示例'\n    },\n    tooltip: {},\n    xAxis: {\n      data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']\n    },\n    yAxis: {},\n    series: [{\n      name: '销量',\n      type: 'bar',\n      data: [5, 20, 36, 10, 10, 20]\n    }]\n  };\n  var code = '<ReactEcharts \\n' + '    option={this.getOtion()} \\n' + \"    style={{height: '350px', width: '100%'}}  \\n\" + \"    modules={['echarts/lib/chart/bar', 'echarts/lib/component/tooltip', 'echarts/lib/component/title']} \\n\" + \"    className='react_for_echarts' />\";\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", {\n    className: \"examples\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", {\n    className: \"parent\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"label\", null, ' ', \"load echarts module as you wish \", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"strong\", null, \"reduce the file size\"), \":\", ' '), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(echarts_for_react__WEBPACK_IMPORTED_MODULE_1__/* .default */ .Z, {\n    option: option,\n    style: {\n      height: '350px',\n      width: '100%'\n    },\n    modules: ['echarts/lib/chart/bar', 'echarts/lib/component/tooltip', 'echarts/lib/component/title'],\n    className: \"react_for_echarts\"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"label\", null, \" code below: \"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"pre\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"code\", null, code))));\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (ModuleLoadChartComponent);\n\n//# sourceURL=webpack://antd-admin/./src/pages/chart/ECharts/ModuleLoadChartComponent.js?");

/***/ })

}]);