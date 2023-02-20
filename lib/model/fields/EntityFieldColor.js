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
import { CloseOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import * as React from "react";
import { EntityField, } from "../EntityField";
export var ColorInput = function (_a) {
    var value = _a.value, onChange = _a.onChange;
    var _b = React.useState(0), version = _b[0], setVersion = _b[1];
    return (React.createElement(Space, null,
        React.createElement("input", { key: "".concat(version), value: value || undefined, type: "color", onChange: function (event) {
                onChange(event.target.value);
            } }),
        React.createElement(Button, { size: "small", icon: React.createElement(CloseOutlined, null), onClick: function () {
                onChange(null);
                setVersion(version + 1); // force input color value refresh
            } })));
};
var EntityFieldColor = /** @class */ (function (_super) {
    __extends(EntityFieldColor, _super);
    function EntityFieldColor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EntityFieldColor.prototype.renderValue = function (value) {
        return value ? (React.createElement("div", { style: {
                width: "30px",
                height: "20px",
                backgroundColor: value,
                borderRadius: "3px",
            } })) : ("–");
    };
    Object.defineProperty(EntityFieldColor.prototype, "render", {
        get: function () {
            var _this = this;
            return function (values, options) {
                var color = values[_this.name];
                return _this.renderValue(color);
            };
        },
        enumerable: false,
        configurable: true
    });
    EntityFieldColor.prototype.inputElement = function (props) {
        var _this = this;
        var _a = props, onChange = _a.onChange, value = _a.value;
        return (React.createElement(ColorInput, { key: "color_field_".concat(this._entity.name, "_").concat(this.valuePropName), value: value, onChange: function (value) {
                return onChange && onChange(value, _this.render(value));
            } }));
    };
    return EntityFieldColor;
}(EntityField));
export { EntityFieldColor };
//# sourceMappingURL=EntityFieldColor.js.map