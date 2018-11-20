var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
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
import { DatePicker as AntdDatePicker, Button } from 'antd';
import * as React from 'react';
import * as moment from 'moment';
import { EntityField } from '../EntityField';
import { DatePicker } from '../../components/date-picker';
var EntityFieldDate = /** @class */ (function (_super) {
    __extends(EntityFieldDate, _super);
    function EntityFieldDate() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.filterDropdownInput = function (resource) {
            return (React.createElement(React.Fragment, null,
                _this.range ? (React.createElement(AntdDatePicker.RangePicker, { format: _this.config.format, defaultValue: [
                        _this.valueForFilterField(resource, 'gte'),
                        _this.valueForFilterField(resource, 'lte')
                    ], onChange: function (value) {
                        _this.updateFilterField(resource, 'gte', moment(value[0])
                            .startOf('day')
                            .toISOString());
                        _this.updateFilterField(resource, 'lte', moment(value[1])
                            .endOf('day')
                            .toISOString());
                    } })) : (React.createElement(DatePicker, { value: _this.valueForFilterField(resource, 'gte'), onChange: function (value) {
                        _this.updateFilterField(resource, 'gte', moment(value)
                            .startOf('day')
                            .toISOString());
                        _this.updateFilterField(resource, 'lte', moment(value)
                            .endOf('day')
                            .toISOString());
                    } })),
                React.createElement(Button, { disabled: !_this.isFiltered(resource), onClick: function () { return _this.clearFilters(resource); }, icon: "delete" })));
        };
        return _this;
    }
    Object.defineProperty(EntityFieldDate.prototype, "format", {
        get: function () {
            return (this.config.format ||
                (this.config.showTime ? 'YYYY/MM/DD HH:mm' : 'YYYY/MM/DD'));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityFieldDate.prototype, "render", {
        get: function () {
            var _this = this;
            return function (values) {
                var d = moment(values[_this.name]);
                if (d.isValid()) {
                    return d.format(_this.format);
                }
                else {
                    return '–';
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    EntityFieldDate.prototype.isFiltered = function (resource) {
        return (this.valueForFilterField(resource, 'gte') ||
            this.valueForFilterField(resource, 'lte'));
    };
    EntityFieldDate.prototype.inputElement = function (props) {
        return (React.createElement(DatePicker, __assign({ showTime: this.config.showTime, format: this.format }, props)));
    };
    return EntityFieldDate;
}(EntityField));
export { EntityFieldDate };
//# sourceMappingURL=EntityFieldDate.js.map