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
var EntityFieldComputed = /** @class */ (function (_super) {
    __extends(EntityFieldComputed, _super);
    function EntityFieldComputed() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EntityFieldComputed.prototype.columnName = function () {
        return this.config.columnName || _super.prototype.columnName.call(this);
    };
    EntityFieldComputed.prototype.fetchField = function () {
        return this.config.fetchField || _super.prototype.fetchField.call(this);
    };
    Object.defineProperty(EntityFieldComputed.prototype, "writeable", {
        get: function () {
            return false;
        },
        enumerable: true,
        configurable: true
    });
    EntityFieldComputed.prototype.inputElement = function (props) {
        return 'cannot edit computed field';
    };
    return EntityFieldComputed;
}(EntityField));
export { EntityFieldComputed };
//# sourceMappingURL=EntityFieldComputed.js.map