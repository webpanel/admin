import * as React from "react";
import { Button, Form } from "antd";
export var ResourceFormPageButtons = function (props) {
    var handleReset = props.reset;
    return (React.createElement(Form.Item, { key: "form-buttons", wrapperCol: {
            xs: { span: 24, offset: 0 },
            sm: { span: 16, offset: 8 },
        } },
        React.createElement(Button, { type: "primary", htmlType: "submit" }, "Save"),
        React.createElement(Button, { style: { marginLeft: 8 }, onClick: handleReset }, "Reset")));
};
//# sourceMappingURL=buttons.js.map