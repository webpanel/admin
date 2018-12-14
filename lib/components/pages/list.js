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
var EntityList = /** @class */ (function (_super) {
    __extends(EntityList, _super);
    function EntityList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EntityList.prototype.render = function () {
        var _a = this.props, entity = _a.entity, table = _a.table, editableFields = _a.editableFields;
        var rowValues = {};
        var _editableFields = editableFields || [];
        return (React.createElement(ResourceCollectionLayer, { name: entity.name, dataSource: this.props.dataSource, fields: ['id'].concat(entity.listFields.map(function (x) { return x.fetchField; })), initialSorting: entity.initialSorting, initialFilters: entity.initialFilters, render: function (resource) { return (React.createElement(Card, { bodyStyle: { padding: '0' }, title: entity.title, extra: [
                    entity.searchable && (React.createElement(ResourceSearchInput, { resourceCollection: resource, size: "small", style: { width: 300, marginRight: 8 } })),
                    React.createElement(Link, { to: "new" },
                        React.createElement(Button, { size: "small", htmlType: "button", icon: "plus" }))
                ].filter(function (x) { return x; }) },
                React.createElement(ResourceTable, __assign({ className: "entitytable", scroll: { x: true }, resourceCollection: resource, pagination: {
                        defaultPageSize: 30,
                        pageSizeOptions: ['10', '20', '30', '50', '100'],
                        showSizeChanger: true
                    } }, table, { columns: entity.listFields.map(function (field) {
                        var filter = field.filter;
                        return {
                            key: field.name,
                            dataIndex: field.name,
                            title: field.shortTitle,
                            sorter: field.sortable,
                            filterDropdown: filter
                                ? field.filterDropdown(resource)
                                : undefined,
                            filterFormatter: field.filterFormatter,
                            render: function (value, record) {
                                return (React.createElement(ListCell, { collection: resource, values: rowValues[record.id] || record, field: field, editable: _editableFields.indexOf(field.name) > -1 }));
                            }
                        };
                    }), actionButtons: [
                        function (props) { return (React.createElement(Link, { key: "detail-button-action", to: "" + props.resourceID.toString() },
                            React.createElement(Button, { size: "small" },
                                React.createElement(Icon, { type: entity.showDetailPage ? 'search' : 'edit' })))); },
                        entity.showDetailPage
                            ? function (props) { return (React.createElement(Link, { key: "edit-button-action", to: props.resourceID.toString() + "/edit" },
                                React.createElement(Button, { size: "small" },
                                    React.createElement(Icon, { type: "edit" })))); }
                            : null,
                        'delete'
                    ].filter(function (x) { return x; }) })))); } }));
    };
    return EntityList;
}(React.Component));
export { EntityList };
//# sourceMappingURL=list.js.map