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
import * as React from 'react';
import * as moment from 'moment';
import { EntityField } from '../EntityField';
import { DatePicker } from '../../components/date-picker';
var EntityFieldDate = /** @class */ (function (_super) {
    __extends(EntityFieldDate, _super);
    function EntityFieldDate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(EntityFieldDate.prototype, "render", {
        get: function () {
            var _this = this;
            return function (values) { return moment(values[_this.name]).calendar(); };
        },
        enumerable: true,
        configurable: true
    });
    EntityFieldDate.prototype.inputElement = function () {
        return React.createElement(DatePicker, { showTime: this.config.showTime });
    };
    return EntityFieldDate;
}(EntityField));
export { EntityFieldDate };
//# sourceMappingURL=EntityFieldDate.1.js.map