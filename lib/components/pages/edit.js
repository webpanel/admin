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
import { EntityForm, } from "../form/entity-form";
import { Card } from "antd";
export var EntityEdit = function (props) {
    var entity = props.entity, wrapperType = props.wrapperType, formRef = props.formRef, restProps = __rest(props, ["entity", "wrapperType", "formRef"]);
    var formRefLocal = formRef;
    if (typeof formRefLocal === "undefined") {
        formRefLocal = React.useRef(null);
    }
    switch (wrapperType) {
        case "plain":
            return (React.createElement(EntityForm, __assign({ entity: entity }, restProps, { formRef: formRefLocal })));
        default:
            return (React.createElement(Card, null,
                React.createElement(EntityForm, __assign({ entity: entity }, restProps, { formRef: formRefLocal, showButtons: true }))));
    }
};
//# sourceMappingURL=edit.js.map