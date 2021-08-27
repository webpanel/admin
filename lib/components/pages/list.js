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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
import "../../../styles/entity-list.css";
import * as React from "react";
import { Button, Card, Space, Tooltip } from "antd";
import { useResourceCollection, } from "webpanel-data";
import { detailListButton, editListButton, } from "./list.buttons";
import { ResourceSearchInput, ResourceTable, } from "webpanel-antd";
import { resolveOptionalThunk } from "ts-thunk";
import { Translation, useTranslation } from "react-i18next";
import { FilterOutlined } from "@ant-design/icons";
import { ListCell } from "./list-cell";
import inflection from "inflection";
export var EntityList = function (props) {
    var getColumns = function (listFields, resource, t) {
        var entity = props.entity, editableFields = props.editableFields;
        var _editableFields = resolveOptionalThunk(editableFields) || [];
        var entityListFields = listFields.map(function (x) { return x.field; });
        var hasAggregations = listFields.filter(function (x) { return x.aggregation; }).length > 0;
        return listFields.map(function (columnField) {
            var field = columnField.field, render = columnField.render, align = columnField.align, titleRender = columnField.titleRender, aggregation = columnField.aggregation;
            var _align = align || field.listColumnAlign;
            var fieldTitle = t(field.titleTranslationKey, {
                defaultValue: field.shortTitle,
            });
            var title = titleRender
                ? titleRender({ title: fieldTitle, data: resource.data })
                : fieldTitle;
            var col = {
                key: field.name,
                dataIndex: field.name,
                align: _align,
                width: columnField.width,
                shouldCellUpdate: function (record, prevRecord) {
                    return record !== prevRecord;
                },
                render: function (value, record, index) {
                    var values = record;
                    if (render) {
                        return render(value, values, index, field);
                    }
                    return (React.createElement(ListCell, { collection: resource, values: values, field: field, editable: entity.updateable(record) &&
                            _editableFields.indexOf(field.name) > -1 &&
                            field.isWriteable(record), fields: entityListFields }));
                },
            };
            if (hasAggregations) {
                col.children = [
                    __assign(__assign({}, col), { className: "table-aggregation-row", title: function () {
                            if (!aggregation) {
                                return;
                            }
                            var key = col.dataIndex + inflection.camelize(aggregation.toLowerCase());
                            var value = resource.aggregations && resource.aggregations[key];
                            var obj = {};
                            obj[field.name] = value;
                            return field.render(obj);
                        } }),
                ];
            }
            col.title = title;
            col.sorter = field.sortable;
            col.sortColumns = field.sortColumns();
            col.filterDropdown = field.filter
                ? field.filterDropdown(resource)
                : undefined;
            col.filterNormalize = field.filterNormalizeFn();
            col.filterDenormalize = field.filterDenormalizeFn();
            return col;
        });
    };
    var getListFields = function () {
        var _a;
        var entity = props.entity, fields = props.fields;
        var _fields = resolveOptionalThunk(fields || ((_a = entity.getListConfig()) === null || _a === void 0 ? void 0 : _a.fields));
        var listFields = [];
        if (_fields) {
            for (var _i = 0, _fields_1 = _fields; _i < _fields_1.length; _i++) {
                var f = _fields_1[_i];
                var fieldName = typeof f === "string" ? f : f.field;
                var render = (typeof f !== "string" && f.render) || undefined;
                var hidden_1 = (typeof f !== "string" && f.hidden) || false;
                var align = (typeof f !== "string" && f.align) || undefined;
                var width = (typeof f !== "string" && f.width) || undefined;
                var titleRender = (typeof f !== "string" && f.titleRender) || undefined;
                var aggregation = (typeof f !== "string" && f.aggregation) || undefined;
                var field = entity.getField(fieldName);
                if (!field) {
                    throw new Error("Field '" + fieldName + "' not found in entity '" + entity.name + "'");
                }
                listFields.push({
                    field: field,
                    hidden: hidden_1,
                    render: render,
                    align: align,
                    titleRender: titleRender,
                    aggregation: aggregation,
                    width: width,
                });
            }
        }
        else {
            for (var _b = 0, _c = entity.getListFields(); _b < _c.length; _b++) {
                var f = _c[_b];
                listFields.push({ field: f, hidden: false });
            }
        }
        return listFields;
    };
    var cardContent = function (resource, t) {
        var entity = props.entity, card = props.card, title = props.title, searchable = props.searchable, showAddButton = props.showAddButton, addButton = props.addButton;
        var _searchable = typeof searchable !== "undefined" ? searchable : entity.searchable;
        var _addButton = resolveOptionalThunk(addButton, {
            collection: resource,
        });
        if (typeof showAddButton !== "undefined") {
            _addButton = showAddButton;
        }
        if (typeof _addButton === "undefined" || _addButton === true) {
            _addButton = {
                flow: "redirect",
            };
        }
        var hasTableFilter = typeof resource.namedFilter("table") !== "undefined";
        return (React.createElement(Card, __assign({ bodyStyle: { padding: "0" }, title: title ||
                t(entity.name + "._title", { count: 100, defaultValue: entity.title }), key: entity.name + ".table-card" }, card, { extra: React.createElement(Space, { key: "default-buttons" },
                card && card.extra,
                hasTableFilter && (React.createElement(Tooltip, { title: React.createElement(Translation, { ns: "webpanel-admin" }, function (t) { return t("clearFilter"); }) },
                    React.createElement(Button, { icon: React.createElement(FilterOutlined, null), danger: true, size: "small", onClick: function () { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, resource.updateNamedFilters("table", undefined)];
                                    case 1:
                                        _a.sent();
                                        return [4 /*yield*/, resource.reload()];
                                    case 2:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); } }))),
                _searchable && (React.createElement(ResourceSearchInput, { key: "searchInput", resourceCollection: resource, size: "small", style: {
                        width: "100%",
                        minWidth: 100,
                        maxWidth: 150,
                    } })),
                _addButton &&
                    entity.creatable &&
                    (React.isValidElement(_addButton)
                        ? _addButton
                        : entity.getCreateButton(__assign({ key: "create", button: { size: "small" }, onSave: function () { return resource.reload(); } }, (typeof _addButton === "object" ? _addButton : {}))))) }), tableContent(resource, t)));
    };
    var tableActionButtons = function (resourceValues, resourceCollection, buttons) {
        var entity = props.entity, _table = props.table;
        var table = resolveOptionalThunk(_table, resourceCollection);
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
                    if (!entity.updateable(resourceValues)) {
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
                    if (!entity.deletable(resourceValues)) {
                        return null;
                    }
                    return "delete";
                default:
                    return item;
            }
        })
            .filter(function (x) { return x; });
    };
    var tableContent = function (resource, t) {
        var entity = props.entity, _table = props.table;
        var table = resolveOptionalThunk(_table, resource);
        var defaultPagination = {
            defaultPageSize: 30,
            pageSizeOptions: ["10", "20", "30", "50", "100"],
            showSizeChanger: true,
            showTotal: function (total, range) {
                return range[0] + "-" + range[1] + " / " + total;
            },
        };
        return (React.createElement(React.Fragment, null,
            React.createElement(ResourceTable, __assign({ key: "table_" + resource.name, className: "entitytable", scroll: { x: true }, resourceCollection: resource, pagination: __assign(__assign({}, defaultPagination), (table && table.pagination)), customDetailURL: function (resourceID) {
                    return entity.getDetailLink(resourceID);
                } }, table, { actionButtons: function (values) {
                    return tableActionButtons(values, resource, resolveOptionalThunk(table === null || table === void 0 ? void 0 : table.actionButtons, values));
                }, columns: getColumns(getListFields().filter(function (x) { return !x.hidden; }), resource, t), onRowDelete: function (id) {
                    if (table === null || table === void 0 ? void 0 : table.onDelete) {
                        table.onDelete(id);
                    }
                } }))));
    };
    var entity = props.entity, initialFilters = props.initialFilters, initialSorting = props.initialSorting, wrapperType = props.wrapperType, aggregations = props.aggregations, hidden = props.hidden, restProps = __rest(props, ["entity", "initialFilters", "initialSorting", "wrapperType", "aggregations", "hidden"]);
    var fields = __spreadArray([
        "id"
    ], getListFields()
        .map(function (x) { return x.field.fetchField(); })
        .filter(function (x) { return x; }));
    var allAggregations = aggregations || [];
    for (var _i = 0, _a = getListFields(); _i < _a.length; _i++) {
        var f = _a[_i];
        if (f.aggregation) {
            allAggregations.push({ name: f.field.name, function: f.aggregation });
        }
    }
    var resource = useResourceCollection(__assign(__assign({ name: entity.resourceName, dataSource: entity.dataSource }, restProps), { fields: fields, aggregations: Object.keys(allAggregations).length > 0 ? allAggregations : undefined, initialSorting: initialSorting || entity.initialSorting, initialFilters: initialFilters || entity.initialFilters }));
    var t = useTranslation().t;
    var isHidden = resolveOptionalThunk(hidden, resource);
    if (isHidden) {
        return null;
    }
    return (React.createElement(React.Fragment, null, wrapperType === "plain"
        ? tableContent(resource, t)
        : cardContent(resource, t)));
};
//# sourceMappingURL=list.js.map