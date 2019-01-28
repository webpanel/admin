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
import { Form } from 'antd';
var LayoutBuilderStringField = /** @class */ (function (_super) {
    __extends(LayoutBuilderStringField, _super);
    function LayoutBuilderStringField() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.layouts = {
            horizontal: {
                labelCol: {
                    xs: { span: 24 },
                    sm: { span: 8 }
                },
                wrapperCol: {
                    xs: { span: 24 },
                    sm: { span: 16 }
                }
            },
            vertical: {
                labelCol: {
                    xs: { span: 24 },
                    sm: { span: 8 }
                },
                wrapperCol: {
                    xs: { span: 24 },
                    sm: { span: 16 }
                }
            }
        };
        return _this;
    }
    LayoutBuilderStringField.prototype.render = function () {
        var _a = this.props, entity = _a.entity, name = _a.name, data = _a.data, props = __rest(_a, ["entity", "name", "data"]);
        var field = entity.getField(name);
        if (field === null) {
            return "unknown field " + name;
        }
        return (React.createElement(Form.Item, __assign({}, props, { 
            //   key={key}
            label: field.title, colon: field.title ? true : false }), field.render(data)));
    };
    return LayoutBuilderStringField;
}(React.Component));
export { LayoutBuilderStringField };
//# sourceMappingURL=string-field.1.js.map