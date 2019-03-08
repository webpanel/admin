var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
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
import { EntityField } from "../EntityField";
import { resolveThunk } from "ts-thunk";
import { Select } from "antd";
var EntityFieldEnum = /** @class */ (function (_super) {
    __extends(EntityFieldEnum, _super);
    function EntityFieldEnum() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.filterDropdownInput = function (props) {
            var selectOptions = resolveThunk(_this.config.options).map(function (value) { return (React.createElement(Select.Option, { value: value.value }, value.label)); });
            var value = props.selectedKeys;
            return (React.createElement(Select, { value: value, onChange: function (value) { return props.setSelectedKeys([value]); } }, selectOptions));
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
        enumerable: true,
        configurable: true
    });
    EntityFieldEnum.prototype.inputElement = function (props) {
        var _this = this;
        var selectOptions = resolveThunk(this.config.options).map(function (value) { return (React.createElement(Select.Option, { key: "enum_field_" + _this.entity.name + "_" + _this.valuePropName + "_" + value.value, value: value.value }, value.label)); });
        return (React.createElement(Select, __assign({ style: {
                width: "100%"
            }, key: "enum_field_" + this.entity.name + "_" + this.valuePropName }, props), selectOptions));
    };
    Object.defineProperty(EntityFieldEnum.prototype, "filterFormatter", {
        get: function () {
            var _this = this;
            return function (values) {
                var res = {};
                if (values.length == 1) {
                    res[_this.columnName()] = values[0];
                }
                else if (values.length > 1) {
                    res[_this.columnName() + "_in"] = values;
                }
                return res;
            };
        },
        enumerable: true,
        configurable: true
    });
    return EntityFieldEnum;
}(EntityField));
export { EntityFieldEnum };
//# sourceMappingURL=EntityFieldEnum.js.map