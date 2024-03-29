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
import { EntityField, } from "../EntityField";
import { Input, Tooltip } from "antd";
var EntityFieldText = /** @class */ (function (_super) {
    __extends(EntityFieldText, _super);
    function EntityFieldText() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EntityFieldText.prototype.inputElement = function (props) {
        var onChange = props && props.onChange;
        var onChangeProp = onChange
            ? function (e) {
                return onChange(e.target.value, e.target.value);
            }
            : undefined;
        return (React.createElement(Input.TextArea, { key: "text_field_".concat(this._entity.name, "_").concat(this.valuePropName), autoFocus: props === null || props === void 0 ? void 0 : props.autoFocus, autoSize: { minRows: 2, maxRows: 8 }, onChange: onChangeProp }));
    };
    Object.defineProperty(EntityFieldText.prototype, "filterNormalize", {
        get: function () {
            var _this = this;
            return function (values) {
                var res = {};
                values = values || [];
                if (values.length == 1) {
                    res[_this.columnName() + "_contains"] = values[0];
                }
                else if (values.length > 1) {
                    res[_this.columnName() + "_in"] = values;
                }
                return res;
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EntityFieldText.prototype, "filterDenormalize", {
        get: function () {
            var _this = this;
            return function (values) {
                var res = [];
                if (values[_this.columnName() + "_contains"]) {
                    res = [values[_this.columnName() + "_contains"]];
                }
                else if (values[_this.columnName() + "_in"]) {
                    res = values[_this.columnName() + "_in"];
                }
                return res;
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EntityFieldText.prototype, "render", {
        get: function () {
            var _this = this;
            if (this.config.render) {
                return this.config.render;
            }
            return function (values, options) {
                var value = values[_this.name] || "";
                if (!value || !value.substring || value.length < 50) {
                    return value;
                }
                if ((options === null || options === void 0 ? void 0 : options.size) === "small") {
                    var shortValue = value.substring(0, 50) + "...";
                    return React.createElement(Tooltip, { title: value }, shortValue);
                }
                return (React.createElement("pre", { style: { whiteSpace: "break-spaces", wordBreak: "break-word" } }, value));
            };
        },
        enumerable: false,
        configurable: true
    });
    return EntityFieldText;
}(EntityField));
export { EntityFieldText };
//# sourceMappingURL=EntityFieldText.js.map