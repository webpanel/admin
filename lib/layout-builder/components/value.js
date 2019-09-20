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
import * as React from 'react';
var LayoutBuilderValue = /** @class */ (function (_super) {
    __extends(LayoutBuilderValue, _super);
    function LayoutBuilderValue() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LayoutBuilderValue.prototype.render = function () {
        var _a = this.props, entity = _a.entity, name = _a.name, data = _a.data;
        var field = entity.getField(name);
        if (field === null) {
            return "unknown field " + name;
        }
        if (!field.readable) {
            return null;
        }
        return field.render(data);
    };
    return LayoutBuilderValue;
}(React.Component));
export { LayoutBuilderValue };
//# sourceMappingURL=value.js.map