"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var webpanel_auth_1 = require("webpanel-auth");
var webpanel_antd_1 = require("webpanel-antd");
var layout_1 = require("./components/layout");
var Admin = /** @class */ (function (_super) {
    __extends(Admin, _super);
    function Admin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Admin.prototype.render = function () {
        var _a = this.props, auth = _a.auth, entities = _a.entities;
        var AuthComp = auth.type === 'dummy' ? webpanel_auth_1.DummyAuth : webpanel_auth_1.Auth;
        return (React.createElement(AuthComp, __assign({}, auth, { content: function (props) { return (React.createElement(layout_1.AdminLayout, { entities: entities, logout: props.logout })); }, form: function (props) { return React.createElement(webpanel_antd_1.LoginForm, { authorizationInfo: props }); } })));
    };
    return Admin;
}(React.Component));
exports.Admin = Admin;
//# sourceMappingURL=index.js.map