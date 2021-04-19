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
import { Button } from "antd";
import { CreateEntityModal } from "./CreateEntityModal";
import { Link } from "webpanel-antd";
import { PlusOutlined } from "@ant-design/icons";
export var CreateEntityButton = function (props) {
    var entity = props.entity, flow = props.flow, button = props.button, rest = __rest(props, ["entity", "flow", "button"]);
    var _a = React.useState(false), modalVisible = _a[0], setModalVisible = _a[1];
    var _flow = flow || "redirect";
    if (_flow === "redirect") {
        return (React.createElement(Link, { to: entity.getCreateLink(), key: "newButton" },
            React.createElement(Button, __assign({ htmlType: "button", icon: React.createElement(PlusOutlined, null) }, button))));
    }
    var hideModal = function () {
        setModalVisible(false);
    };
    if (_flow.type === "modal") {
        return (React.createElement(React.Fragment, null,
            React.createElement(CreateEntityModal, __assign({ entity: entity, modal: __assign(__assign({ onCancel: function () { return hideModal(); } }, _flow.modal), { visible: modalVisible }), onSave: function () { return hideModal(); } }, rest)),
            React.createElement(Button, __assign({ icon: React.createElement(PlusOutlined, null) }, button, { onClick: function () { return setModalVisible(true); } }))));
    }
    return React.createElement(React.Fragment, null, "unexpected flow");
};
//# sourceMappingURL=EntityAddButton.js.map