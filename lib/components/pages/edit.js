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
// import { FormContext } from "webpanel-antd/lib/form/form/Form";
import { ResourceFormPageButtons } from "../form/buttons";
import { useTranslation } from "react-i18next";
export var EntityEdit = function (props) {
    var t = useTranslation().t;
    var _a = React.useState(undefined), formData = _a[0], setFormData = _a[1];
    var entity = props.entity, wrapperType = props.wrapperType, formRef = props.formRef, restProps = __rest(props, ["entity", "wrapperType", "formRef"]);
    var formRefLocal = formRef;
    if (typeof formRefLocal === "undefined") {
        formRefLocal = React.useRef(null);
    }
    var entityForm = (React.createElement(EntityForm, __assign({ entity: entity }, restProps, { formRef: formRefLocal, onValuesChanged: function (values) { return setFormData(values); } })));
    switch (wrapperType) {
        case "plain":
            return entityForm;
        default:
            return (React.createElement(Card, { title: t(entity.name + "._title", {
                    defaultValue: entity.title,
                }) +
                    ": " +
                    ((formData && entity.render(formData)) || "-") },
                entityForm,
                React.createElement(ResourceFormPageButtons, { reset: function () { var _a, _b; return (_b = (_a = formRefLocal) === null || _a === void 0 ? void 0 : _a.current) === null || _b === void 0 ? void 0 : _b.resetFields(); } })));
    }
};
//# sourceMappingURL=edit.js.map