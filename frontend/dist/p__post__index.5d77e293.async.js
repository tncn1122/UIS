/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkantd_admin"] = self["webpackChunkantd_admin"] || []).push([[564],{

/***/ 9517:
/***/ (function(module) {

eval("// extracted by mini-css-extract-plugin\nmodule.exports = {\"table\":\"table___2lnSR\"};\n\n//# sourceURL=webpack://antd-admin/./src/pages/post/components/List.less?");

/***/ }),

/***/ 48555:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("// ESM COMPAT FLAG\n__webpack_require__.r(__webpack_exports__);\n\n// EXPORTS\n__webpack_require__.d(__webpack_exports__, {\n  \"default\": function() { return /* binding */ post; }\n});\n\n// EXTERNAL MODULE: ./node_modules/@umijs/babel-preset-umi/node_modules/@babel/runtime/helpers/esm/objectSpread2.js + 1 modules\nvar objectSpread2 = __webpack_require__(8870);\n// EXTERNAL MODULE: ./node_modules/antd/es/tabs/style/index.js\nvar style = __webpack_require__(18106);\n// EXTERNAL MODULE: ./node_modules/antd/es/tabs/index.js\nvar tabs = __webpack_require__(88108);\n// EXTERNAL MODULE: ./node_modules/@lingui/core/esm/index.js + 1 modules\nvar esm = __webpack_require__(25221);\n// EXTERNAL MODULE: ./node_modules/react/index.js\nvar react = __webpack_require__(67294);\n// EXTERNAL MODULE: ./src/.umi-production/core/umiExports.ts + 17 modules\nvar umiExports = __webpack_require__(15854);\n// EXTERNAL MODULE: ./node_modules/qs/lib/index.js\nvar lib = __webpack_require__(80129);\n// EXTERNAL MODULE: ./src/components/index.js + 20 modules\nvar components = __webpack_require__(61637);\n// EXTERNAL MODULE: ./node_modules/antd/es/table/style/index.js + 1 modules\nvar table_style = __webpack_require__(8963);\n// EXTERNAL MODULE: ./node_modules/antd/es/table/index.js + 22 modules\nvar table = __webpack_require__(35857);\n// EXTERNAL MODULE: ./node_modules/antd/es/avatar/style/index.js\nvar avatar_style = __webpack_require__(94233);\n// EXTERNAL MODULE: ./node_modules/antd/es/avatar/index.js + 3 modules\nvar avatar = __webpack_require__(51890);\n// EXTERNAL MODULE: ./node_modules/@umijs/babel-preset-umi/node_modules/@babel/runtime/helpers/esm/extends.js\nvar esm_extends = __webpack_require__(91896);\n// EXTERNAL MODULE: ./src/pages/post/components/List.less?modules\nvar Listmodules = __webpack_require__(9517);\nvar Listmodules_default = /*#__PURE__*/__webpack_require__.n(Listmodules);\n;// CONCATENATED MODULE: ./src/pages/post/components/List.js\n\n\n\n\n\n\n\n\n\n\n\nclass List extends react.PureComponent {\n  render() {\n    var tableProps = (0,esm_extends/* default */.Z)({}, this.props);\n\n    var columns = [{\n      title:\n      /*i18n*/\n      esm/* i18n._ */.ag._(\"Image\"),\n      dataIndex: 'image',\n      render: text => /*#__PURE__*/react.createElement(avatar/* default */.C, {\n        shape: \"square\",\n        src: text\n      })\n    }, {\n      title:\n      /*i18n*/\n      esm/* i18n._ */.ag._(\"Title\"),\n      dataIndex: 'title',\n      render: text => /*#__PURE__*/react.createElement(components/* Ellipsis */.mH, {\n        tooltip: true,\n        length: 30\n      }, text)\n    }, {\n      title:\n      /*i18n*/\n      esm/* i18n._ */.ag._(\"Author\"),\n      dataIndex: 'author'\n    }, {\n      title:\n      /*i18n*/\n      esm/* i18n._ */.ag._(\"Categories\"),\n      dataIndex: 'categories'\n    }, {\n      title:\n      /*i18n*/\n      esm/* i18n._ */.ag._(\"Tags\"),\n      dataIndex: 'tags'\n    }, {\n      title:\n      /*i18n*/\n      esm/* i18n._ */.ag._(\"Visibility\"),\n      dataIndex: 'visibility'\n    }, {\n      title:\n      /*i18n*/\n      esm/* i18n._ */.ag._(\"Comments\"),\n      dataIndex: 'comments'\n    }, {\n      title:\n      /*i18n*/\n      esm/* i18n._ */.ag._(\"Views\"),\n      dataIndex: 'views'\n    }, {\n      title:\n      /*i18n*/\n      esm/* i18n._ */.ag._(\"Publish Date\"),\n      dataIndex: 'date'\n    }];\n    return /*#__PURE__*/react.createElement(table/* default */.Z, (0,esm_extends/* default */.Z)({}, tableProps, {\n      pagination: (0,objectSpread2/* default */.Z)((0,objectSpread2/* default */.Z)({}, tableProps.pagination), {}, {\n        showTotal: total =>\n        /*i18n*/\n        esm/* i18n._ */.ag._(\"Total {total} Items\", {\n          total: total\n        })\n      }),\n      bordered: true,\n      scroll: {\n        x: 1200\n      },\n      className: (Listmodules_default()).table,\n      columns: columns,\n      simple: true,\n      rowKey: record => record.id\n    }));\n  }\n\n}\n\n/* harmony default export */ var components_List = (List);\n;// CONCATENATED MODULE: ./src/pages/post/index.js\n\n\n\n\nvar _dec, _class;\n\n\n\n\n\n\n\n\nvar TabPane = tabs/* default.TabPane */.Z.TabPane;\nvar EnumPostStatus = {\n  UNPUBLISH: 1,\n  PUBLISHED: 2\n};\nvar Post = (_dec = (0,umiExports/* connect */.$j)(_ref => {\n  var post = _ref.post,\n      loading = _ref.loading;\n  return {\n    post,\n    loading\n  };\n}), _dec(_class = class Post extends react.PureComponent {\n  constructor() {\n    super(...arguments);\n\n    this.handleTabClick = key => {\n      var pathname = this.props.location.pathname;\n      umiExports/* history.push */.m8.push({\n        pathname,\n        search: (0,lib.stringify)({\n          status: key\n        })\n      });\n    };\n  }\n\n  get listProps() {\n    var _this$props = this.props,\n        post = _this$props.post,\n        loading = _this$props.loading,\n        location = _this$props.location;\n    var list = post.list,\n        pagination = post.pagination;\n    var query = location.query,\n        pathname = location.pathname;\n    return {\n      pagination,\n      dataSource: list,\n      loading: loading.effects['post/query'],\n\n      onChange(page) {\n        umiExports/* history.push */.m8.push({\n          pathname,\n          search: (0,lib.stringify)((0,objectSpread2/* default */.Z)((0,objectSpread2/* default */.Z)({}, query), {}, {\n            page: page.current,\n            pageSize: page.pageSize\n          }))\n        });\n      }\n\n    };\n  }\n\n  render() {\n    var location = this.props.location;\n    var query = location.query;\n    return /*#__PURE__*/react.createElement(components/* Page */.T3, {\n      inner: true\n    }, /*#__PURE__*/react.createElement(tabs/* default */.Z, {\n      activeKey: query.status === String(EnumPostStatus.UNPUBLISH) ? String(EnumPostStatus.UNPUBLISH) : String(EnumPostStatus.PUBLISHED),\n      onTabClick: this.handleTabClick\n    }, /*#__PURE__*/react.createElement(TabPane, {\n      tab:\n      /*i18n*/\n      esm/* i18n._ */.ag._(\"Publised\"),\n      key: String(EnumPostStatus.PUBLISHED)\n    }, /*#__PURE__*/react.createElement(components_List, this.listProps)), /*#__PURE__*/react.createElement(TabPane, {\n      tab:\n      /*i18n*/\n      esm/* i18n._ */.ag._(\"Unpublished\"),\n      key: String(EnumPostStatus.UNPUBLISH)\n    }, /*#__PURE__*/react.createElement(components_List, this.listProps))));\n  }\n\n}) || _class);\n/* harmony default export */ var post = (Post);\n\n//# sourceURL=webpack://antd-admin/./src/pages/post/index.js_+_1_modules?");

/***/ })

}]);