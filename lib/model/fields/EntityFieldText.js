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
import { Input } from 'antd';
var EntityFieldText = /** @class */ (function (_super) {
    __extends(EntityFieldText, _super);
    function EntityFieldText() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EntityFieldText.prototype.inputElement = function (props) {
        var onChange = props && props.onChange;
        var onChangeProp = onChange
            ? function (e) {
                return onChange(e.target.value, e.target.value);
            }
            : undefined;
        return (React.createElement(Input.TextArea, __assign({}, props, { autosize: { minRows: 2, maxRows: 8 }, onChange: onChangeProp })));
    };
    Object.defineProperty(EntityFieldText.prototype, "filterFormatter", {
        get: function () {
            var _this = this;
            return function (values) {
                var res = {};
                if (values.length == 1) {
                    res[_this.columnName + '_contains'] = values[0];
                }
                else if (values.length > 1) {
                    res[_this.columnName + '_in'] = values;
                }
                return res;
            };
        },
        enumerable: true,
        configurable: true
    });
    return EntityFieldText;
}(EntityField));
export { EntityFieldText };
//# sourceMappingURL=EntityFieldText.js.map