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
import * as moment from "moment";
import { EntityField, } from "../EntityField";
import { DatePicker as AntdDatePicker } from "antd";
import { DatePicker } from "../../components/date-picker";
var EntityFieldDate = /** @class */ (function (_super) {
    __extends(EntityFieldDate, _super);
    function EntityFieldDate() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.filterDropdownInput = function (props) {
            var value = props.selectedKeys;
            return _this.range ? (React.createElement(AntdDatePicker.RangePicker, { format: _this.config.format, allowClear: false, value: [value[0] && moment(value[0]), value[1] && moment(value[1])], onChange: function (dates) {
                    if (dates != null) {
                        props.setSelectedKeys([
                            moment(dates[0] || undefined).startOf("day"),
                            moment(dates[1] || undefined).endOf("day"),
                        ]);
                    }
                } })) : (React.createElement(AntdDatePicker, { value: value[0], allowClear: false, onChange: function (date) {
                    props.setSelectedKeys([
                        moment(date).startOf("day"),
                        moment(date).endOf("day"),
                    ]);
                } }));
        };
        return _this;
    }
    Object.defineProperty(EntityFieldDate.prototype, "format", {
        get: function () {
            return (this.config.format ||
                (this.config.showTime ? "YYYY/MM/DD HH:mm" : "YYYY/MM/DD"));
        },
        enumerable: false,
        configurable: true
    });
    EntityFieldDate.prototype.renderValue = function (value) {
        if (value === null) {
            return "–";
        }
        var d = moment(value);
        if (d.isValid()) {
            return d.format(this.format);
        }
        else {
            return "–";
        }
    };
    Object.defineProperty(EntityFieldDate.prototype, "render", {
        get: function () {
            var _this = this;
            return function (values) {
                return _this.renderValue(values[_this.name]);
            };
        },
        enumerable: false,
        configurable: true
    });
    EntityFieldDate.prototype.inputElement = function (props) {
        var _this = this;
        var onChange = props && props.onChange;
        var onChangeProp = onChange
            ? function (value) { return onChange(value, _this.renderValue(value)); }
            : undefined;
        return (React.createElement(DatePicker, __assign({ key: "date_field_" + this.entity.name + "_" + this.valuePropName, showTime: this.config.showTime, format: this.format }, props, { onChange: onChangeProp })));
    };
    Object.defineProperty(EntityFieldDate.prototype, "filterNormalize", {
        get: function () {
            var _this = this;
            return function (values) {
                var res = {};
                values = values || [];
                if (values.length == 1) {
                    res[_this.columnName()] = moment(values[0]).toISOString();
                }
                else if (values.length === 2) {
                    res[_this.columnName() + "_gte"] = moment(values[0]).toISOString();
                    res[_this.columnName() + "_lte"] = moment(values[1]).toISOString();
                }
                return res;
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EntityFieldDate.prototype, "filterDenormalize", {
        get: function () {
            var _this = this;
            return function (values) {
                var res = [];
                if (values[_this.columnName()]) {
                    res = [moment(values[_this.columnName()])];
                }
                else if (values[_this.columnName() + "_gte"] &&
                    values[_this.columnName() + "_lte"]) {
                    res = [
                        moment(values[_this.columnName() + "_gte"]),
                        moment(values[_this.columnName() + "_lte"]),
                    ];
                }
                return res;
            };
        },
        enumerable: false,
        configurable: true
    });
    return EntityFieldDate;
}(EntityField));
export { EntityFieldDate };
//# sourceMappingURL=EntityFieldDate.js.map