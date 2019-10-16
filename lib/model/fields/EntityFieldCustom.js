var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { EntityField } from '../EntityField';
var EntityFieldCustom = /** @class */ (function (_super) {
    __extends(EntityFieldCustom, _super);
    function EntityFieldCustom() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EntityFieldCustom.prototype.inputElement = function (props) {
        var onChange = props && props.onChange;
        var onChangeProp = function (value) { return onChange && onChange(value, value); };
        return this.config.inputElement({
            value: props && props.value,
            onChange: onChangeProp
        });
    };
    return EntityFieldCustom;
}(EntityField));
export { EntityFieldCustom };
//# sourceMappingURL=EntityFieldCustom.js.map