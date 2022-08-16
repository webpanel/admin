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
import * as numeral from "numeral";
import { EntityField, } from "../EntityField";
import { InputNumber } from "antd";
export var PercentageInput = function (props) {
    var value = props.value, onChange = props.onChange, rest = __rest(props, ["value", "onChange"]);
    return (React.createElement(InputNumber, __assign({ value: value && value * 100, onChange: function (v) {
            return onChange &&
                onChange(v && 0.01 * (typeof v === "string" ? parseInt(v, 10) : v));
        }, formatter: function (value) { return value + "%"; }, parser: function (value) { return (value && value.replace("%", "")) || ""; } }, rest)));
};
var EntityFieldPercentage = /** @class */ (function (_super) {
    __extends(EntityFieldPercentage, _super);
    function EntityFieldPercentage(name, config, _entity) {
        var _this = _super.call(this, name, config, _entity) || this;
        _this.name = name;
        _this.config = config;
        _this._entity = _entity;
        _this.filterDropdownInput = function (props) {
            var value = props.selectedKeys ? props.selectedKeys[0] : undefined;
            return (React.createElement(PercentageInput, { style: { minWidth: "195px" }, key: "number_field_" + _this._entity.name + "_" + _this.valuePropName, placeholder: "Number", value: value, onChange: function (value) {
                    return props.setSelectedKeys(value ? [value] : []);
                } }));
        };
        if (typeof config.render === "undefined") {
            _this.config.render = function (values) { return numeral(values[name]).format("%"); };
        }
        return _this;
    }
    Object.defineProperty(EntityFieldPercentage.prototype, "listColumnAlign", {
        get: function () {
            return this.config.listColumnAlign || "right";
        },
        enumerable: false,
        configurable: true
    });
    EntityFieldPercentage.prototype.inputElement = function (props) {
        var onChange = props && props.onChange;
        var onChangeProp = onChange
            ? function (value) { return onChange(value, value); }
            : undefined;
        return (React.createElement(PercentageInput, __assign({ style: { minWidth: "195px", width: "100%" }, key: "number_field_" + this._entity.name + "_" + this.valuePropName }, props, { onChange: onChangeProp })));
    };
    Object.defineProperty(EntityFieldPercentage.prototype, "filterNormalize", {
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
    Object.defineProperty(EntityFieldPercentage.prototype, "filterDenormalize", {
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
    return EntityFieldPercentage;
}(EntityField));
export { EntityFieldPercentage };
//# sourceMappingURL=EntityFieldPercentage.js.map