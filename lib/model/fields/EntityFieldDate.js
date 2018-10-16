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
import * as React from 'react';
import * as moment from 'moment';
import { EntityField } from '../EntityField';
import { DatePicker } from '../../components/date-picker';
var EntityFieldDate = /** @class */ (function (_super) {
    __extends(EntityFieldDate, _super);
    function EntityFieldDate() {
        return _super !== null && _super.apply(this, arguments) || this;
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
            return function (values) { return moment(values[_this.name]).format(_this.format); };
        },
        enumerable: true,
        configurable: true
    });
    EntityFieldDate.prototype.inputElement = function (props) {
        return (React.createElement(DatePicker, __assign({ showTime: this.config.showTime, format: this.format }, props)));
    };
    return EntityFieldDate;
}(EntityField));
export { EntityFieldDate };
//# sourceMappingURL=EntityFieldDate.js.map