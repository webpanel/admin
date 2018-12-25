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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
import { Button, Icon, Popconfirm, Modal } from 'antd';
import * as React from 'react';
import { ResourceCollectionLayer } from 'webpanel-data';
import { ResourceTable } from 'webpanel-antd';
import '../../../styles/data-grid.css';
import { DataGridCell } from './cell';
import { EntityEdit } from '../pages/edit';
var DataGrid = /** @class */ (function (_super) {
    __extends(DataGrid, _super);
    function DataGrid() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            rowValues: {},
            editingFlags: {},
            addingNewEntity: false
        };
        _this.toggleEditing = function (resourceID, fields, force) {
            if (force === void 0) { force = false; }
            var editingFlags = _this.state.editingFlags;
            for (var _i = 0, fields_1 = fields; _i < fields_1.length; _i++) {
                var field = fields_1[_i];
                var flag = _this.props.editWholeRows || !field
                    ? resourceID + '_row'
                    : resourceID + '_field_' + field.name;
                if (!editingFlags[flag] || force) {
                    editingFlags[flag] = !editingFlags[flag];
                }
            }
            _this.setState({ editingFlags: editingFlags });
        };
        _this.isEditing = function (resourceID, field) {
            var editingFlags = _this.state.editingFlags;
            var flag = _this.props.editWholeRows || !field
                ? resourceID + '_row'
                : resourceID + '_field_' + field.name;
            return editingFlags[flag];
        };
        _this.onValueChange = function (record, field, value) {
            var resourceID = record.id;
            var rowValues = _this.state.rowValues;
            var rowValue = rowValues[resourceID] || record;
            rowValue[field.columnName] = value;
            rowValues[resourceID] = rowValue;
            _this.setState({ rowValues: rowValues });
        };
        _this.saveChange = function (resource, record, fields) { return __awaiter(_this, void 0, void 0, function () {
            var item, values, rowValues, _i, fields_2, field, value;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        item = resource.getItem({ id: record.id });
                        values = {};
                        rowValues = this.state.rowValues[record.id];
                        if (!rowValues) return [3 /*break*/, 3];
                        for (_i = 0, fields_2 = fields; _i < fields_2.length; _i++) {
                            field = fields_2[_i];
                            value = rowValues[field.columnName];
                            values[field.columnName] = value;
                        }
                        item.fields = ['id'];
                        return [4 /*yield*/, item.update(values)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, resource.get()];
                    case 2:
                        _a.sent();
                        if (rowValues[record.id]) {
                            delete rowValues[record.id];
                        }
                        _a.label = 3;
                    case 3:
                        this.setState(rowValues);
                        this.toggleEditing(record.id, fields, true);
                        return [2 /*return*/];
                }
            });
        }); };
        _this.deleteRow = function (resource, resourceID) { return __awaiter(_this, void 0, void 0, function () {
            var item;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        item = resource.getItem({ id: resourceID });
                        item.fields = ['id'];
                        return [4 /*yield*/, item.delete()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, resource.get()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        _this.actionButtons = function (resource, fields) {
            var editWholeRows = _this.props.editWholeRows;
            return editWholeRows
                ? [
                    function (props) {
                        return _this.isEditing(props.resourceID.toString()) ? (React.createElement(Button, { key: "save", htmlType: "button", onClick: function () { return _this.saveChange(resource, props.values, fields); } },
                            React.createElement(Icon, { type: "save" }))) : (React.createElement(Button, { key: "edit", htmlType: "button", onClick: function () {
                                return _this.toggleEditing(props.resourceID.toString(), fields);
                            } },
                            React.createElement(Icon, { type: "edit" })));
                    },
                    function (props) { return (React.createElement(Popconfirm, { key: "delete", title: "Do you want to delete this item?", okText: "Yes", cancelText: "No", onConfirm: function () {
                            return _this.deleteRow(resource, props.resourceID.toString());
                        } },
                        ' ',
                        React.createElement(Button, { htmlType: "button" },
                            React.createElement(Icon, { type: "delete" })))); }
                ]
                : undefined;
        };
        return _this;
    }
    DataGrid.prototype.render = function () {
        var _this = this;
        var _a = this.props, entity = _a.entity, fields = _a.fields, initialFilters = _a.initialFilters, newItemInitialValues = _a.newItemInitialValues;
        var _b = this.state, rowValues = _b.rowValues, addingNewEntity = _b.addingNewEntity;
        var gridFields = entity.fields.filter(function (field) { return !fields || fields.indexOf(field.name) !== -1; });
        return (React.createElement(ResourceCollectionLayer, { dataSource: entity.dataSource, name: entity.name, fields: [
                'id'
            ].concat(gridFields.map(function (x) { return x.fetchField; }).filter(function (x) { return x; })), initialFilters: initialFilters, render: function (resource) {
                var actionButtons = _this.actionButtons(resource, gridFields);
                return (React.createElement("div", null,
                    React.createElement(Button, { htmlType: "button", type: "primary", onClick: function () { return _this.setState({ addingNewEntity: true }); } }, "+"),
                    React.createElement(Modal, { align: {}, title: "Add new", visible: addingNewEntity, afterClose: function () { return resource.get(); } },
                        React.createElement(EntityEdit, { entity: entity, onCreate: function () { return _this.setState({ addingNewEntity: false }); }, initialValues: newItemInitialValues })),
                    React.createElement(ResourceTable, { size: "small", className: "datagrid", scroll: { x: true }, bordered: true, resourceCollection: resource, columns: gridFields.map(function (field, i) { return ({
                            key: i,
                            title: field.title,
                            render: function (value, record) { return (React.createElement(DataGridCell, { values: rowValues[record.id] || record, field: field, isEditing: _this.isEditing(record.id, field), onClick: function () { return _this.toggleEditing(record.id, [field]); }, onChange: function (value) {
                                    return _this.onValueChange(record, field, value);
                                }, onSave: function () { return _this.saveChange(resource, record, [field]); }, onCancel: function () {
                                    return _this.toggleEditing(record.id, [field], true);
                                } })); }
                        }); }), actionButtons: actionButtons })));
            } }));
    };
    return DataGrid;
}(React.Component));
export { DataGrid };
//# sourceMappingURL=index.js.map