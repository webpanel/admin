import * as React from "react";
import { Button, Form } from "antd";
import { useTranslation } from "react-i18next";
export var ResourceFormPageButtons = function (props) {
    var saving = props.saving, reset = props.reset, submit = props.submit;
    var t = useTranslation("webpanel-admin").t;
    return (React.createElement(Form.Item, { key: "form-buttons", wrapperCol: {
            xs: { span: 24, offset: 0 },
            sm: { span: 16, offset: 8 },
        } },
        React.createElement(Button, { type: "primary", loading: saving, onClick: submit, htmlType: typeof submit === "undefined" ? "submit" : undefined }, t("save")),
        React.createElement(Button, { style: { marginLeft: 8 }, onClick: reset }, t("reset"))));
};
//# sourceMappingURL=buttons.js.map