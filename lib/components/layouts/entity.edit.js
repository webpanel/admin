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
import { EntityEdit } from '../pages/edit';
var EntityEditLayout = /** @class */ (function (_super) {
    __extends(EntityEditLayout, _super);
    function EntityEditLayout() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EntityEditLayout.prototype.render = function () {
        var _a = this.props, route = _a.route, form = _a.form, initialValues = _a.initialValues;
        return (React.createElement(EntityEdit, { entity: this.props.entity, resourceID: route.match.params.id, route: route, form: form, initialValues: initialValues }));
    };
    return EntityEditLayout;
}(React.Component));
export { EntityEditLayout };
//# sourceMappingURL=entity.edit.js.map