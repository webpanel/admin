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
import * as React from 'react';
import { Auth, DummyAuth } from 'webpanel-auth';
import { LoginForm } from 'webpanel-antd';
import { Entity } from './model/Entity';
import { AdminLayout } from './components/layout';
export { Entity } from './model/Entity';
export { DataGrid } from './components/data-grid';
export { Layout } from 'webpanel-antd';
export * from './layout-builder';
var Admin = /** @class */ (function (_super) {
    __extends(Admin, _super);
    function Admin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Admin.prototype.render = function () {
        var _a = this.props, auth = _a.auth, entities = _a.entities, menuItems = _a.menuItems, structureItems = _a.structureItems;
        if (!auth) {
            return React.createElement(AdminLayout, { entities: entities, logout: function () { } });
        }
        var AuthComp = auth.type === 'dummy' ? DummyAuth : Auth;
        return (React.createElement(AuthComp, __assign({}, auth, { content: function (props) { return (React.createElement(AdminLayout, __assign({ entities: entities, menuItems: menuItems, structureItems: structureItems }, props))); }, form: function (props) { return React.createElement(LoginForm, { authorizationInfo: props }); } })));
    };
    Admin.Entity = Entity;
    return Admin;
}(React.Component));
export { Admin };
//# sourceMappingURL=index.js.map