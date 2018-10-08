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
import { ResourceCollectionLayer } from 'webpanel-data';
import { ResourceSelect, FormField } from 'webpanel-antd';
var RelationField = /** @class */ (function (_super) {
    __extends(RelationField, _super);
    function RelationField() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RelationField.prototype.render = function () {
        var _a = this.props, formContext = _a.formContext, field = _a.field, mode = _a.mode, targetEntity = _a.targetEntity;
        return (React.createElement(ResourceCollectionLayer, { name: targetEntity.name, fields: ['id'].concat(targetEntity.searchableFields.map(function (x) { return x.name; })), dataSource: targetEntity.dataSource, render: function (collection) {
                return (React.createElement(FormField, { label: field.title, name: field.name, formContext: formContext },
                    React.createElement(ResourceSelect, { valueKey: "id", labelKey: function (value) {
                            return targetEntity.render(value);
                        }, mode: mode, resourceCollection: collection })));
            } }));
    };
    return RelationField;
}(React.Component));
export { RelationField };
//# sourceMappingURL=index.js.map