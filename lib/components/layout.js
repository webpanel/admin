var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import * as React from 'react';
import { Layout } from 'webpanel-antd';
import { resolveOptionalThunk } from 'ts-thunk';
var AdminLayout = /** @class */ (function (_super) {
    __extends(AdminLayout, _super);
    function AdminLayout() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AdminLayout.prototype.render = function () {
        var _a = this.props, entities = _a.entities, menuItems = _a.menuItems, structureItems = _a.structureItems, menu = _a.menu, props = __rest(_a, ["entities", "menuItems", "structureItems", "menu"]);
        return (React.createElement(Layout, __assign({}, props),
            React.createElement(Layout.Menu, __assign({}, menu), resolveOptionalThunk(menuItems) ||
                (resolveOptionalThunk(entities) || [])
                    .filter(function (x) { return x.enabled; })
                    .map(function (x) { return x.menuItem(); })),
            React.createElement(Layout.Structure, null, resolveOptionalThunk(structureItems) ||
                (resolveOptionalThunk(entities) || [])
                    .filter(function (x) { return x.enabled; })
                    .map(function (x) { return x.structureItem(); })),
            this.props.children));
    };
    return AdminLayout;
}(React.Component));
export { AdminLayout };
//# sourceMappingURL=layout.js.map