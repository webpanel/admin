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
var EntityFieldColor = /** @class */ (function (_super) {
    __extends(EntityFieldColor, _super);
    function EntityFieldColor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EntityFieldColor.prototype.renderValue = function (value) {
        return value ? (React.createElement("div", { style: {
                width: '30px',
                height: '20px',
                backgroundColor: value,
                borderRadius: '3px'
            } })) : ('–');
    };
    Object.defineProperty(EntityFieldColor.prototype, "render", {
        get: function () {
            var _this = this;
            return function (values) {
                var color = values[_this.name];
                return _this.renderValue(color);
            };
        },
        enumerable: true,
        configurable: true
    });
    EntityFieldColor.prototype.inputElement = function (props) {
        var _this = this;
        var onChange = props && props.onChange;
        var onChangeProp = onChange
            ? function (event) {
                return onChange(event.target.value, _this.renderValue(event.target.value));
            }
            : undefined;
        return React.createElement("input", __assign({ type: "color" }, props, { onChange: onChangeProp }));
    };
    return EntityFieldColor;
}(EntityField));
export { EntityFieldColor };
//# sourceMappingURL=EntityFieldColor.js.map