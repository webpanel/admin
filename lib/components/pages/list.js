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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import "../../../styles/entity-list.css";
import * as React from "react";
import { ResourceCollectionLayer } from "webpanel-data";
import { detailListButton, editListButton } from "./list.buttons";
import { ResourceSearchInput, ResourceTable } from "webpanel-antd";
import { resolveOptionalThunk } from "ts-thunk";
import { Card } from "antd";
import { ListCell } from "./list-cell";
import { Translation } from "react-i18next";
var EntityList = /** @class */ (function (_super) {
    __extends(EntityList, _super);
    function EntityList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EntityList.prototype.getColumns = function (listFields, resource, t) {
        var _a = this.props, entity = _a.entity, editableFields = _a.editableFields;
        var _editableFields = (entity.updateable && resolveOptionalThunk(editableFields)) || [];
        var rowValues = {};
        return listFields.map(function (column) {
            var field = column.field, render = column.render;
            return {
                key: field.name,
                dataIndex: field.name,
                title: t(field.entity.name + "." + field.name, {
                    defaultValue: field.shortTitle
                }),
                sorter: field.sortable,
                sortColumns: field.sortColumns(),
                filterDropdown: field.filter
                    ? field.filterDropdown(resource)
                    : undefined,
                filterNormalize: field.filterNormalizeFn(),
                filterDenormalize: field.filterDenormalizeFn(),
                render: function (value, record, index) {
                    var values = rowValues[record.id] || record;
                    if (render) {
                        return render(value, values, index, field);
                    }
                    return (React.createElement(ListCell, { collection: resource, values: values, field: field, editable: _editableFields.indexOf(field.name) > -1 && field.writeable }));
                }
            };
        });
    };
    EntityList.prototype.getListFields = function () {
        var _a = this.props, entity = _a.entity, fields = _a.fields;
        var _fields = resolveOptionalThunk(fields);
        var listFields = [];
        if (_fields) {
            for (var _i = 0, _fields_1 = _fields; _i < _fields_1.length; _i++) {
                var f = _fields_1[_i];
                var fieldName = typeof f === "string" ? f : f.field;
                var render = (typeof f !== "string" && f.render) || undefined;
                var hidden = (typeof f !== "string" && f.hidden) || false;
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
        return listFields;
    };
    EntityList.prototype.cardContent = function (resource, t) {
        var _a = this.props, entity = _a.entity, card = _a.card, title = _a.title, searchable = _a.searchable, showAddButton = _a.showAddButton, addButton = _a.addButton;
        var _searchable = typeof searchable !== "undefined" ? searchable : entity.searchable;
        var _addButton = addButton;
        if (typeof showAddButton !== "undefined") {
            _addButton = showAddButton;
        }
        if (typeof _addButton === "undefined" || _addButton === true) {
            _addButton = {
                flow: "redirect"
            };
        }
        return (React.createElement(Card, __assign({ bodyStyle: { padding: "0" }, title: title ||
                t(entity.name + "._title", { count: 100, defaultValue: entity.title }) }, card, { extra: [
                _searchable && (React.createElement(ResourceSearchInput, { key: "searchInput", resourceCollection: resource, size: "small", style: {
                        width: "100%",
                        minWidth: 100,
                        maxWidth: 150,
                        marginRight: 8
                    } })),
                _addButton &&
                    entity.creatable &&
                    entity.getCreateButton(__assign({ button: { size: "small" }, onCreate: function () { return resource.reload(); } }, (typeof _addButton === "object" ? _addButton : {}))),
                // <EntityAddButton
                //   key="addButton"
                //   entity={entity}
                //   onCreate={() => resource.reload()}
                //   {..._addButton}
                // />
                card && card.extra
            ].filter(function (x) { return x; }) }), this.tableContent(resource, t)));
    };
    EntityList.prototype.tableActionButtons = function (buttons) {
        var _a = this.props, entity = _a.entity, table = _a.table;
        if (table && table.condensed) {
            table.size = "small";
        }
        var size = table && table.size === "small" ? "small" : "default";
        if (typeof buttons === "undefined") {
            buttons = ["detail", "edit", "delete"];
        }
        return buttons
            .map(function (item) {
            if (typeof item === "function") {
                return function (props) {
                    return item(__assign(__assign({}, props), { entity: entity }));
                };
            }
            switch (item) {
                case "edit":
                    if (!entity.updateable) {
                        return null;
                    }
                    return function (props) {
                        return editListButton(__assign(__assign({}, props), { entity: entity }), size);
                    };
                case "detail":
                    if (!entity.showDetailPage) {
                        return null;
                    }
                    return function (props) {
                        return detailListButton(__assign(__assign({}, props), { entity: entity }), size);
                    };
                case "delete":
                    if (!entity.deletable) {
                        return null;
                    }
                    return "delete";
                default:
                    return item;
            }
        })
            .filter(function (x) { return x; });
    };
    EntityList.prototype.tableContent = function (resource, t) {
        var _a = this.props, entity = _a.entity, table = _a.table;
        var defaultPagination = {
            defaultPageSize: 30,
            pageSizeOptions: ["10", "20", "30", "50", "100"],
            showSizeChanger: true,
            showTotal: function (total, range) {
                return range[0] + "-" + range[1] + " / " + total;
            }
        };
        return (React.createElement(ResourceTable, __assign({ className: "entitytable", scroll: { x: true }, resourceCollection: resource, pagination: __assign(__assign({}, defaultPagination), (table && table.pagination)), customDetailURL: function (resourceID) {
                return entity.getDetailLink(resourceID);
            } }, table, { actionButtons: this.tableActionButtons(table && table.actionButtons), columns: this.getColumns(this.getListFields().filter(function (x) { return !x.hidden; }), resource, t) })));
    };
    EntityList.prototype.render = function () {
        var _this = this;
        var _a = this.props, entity = _a.entity, initialFilters = _a.initialFilters, initialSorting = _a.initialSorting, wrapperType = _a.wrapperType, restProps = __rest(_a, ["entity", "initialFilters", "initialSorting", "wrapperType"]);
        var fields = __spreadArrays([
            "id"
        ], this.getListFields()
            .map(function (x) { return x.field.fetchField(); })
            .filter(function (x) { return x; }));
        return (React.createElement(Translation, null, function (t) { return (React.createElement(ResourceCollectionLayer, __assign({ name: entity.name, dataSource: _this.props.dataSource }, restProps, { fields: fields, initialSorting: initialSorting || entity.initialSorting, initialFilters: initialFilters || entity.initialFilters, 
            // pollInterval={pollInterval}
            render: function (resource) {
                return wrapperType === "plain"
                    ? _this.tableContent(resource, t)
                    : _this.cardContent(resource, t);
            } }))); }));
    };
    return EntityList;
}(React.Component));
export { EntityList };
//# sourceMappingURL=list.js.map