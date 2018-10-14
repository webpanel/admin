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
import { Checkbox } from 'antd';
var EntityFieldBoolean = /** @class */ (function (_super) {
    __extends(EntityFieldBoolean, _super);
    function EntityFieldBoolean() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(EntityFieldBoolean.prototype, "valuePropName", {
        get: function () {
            return 'checked';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityFieldBoolean.prototype, "render", {
        get: function () {
            var _this = this;
            return function (values) { return (values[_this.name] ? '✓' : '✗'); };
        },
        enumerable: true,
        configurable: true
    });
    EntityFieldBoolean.prototype.inputElement = function (props) {
        return React.createElement(Checkbox, __assign({}, props));
    };
    return EntityFieldBoolean;
}(EntityField));
export { EntityFieldBoolean };
//# sourceMappingURL=EntityFieldBoolean.js.map