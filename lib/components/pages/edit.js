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
import { Card } from 'antd';
import * as React from 'react';
import { ResourceForm } from 'webpanel-antd';
import { ResourceLayer } from 'webpanel-data';
import { ResourceFormPageButtons } from '../form/buttons';
var EntityEdit = /** @class */ (function (_super) {
    __extends(EntityEdit, _super);
    function EntityEdit() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { version: 0 };
        _this.handleSave = function (formContext, option, resource) { return __awaiter(_this, void 0, void 0, function () {
            var _a, route, entity;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, route = _a.route, entity = _a.entity;
                        return [4 /*yield*/, formContext.formComponent.submit()];
                    case 1:
                        _b.sent();
                        if (!route) {
                            return [2 /*return*/];
                        }
                        switch (option) {
                            case 'add':
                                this.setState({ version: this.state.version + 1 });
                                break;
                            case 'edit':
                                route.history.push('/' + entity.structureName + '/' + resource.id);
                                break;
                            case 'default':
                                route.history.push('/' + entity.structureName + '/');
                                break;
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        return _this;
    }
    EntityEdit.prototype.render = function () {
        var _this = this;
        var _a = this.props, entity = _a.entity, resourceID = _a.resourceID, initialValues = _a.initialValues, onCreate = _a.onCreate;
        return (React.createElement(ResourceLayer, { key: this.state.version, name: entity.name, id: resourceID, fields: entity.editFields.map(function (f) { return f.columnName; }), dataSource: entity.dataSource, onCreate: onCreate, initialValues: initialValues, render: function (resource) { return (React.createElement(Card, null,
                React.createElement(ResourceForm, { formResource: resource, render: function (formContext) { return (React.createElement(React.Fragment, null,
                        entity.editFields.map(function (field, i) {
                            return field.fieldElement(field, formContext, i);
                        }),
                        React.createElement(ResourceFormPageButtons, { hasChanges: formContext.form.isFieldsTouched(), handleReset: function () { return formContext.formComponent.resetFields(); }, handleSave: function (option) {
                                return _this.handleSave(formContext, option, resource);
                            } }))); } }))); } }));
    };
    return EntityEdit;
}(React.Component));
export { EntityEdit };
//# sourceMappingURL=edit.js.map