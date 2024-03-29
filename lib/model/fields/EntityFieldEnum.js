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
import * as React from "react";
import { EntityField, } from "../EntityField";
import { resolveThunk } from "ts-thunk";
import { Select } from "antd";
var EntityFieldEnum = /** @class */ (function (_super) {
    __extends(EntityFieldEnum, _super);
    function EntityFieldEnum() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.filterDropdownInput = function (props) {
            var selectOptions = resolveThunk(_this.config.options).map(function (value) { return (React.createElement(Select.Option, { value: value.value, key: value.value }, value.label)); });
            var value = props.selectedKeys;
            return (React.createElement(Select, { style: {
                    minWidth: "200px",
                }, mode: "multiple", value: value, onChange: function (value) { return props.setSelectedKeys(value); }, showSearch: true, allowClear: true }, selectOptions));
        };
        return _this;
    }
    Object.defineProperty(EntityFieldEnum.prototype, "render", {
        get: function () {
            var _this = this;
            if (this.config.render) {
                return this.config.render;
            }
            var options = resolveThunk(this.config.options);
            return function (values) {
                var keyValue = values[_this.name];
                for (var _i = 0, options_1 = options; _i < options_1.length; _i++) {
                    var option = options_1[_i];
                    if (option.value === keyValue) {
                        return option.label;
                    }
                }
                return "–";
            };
        },
        enumerable: false,
        configurable: true
    });
    EntityFieldEnum.prototype.inputElement = function (props) {
        var _this = this;
        var selectOptions = resolveThunk(this.config.options).map(function (value) { return (React.createElement(Select.Option, { key: "enum_field_".concat(_this._entity.name, "_").concat(_this.valuePropName, "_").concat(value.value), value: value.value }, value.label)); });
        return (React.createElement(Select, __assign({ style: {
                width: "100%",
                minWidth: "100px",
            }, key: "enum_field_".concat(this._entity.name, "_").concat(this.valuePropName), showSearch: true, allowClear: true }, props), selectOptions));
    };
    Object.defineProperty(EntityFieldEnum.prototype, "filterNormalize", {
        get: function () {
            var _this = this;
            return function (values) {
                var res = {};
                values = values || [];
                if (values.length == 1) {
                    res[_this.columnName()] = values[0];
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
    Object.defineProperty(EntityFieldEnum.prototype, "filterDenormalize", {
        get: function () {
            var _this = this;
            return function (values) {
                var res = [];
                if (values[_this.columnName()]) {
                    res = [values[_this.columnName()].toString()];
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
    return EntityFieldEnum;
}(EntityField));
export { EntityFieldEnum };
//# sourceMappingURL=EntityFieldEnum.js.map