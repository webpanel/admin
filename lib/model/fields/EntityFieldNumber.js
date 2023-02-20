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
import * as numeral from "numeral";
import { EntityField, } from "../EntityField";
import { InputNumber } from "antd";
var formatter = function (value, format) {
    return numeral(value).format(format || "0,0");
    // return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};
var parser = function (value) {
    if (!value) {
        return 0;
    }
    return numeral(value).value();
};
var EntityFieldNumber = /** @class */ (function (_super) {
    __extends(EntityFieldNumber, _super);
    function EntityFieldNumber(name, config, _entity) {
        var _this = _super.call(this, name, config, _entity) || this;
        _this.name = name;
        _this.config = config;
        _this._entity = _entity;
        _this.filterDropdownInput = function (props) {
            var value = props.selectedKeys ? props.selectedKeys[0] : undefined;
            return (React.createElement(InputNumber, { style: { minWidth: "195px" }, key: "number_field_".concat(_this._entity.name, "_").concat(_this.valuePropName), placeholder: "Number", value: value, onChange: function (value) {
                    return props.setSelectedKeys(value ? [value] : []);
                }, formatter: function (value) { return formatter(value); }, parser: function (value) { return parser(value || ""); } }));
        };
        if (typeof config.render === "undefined") {
            _this.config.render = function (values) {
                return numeral(values[name]).format(config.format || "0,0");
            };
        }
        return _this;
    }
    Object.defineProperty(EntityFieldNumber.prototype, "listColumnAlign", {
        get: function () {
            return this.config.listColumnAlign || "right";
        },
        enumerable: false,
        configurable: true
    });
    EntityFieldNumber.prototype.inputElement = function (props) {
        var _this = this;
        var onChange = props && props.onChange;
        var onChangeProp = onChange
            ? function (value) { return onChange(value, value); }
            : undefined;
        return (React.createElement(InputNumber, __assign({ style: { minWidth: "195px", width: "100%" }, key: "number_field_".concat(this._entity.name, "_").concat(this.valuePropName), formatter: function (value) { return formatter(value, _this.config.format); }, parser: function (value) {
                return parser(value || "");
            } }, props, this.config.inputProps, { onChange: onChangeProp })));
    };
    Object.defineProperty(EntityFieldNumber.prototype, "filterNormalize", {
        get: function () {
            var _this = this;
            return function (values) {
                var res = {};
                values = values || [];
                if (values.length == 1) {
                    res[_this.columnName()] = parseFloat(values[0]);
                }
                else if (values.length === 2) {
                    res[_this.columnName() + "_gte"] = parseFloat(values[0]);
                    res[_this.columnName() + "_lte"] = parseFloat(values[1]);
                }
                return res;
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EntityFieldNumber.prototype, "filterDenormalize", {
        get: function () {
            var _this = this;
            return function (values) {
                var res = [];
                if (values[_this.columnName()]) {
                    res = [values[_this.columnName()].toString()];
                }
                else if (values[_this.columnName() + "_gte"] &&
                    values[_this.columnName() + "_lte"]) {
                    res = [
                        values[_this.columnName() + "_gte"].toString(),
                        values[_this.columnName() + "_lte"].toString(),
                    ];
                }
                return res;
            };
        },
        enumerable: false,
        configurable: true
    });
    return EntityFieldNumber;
}(EntityField));
export { EntityFieldNumber };
//# sourceMappingURL=EntityFieldNumber.js.map