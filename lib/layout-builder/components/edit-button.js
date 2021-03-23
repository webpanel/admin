var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as React from "react";
import { Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { Link } from "webpanel-antd";
var LayoutBuilderEditButton = /** @class */ (function (_super) {
    __extends(LayoutBuilderEditButton, _super);
    function LayoutBuilderEditButton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LayoutBuilderEditButton.prototype.render = function () {
        var _a = this.props, entity = _a.entity, data = _a.data;
        return (React.createElement(Link, { to: {
                pathname: entity.getEditLink(data.id),
                state: { goBackEnabled: true },
            } },
            React.createElement(Button, { size: "small", htmlType: "button", icon: React.createElement(EditOutlined, null) })));
    };
    return LayoutBuilderEditButton;
}(React.Component));
export { LayoutBuilderEditButton };
//# sourceMappingURL=edit-button.js.map