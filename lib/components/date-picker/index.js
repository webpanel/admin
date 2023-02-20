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
import * as moment from "moment";
import { DatePicker as AntdDatePicker } from "antd";
var DatePicker = /** @class */ (function (_super) {
    __extends(DatePicker, _super);
    function DatePicker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DatePicker.prototype.getFormat = function () {
        var _a = this.props, showTime = _a.showTime, format = _a.format;
        if (format) {
            return format;
        }
        return showTime ? "YYYY-MM-DD HH:mm:ss" : "YYYY-MM-DD";
    };
    DatePicker.prototype.render = function () {
        var _a = this.props, onChange = _a.onChange, value = _a.value, showTime = _a.showTime;
        return (React.createElement(AntdDatePicker, { showTime: showTime || true, format: this.getFormat(), defaultPickerValue: moment().minute(0).seconds(0), value: value ? moment(value) : undefined, onChange: function (val) {
                if (onChange) {
                    onChange((val && val.toISOString()) || null);
                }
            } }));
    };
    return DatePicker;
}(React.Component));
export { DatePicker };
//# sourceMappingURL=index.js.map