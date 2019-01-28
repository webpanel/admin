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
import { Card, Icon, Button } from 'antd';
import * as React from 'react';
import { ResourceSearchInput, ResourceTable, Link } from 'webpanel-antd';
import { ResourceCollectionLayer } from 'webpanel-data';
import { ListCell } from './list-cell';
import { entityPermission, fieldPermission } from '../../model/permissions';
import { resolveOptionalThunk } from 'ts-thunk';
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
        return listFields.map(function (field) {
            var filter = field.filter;
            return {
                key: field.name,
                dataIndex: field.name,
                title: field.shortTitle,
                sorter: field.sortable,
                filterDropdown: filter ? field.filterDropdown(resource) : undefined,
                filterFormatter: field.filterFormatter,
                render: function (value, record) {
                    return (React.createElement(ListCell, { collection: resource, values: rowValues[record.id] || record, field: field, editable: _editableFields.indexOf(field.name) > -1 &&
                            fieldPermission(field, 'write') }));
                }
            };
        });
    };
    EntityList.prototype.render = function () {
        var _this = this;
        var _a = this.props, entity = _a.entity, table = _a.table, fields = _a.fields, initialFilters = _a.initialFilters, initialSorting = _a.initialSorting, title = _a.title;
        var _fields = resolveOptionalThunk(fields);
        var listFields = (_fields &&
            _fields
                .map(function (f) { return entity.getField(f); })
                .filter(function (x) { return x && x.visible('list', 'read'); })) ||
            entity.listFields;
        return (React.createElement(ResourceCollectionLayer, { name: entity.name, dataSource: this.props.dataSource, fields: [
                'id'
            ].concat(listFields.map(function (x) { return x.fetchField(); }).filter(function (x) { return x; })), initialSorting: initialSorting || entity.initialSorting, initialFilters: initialFilters || entity.initialFilters, render: function (resource) { return (React.createElement(Card, { bodyStyle: { padding: '0' }, title: title || entity.title, extra: [
                    entity.searchable && (React.createElement(ResourceSearchInput, { key: "searchInput", resourceCollection: resource, size: "small", style: { width: 300, marginRight: 8 } })),
                    entityPermission(entity, 'create') && (React.createElement(Link, { to: "/" + entity.structureName + "/new", key: "newButton" },
                        React.createElement(Button, { size: "small", htmlType: "button", icon: "plus" })))
                ].filter(function (x) { return x; }) },
                React.createElement(ResourceTable, __assign({ className: "entitytable", scroll: { x: true }, resourceCollection: resource, pagination: {
                        defaultPageSize: 30,
                        pageSizeOptions: ['10', '20', '30', '50', '100'],
                        showSizeChanger: true
                    } }, table, { columns: _this.getColumns(listFields, resource), actionButtons: [
                        entity.showDetailPage || entityPermission(entity, 'update')
                            ? function (props) { return (React.createElement(Link, { key: "detail-button-action", to: "/" + entity.structureName + "/" + props.resourceID.toString() },
                                React.createElement(Button, { size: "small" },
                                    React.createElement(Icon, { type: entity.showDetailPage ? 'search' : 'edit' })))); }
                            : null,
                        entity.showDetailPage && entityPermission(entity, 'update')
                            ? function (props) { return (React.createElement(Link, { key: "edit-button-action", to: "/" + entity.structureName + "/" + props.resourceID.toString() + "/edit" },
                                React.createElement(Button, { size: "small" },
                                    React.createElement(Icon, { type: "edit" })))); }
                            : null,
                        entityPermission(entity, 'delete') && 'delete'
                    ].filter(function (x) { return x; }) })))); } }));
    };
    return EntityList;
}(React.Component));
export { EntityList };
//# sourceMappingURL=list.js.map