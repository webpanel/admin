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
import { Button, Card, Icon } from 'antd';
import { ResourceCollectionLayer } from 'webpanel-data';
import { Link, ResourceSearchInput, ResourceTable } from 'webpanel-antd';
import { resolveOptionalThunk } from 'ts-thunk';
import { entityPermission, fieldPermission } from '../../model/permissions';
import { ListCell } from './list-cell';
var EntityList = /** @class */ (function (_super) {
    __extends(EntityList, _super);
    function EntityList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EntityList.prototype.getColumns = function (listFields, resource) {
        var _a = this.props, entity = _a.entity, editableFields = _a.editableFields;
        var _editableFields = (entityPermission(entity, 'update') &&
            resolveOptionalThunk(editableFields)) ||
            [];
        var rowValues = {};
        return listFields.map(function (column) {
            var field = column.field, render = column.render;
            return {
                key: field.name,
                dataIndex: field.name,
                title: field.shortTitle,
                sorter: field.sortable,
                filterDropdown: field.filter
                    ? field.filterDropdown(resource)
                    : undefined,
                filterNormalize: field.filterNormalize,
                filterDenormalize: field.filterDenormalize,
                render: function (value, record) {
                    var values = rowValues[record.id] || record;
                    if (render) {
                        return render(value, values, field);
                    }
                    return (React.createElement(ListCell, { collection: resource, values: values, field: field, editable: _editableFields.indexOf(field.name) > -1 &&
                            fieldPermission(field, 'write') }));
                }
            };
        });
    };
    EntityList.prototype.render = function () {
        var _this = this;
        var _a = this.props, entity = _a.entity, table = _a.table, card = _a.card, searchable = _a.searchable, showAddButton = _a.showAddButton, fields = _a.fields, initialFilters = _a.initialFilters, initialSorting = _a.initialSorting, title = _a.title;
        var _fields = resolveOptionalThunk(fields);
        var listFields = [];
        if (_fields) {
            for (var _i = 0, _fields_1 = _fields; _i < _fields_1.length; _i++) {
                var f = _fields_1[_i];
                var fieldName = typeof f === 'string' ? f : f.field;
                var render = (typeof f !== 'string' && f.render) || undefined;
                var hidden = (typeof f !== 'string' && f.hidden) || false;
                var field = entity.getField(fieldName);
                if (!field) {
                    throw new Error("Field '" + fieldName + "' not found in entity '" + entity.name + "'");
                }
                listFields.push({ field: field, hidden: hidden, render: render });
            }
        }
        else {
            for (var _b = 0, _c = entity.listFields; _b < _c.length; _b++) {
                var f = _c[_b];
                listFields.push({ field: f, hidden: false });
            }
        }
        var size = table && table.condensed ? 'small' : 'default';
        var _searchable = typeof searchable !== 'undefined' ? searchable : entity.searchable;
        var _showAddButton = typeof showAddButton !== 'undefined' ? showAddButton : true;
        return (React.createElement(ResourceCollectionLayer, { name: entity.name, dataSource: this.props.dataSource, autopersistConfigKey: entity.name + "_list", fields: [
                'id'
            ].concat(listFields
                .map(function (x) { return x.field.fetchField(); })
                .filter(function (x) { return x; })), initialSorting: initialSorting || entity.initialSorting, initialFilters: initialFilters || entity.initialFilters, render: function (resource) { return (React.createElement(Card, { bodyStyle: { padding: '0' }, title: title || entity.title, extra: [
                    _searchable && (React.createElement(ResourceSearchInput, { key: "searchInput", resourceCollection: resource, size: "small", style: { width: 300, marginRight: 8 } })),
                    _showAddButton && entityPermission(entity, 'create') && (React.createElement(Link, { to: entity.getCreateLink(), key: "newButton" },
                        React.createElement(Button, { size: "small", htmlType: "button", icon: "plus" }))),
                    card && card.extra
                ].filter(function (x) { return x; }) },
                React.createElement(ResourceTable, __assign({ className: "entitytable", scroll: { x: true }, resourceCollection: resource, pagination: {
                        defaultPageSize: 30,
                        pageSizeOptions: ['10', '20', '30', '50', '100'],
                        showSizeChanger: true
                    }, actionButtons: [
                        entity.showDetailPage || entityPermission(entity, 'update')
                            ? function (props) { return (React.createElement(Link, { key: "detail-button-action", to: entity.getDetailLink(props.resourceID) },
                                React.createElement(Button, { size: size },
                                    React.createElement(Icon, { type: entity.showDetailPage ? 'search' : 'edit' })))); }
                            : null,
                        entity.showDetailPage && entityPermission(entity, 'update')
                            ? function (props) { return (React.createElement(Link, { key: "edit-button-action", to: entity.getEditLink(props.resourceID) },
                                React.createElement(Button, { size: size },
                                    React.createElement(Icon, { type: "edit" })))); }
                            : null,
                        entityPermission(entity, 'delete') && 'delete'
                    ].filter(function (x) { return x; }), customDetailURL: function (resourceID) {
                        return entity.getDetailLink(resourceID);
                    } }, table, { columns: _this.getColumns(listFields.filter(function (x) { return !x.hidden; }), resource) })))); } }));
    };
    return EntityList;
}(React.Component));
export { EntityList };
//# sourceMappingURL=list.js.map