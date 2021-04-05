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
import { Form } from "antd";
import { useTranslation } from "react-i18next";
export var LayoutBuilderStringField = function (props) {
    var t = useTranslation().t;
    var layouts = {
        horizontal: {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        },
        vertical: {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        },
    };
    var entity = props.entity, name = props.name, data = props.data, layout = props.layout, restProps = __rest(props, ["entity", "name", "data", "layout"]);
    var field = entity.getField(name);
    if (field === null) {
        return React.createElement(React.Fragment, null,
            "unknown field ",
            name);
    }
    if (!field.readable) {
        return null;
    }
    var label = t(field.titleTranslationKey, { defaultValue: field.title });
    return (React.createElement(Form.Item, __assign({}, restProps, { label: label, colon: label ? true : false }, layouts[layout || "horizontal"]), field.render(data)));
};
//# sourceMappingURL=string-field.js.map