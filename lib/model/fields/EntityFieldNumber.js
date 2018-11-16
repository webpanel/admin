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
import { EntityField } from '../EntityField';
import { InputNumber } from 'antd';
var EntityFieldNumber = /** @class */ (function (_super) {
    __extends(EntityFieldNumber, _super);
    function EntityFieldNumber() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.filterDropdownInput = function (resource) {
            return (_this.range ?
                (React.createElement(React.Fragment, null,
                    React.createElement(InputNumber, { placeholder: "From", onChange: function (value) { return _this.updateFilterField(resource, 'gte', value); } }),
                    React.createElement(InputNumber, { placeholder: "To", onChange: function (value) { return _this.updateFilterField(resource, 'lte', value); } })))
                :
                    (React.createElement(InputNumber, { placeholder: "Number", onChange: function (value) {
                            return _this.updateFilterField(resource, '', value);
                        } })));
        };
        return _this;
    }
    EntityFieldNumber.prototype.inputElement = function (props) {
        return React.createElement(InputNumber, __assign({}, props));
    };
    return EntityFieldNumber;
}(EntityField));
export { EntityFieldNumber };
//# sourceMappingURL=EntityFieldNumber.js.map