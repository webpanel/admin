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
export var dateFieldFilter = function (columnName, range, format, showTime) {
    return {
        dropdownInput: function (props) {
            var value = props.selectedKeys;
            return range ? (React.createElement(AntdDatePicker.RangePicker, { format: format || showTime ? "YYYY/MM/DD HH:mm" : "YYYY/MM/DD", showTime: showTime, allowClear: false, value: [value[0] && moment(value[0]), value[1] && moment(value[1])], onChange: function (dates) {
                    if (dates != null) {
                        props.setSelectedKeys([
                            moment(dates[0] || undefined).startOf("day"),
                            moment(dates[1] || undefined).endOf("day"),
                        ]);
                    }
                } })) : (React.createElement(AntdDatePicker, { value: value[0], allowClear: false, showTime: showTime, onChange: function (date) {
                    props.setSelectedKeys([
                        moment(date).startOf("day"),
                        moment(date).endOf("day"),
                    ]);
                } }));
        },
        normalizer: function (values) {
            var res = {};
            values = values || [];
            if (values.length == 1) {
                res[columnName] = moment(values[0]).toISOString();
            }
            else if (values.length === 2) {
                res[columnName + "_gte"] = moment(values[0]).toISOString();
                res[columnName + "_lte"] = moment(values[1]).toISOString();
            }
            return res;
        },
        denormalizer: function (values) {
            var res = [];
            if (values[columnName]) {
                res = [moment(values[columnName])];
            }
            else if (values[columnName + "_gte"] && values[columnName + "_lte"]) {
                res = [
                    moment(values[columnName + "_gte"]),
                    moment(values[columnName + "_lte"]),
                ];
            }
            return res;
        },
    };
};
var EntityFieldDate = /** @class */ (function (_super) {
    __extends(EntityFieldDate, _super);
    function EntityFieldDate(name, config, _entity) {
        var _this = _super.call(this, name, config, _entity) || this;
        _this.name = name;
        _this.config = config;
        _this._entity = _entity;
        _this.filterDropdownInput = function (props) {
            return (_this.filterConfig.dropdownInput && _this.filterConfig.dropdownInput(props));
        };
        _this.filterConfig = dateFieldFilter(_this.columnName(), _this.range, _this.format, _this.config.showTime);
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
            return "-";
        }
        var d = moment(value);
        if (d.isValid()) {
            return d.format(this.format);
        }
        else {
            return "-";
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
        return (React.createElement(DatePicker, __assign({ key: "date_field_".concat(this._entity.name, "_").concat(this.valuePropName), showTime: this.config.showTime, format: this.format }, props, { onChange: onChangeProp })));
    };
    Object.defineProperty(EntityFieldDate.prototype, "filterNormalize", {
        get: function () {
            return this.filterConfig.normalizer;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EntityFieldDate.prototype, "filterDenormalize", {
        get: function () {
            return this.filterConfig.denormalizer;
        },
        enumerable: false,
        configurable: true
    });
    return EntityFieldDate;
}(EntityField));
export { EntityFieldDate };
//# sourceMappingURL=EntityFieldDate.js.map