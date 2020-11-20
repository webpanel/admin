import * as React from "react";
import { Button, Popover } from "antd";
import { EditOutlined } from "@ant-design/icons";
export var EntityFieldEditButton = function (props) {
    var field = props.field, currentValue = props.value, onChange = props.onChange;
    var _a = React.useState(false), editing = _a[0], setEditing = _a[1];
    return (React.createElement(Popover, { content: React.createElement("div", { style: { width: 200 } }, field.inputElement({
            value: currentValue,
            onChange: function (value) {
                setEditing(false);
                onChange(value);
            },
        })), trigger: "click", onVisibleChange: function (visible) {
            setEditing(visible);
        }, visible: editing },
        React.createElement(Button, { shape: "circle", icon: React.createElement(EditOutlined, null), size: "small", className: "no-print" })));
};
//# sourceMappingURL=EntityFieldEditButton.js.map