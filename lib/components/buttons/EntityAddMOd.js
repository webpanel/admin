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
import * as React from "react";
import { Link } from "webpanel-antd";
import { Button } from "antd";
import Modal from "antd/lib/modal/Modal";
import { PlusOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
export var CreateEntityButton = function (props) {
    var t = useTranslation().t;
    var _a = React.useState(false), modalVisible = _a[0], setModalVisible = _a[1];
    var formRef = React.useRef(null);
    // const [formInstance, setFormInstance] = React.useState<
    //   FormInstance | undefined
    // >(undefined);
    var entity = props.entity, initialValues = props.initialValues, fields = props.fields, flow = props.flow, onSave = props.onSave, button = props.button;
    var _flow = flow || "redirect";
    if (_flow === "redirect") {
        return (React.createElement(Link, { to: entity.getCreateLink(), key: "newButton" },
            React.createElement(Button, __assign({ htmlType: "button", icon: React.createElement(PlusOutlined, null) }, button))));
    }
    var hideModal = function () {
        setModalVisible(false);
    };
    var getTitle = function () {
        return (t(entity.name + "._title", {
            defaultValue: entity.title,
        }) +
            ": " +
            ((formRef.current && entity.render(formRef.current.getFieldsValue())) ||
                "-"));
    };
    if (_flow.type === "modal") {
        // const modal = _flow.modal;
        return (React.createElement(React.Fragment, null,
            React.createElement(Modal, __assign({ visible: modalVisible, onOk: function () { var _a, _b; return (_b = (_a = formRef) === null || _a === void 0 ? void 0 : _a.current) === null || _b === void 0 ? void 0 : _b.submit(); }, onCancel: function () { return setModalVisible(false); }, title: getTitle(), destroyOnClose: true }, _flow.modal), entity.getCreateView({
                initialValues: initialValues,
                fields: fields,
                wrapperType: "plain",
                formRef: formRef,
                onSave: function (id) {
                    hideModal();
                    if (onSave) {
                        onSave(id);
                    }
                },
            })),
            React.createElement(Button, __assign({ icon: React.createElement(PlusOutlined, null) }, button, { onClick: function () { return setModalVisible(true); } }))));
    }
    return React.createElement(React.Fragment, null, "unexpected flow");
};
//# sourceMappingURL=EntityAddMOd.js.map