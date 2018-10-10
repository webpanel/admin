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
import { Card } from 'antd';
import * as React from 'react';
import { ResourceForm, ResourceFormButtons } from 'webpanel-antd';
import { ResourceLayer } from 'webpanel-data';
var EntityEdit = /** @class */ (function (_super) {
    __extends(EntityEdit, _super);
    function EntityEdit() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EntityEdit.prototype.render = function () {
        var _a = this.props, entity = _a.entity, route = _a.route;
        return (React.createElement(ResourceLayer, { name: entity.name, id: route.match.params.id, fields: entity.editFields.map(function (f) { return f.name; }), dataSource: entity.dataSource, onCreate: function (id) {
                route.history.push(id);
            }, render: function (resource) { return (React.createElement(Card, null,
                React.createElement(ResourceForm, { formResource: resource, render: function (formContext) { return (React.createElement(React.Fragment, null,
                        entity.editFields.map(function (field, i) {
                            return field.fieldElement(formContext, i);
                        }),
                        React.createElement(ResourceFormButtons, { formContext: formContext }))); } }))); } }));
    };
    return EntityEdit;
}(React.Component));
export { EntityEdit };
//# sourceMappingURL=edit.js.map