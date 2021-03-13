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
import Modal from "antd/lib/modal/Modal";
import { useTranslation } from "react-i18next";
export var CreateEntityModal = function (props) {
    var t = useTranslation().t;
    // const [modalVisible, setModalVisible] = React.useState(false);
    var formRef = React.useRef(null);
    var entity = props.entity, modal = props.modal, rest = __rest(props, ["entity", "modal"]);
    var getTitle = function () {
        return (t(entity.name + "._title", {
            defaultValue: entity.title,
        }) +
            ": " +
            ((formRef.current && entity.render(formRef.current.getFieldsValue())) ||
                "-"));
    };
    return (React.createElement(Modal
    // visible={modalVisible}
    , __assign({ 
        // visible={modalVisible}
        onOk: function () { var _a, _b; return (_b = (_a = formRef) === null || _a === void 0 ? void 0 : _a.current) === null || _b === void 0 ? void 0 : _b.submit(); }, 
        // onCancel={() => setModalVisible(false)}
        title: getTitle(), destroyOnClose: true }, modal), entity.getCreateView(__assign({ wrapperType: "plain", formRef: formRef }, rest))));
};
//# sourceMappingURL=CreateEntityModal.js.map