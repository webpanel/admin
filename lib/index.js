var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
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
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import * as React from "react";
import { AdminLayout } from "./components/layout";
import { Auth, DummyAuth } from "webpanel-auth";
import { Button, Result, Spin } from "antd";
import { configurePermissions } from "./model/permissions";
import { Entity } from "./model/Entity";
import { LoginForm } from "webpanel-antd";
export { Entity } from "./model/Entity";
export { Layout } from "webpanel-antd";
export * from "./layout-builder";
export { AdminLayout } from "./components/layout";
export { getRelationshipFilterDropdownInput } from "./model/fields/EntityFieldRelationship";
var Admin = /** @class */ (function (_super) {
    __extends(Admin, _super);
    function Admin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Admin.prototype.render = function () {
        var _a = this.props, auth = _a.auth, entities = _a.entities, menuItems = _a.menuItems, structureItems = _a.structureItems, autopermissions = _a.autopermissions, loggedInContentWrapper = _a.loggedInContentWrapper, restProps = __rest(_a, ["auth", "entities", "menuItems", "structureItems", "autopermissions", "loggedInContentWrapper"]);
        configurePermissions(autopermissions);
        if (!auth) {
            return React.createElement(AdminLayout, { entities: entities, logout: function () { } });
        }
        var _loggedInContentWrapper = loggedInContentWrapper || (function (x) { return x; });
        var content = function (props) {
            return _loggedInContentWrapper(React.createElement(AdminLayout, __assign({ entities: entities, menuItems: menuItems, structureItems: structureItems }, props, restProps)));
        };
        var form = function (props) { return (React.createElement(LoginForm, { authorizationInfo: props })); };
        return auth.type === "dummy" ? (React.createElement(DummyAuth, __assign({}, auth, { content: content, form: form }))) : (React.createElement(Auth, __assign({}, auth, { content: content, form: form, processing: function () { return React.createElement(Spin, null); }, failed: function (_a) {
                var error = _a.error, logout = _a.logout;
                return (React.createElement(Result, { status: "403", title: "403", subTitle: "" + error.message, extra: React.createElement(Button, { type: "primary", onClick: logout }, "Logout") }));
            } })));
    };
    Admin.Entity = Entity;
    return Admin;
}(React.Component));
export { Admin };
//# sourceMappingURL=index.js.map