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
var LayoutBuilderEditField = /** @class */ (function (_super) {
    __extends(LayoutBuilderEditField, _super);
    function LayoutBuilderEditField() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LayoutBuilderEditField.prototype.render = function () {
        var _a = this.props, formContext = _a.formContext, name = _a.name, entity = _a.entity, formLayout = _a.formLayout;
        var field = entity.getField(name);
        if (field === null) {
            return "unknown field " + name;
        }
        return field.fieldElement(formContext, name, { formLayout: formLayout });
    };
    return LayoutBuilderEditField;
}(React.Component));
export { LayoutBuilderEditField };
//# sourceMappingURL=edit-field.js.map