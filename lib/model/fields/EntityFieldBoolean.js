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
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Checkbox, Select } from "antd";
import { EntityField, } from "../EntityField";
var IndeterminateCheckbox = function (props) {
    var checked = props.checked, rest = __rest(props, ["checked"]);
    return (React.createElement(Checkbox, __assign({}, rest, { indeterminate: checked === null || typeof checked === "undefined", checked: checked })));
};
var EntityFieldBoolean = /** @class */ (function (_super) {
    __extends(EntityFieldBoolean, _super);
    function EntityFieldBoolean() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.filterDropdownInput = function (props) {
            var value = props.selectedKeys.length == 1 ? (props.selectedKeys[0] ? 1 : 0) : null;
            return (React.createElement(Select, { style: {
                    minWidth: "200px",
                }, value: value, onChange: function (value) { return props.setSelectedKeys([value]); }, showSearch: false, allowClear: false },
                React.createElement(Select.Option, { value: 0 },
                    React.createElement(CloseOutlined, null)),
                React.createElement(Select.Option, { value: 1 },
                    React.createElement(CheckOutlined, null))));
        };
        return _this;
    }
    Object.defineProperty(EntityFieldBoolean.prototype, "valuePropName", {
        get: function () {
            return "checked";
        },
        enumerable: false,
        configurable: true
    });
    EntityFieldBoolean.prototype.renderValue = function (value) {
        if (value === null || typeof value === "undefined") {
            return "–";
        }
        return value ? React.createElement(CheckOutlined, null) : React.createElement(CloseOutlined, null);
    };
    Object.defineProperty(EntityFieldBoolean.prototype, "render", {
        get: function () {
            var _this = this;
            return function (values) { return _this.renderValue(values[_this.name]); };
        },
        enumerable: false,
        configurable: true
    });
    EntityFieldBoolean.prototype.inputElement = function (props) {
        var _this = this;
        var onChange = props && props.onChange;
        var onChangeProp = onChange
            ? function (event) {
                return onChange(event.target.value, _this.renderValue(event.target.value));
            }
            : undefined;
        return (React.createElement(IndeterminateCheckbox, __assign({ key: "boolean_field_" + this.entity.name + "_" + this.valuePropName }, props, { onChange: onChangeProp })));
    };
    Object.defineProperty(EntityFieldBoolean.prototype, "filterNormalize", {
        get: function () {
            var _this = this;
            return function (values) {
                var res = {};
                values = values || [];
                if (values.length >= 1) {
                    res[_this.columnName()] = !!values[0];
                }
                return res;
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EntityFieldBoolean.prototype, "filterDenormalize", {
        get: function () {
            var _this = this;
            return function (values) {
                var res = [];
                if (values[_this.columnName()]) {
                    res = [values[_this.columnName()]];
                }
                return res;
            };
        },
        enumerable: false,
        configurable: true
    });
    return EntityFieldBoolean;
}(EntityField));
export { EntityFieldBoolean };
//# sourceMappingURL=EntityFieldBoolean.js.map