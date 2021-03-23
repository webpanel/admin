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
import { EntityField, } from "../EntityField";
var EntityFieldCustom = /** @class */ (function (_super) {
    __extends(EntityFieldCustom, _super);
    function EntityFieldCustom() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EntityFieldCustom.prototype.editFetchField = function () {
        return this.config.editFetchField || _super.prototype.editFetchField.call(this);
    };
    EntityFieldCustom.prototype.fetchField = function () {
        return this.config.fetchField || _super.prototype.fetchField.call(this);
    };
    EntityFieldCustom.prototype.inputElement = function (props) {
        var onChange = props && props.onChange;
        var onChangeProp = function (value) { return onChange && onChange(value, value); };
        return this.config.inputElement({
            value: props && props.value,
            onChange: onChangeProp,
            values: props === null || props === void 0 ? void 0 : props.values,
            valueGetter: function (key) {
                var _a;
                return (((_a = props === null || props === void 0 ? void 0 : props.formInstance) === null || _a === void 0 ? void 0 : _a.getFieldValue(key)) ||
                    ((props === null || props === void 0 ? void 0 : props.values) && (props === null || props === void 0 ? void 0 : props.values[key])));
            },
        });
    };
    return EntityFieldCustom;
}(EntityField));
export { EntityFieldCustom };
//# sourceMappingURL=EntityFieldCustom.js.map