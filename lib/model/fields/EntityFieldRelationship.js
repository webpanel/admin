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
import * as React from 'react';
import { Button, Modal, Tag } from 'antd';
import { EntityField } from '../EntityField';
import { FormField, ResourceSelect } from 'webpanel-antd';
import { ResourceCollectionLayer } from 'webpanel-data';
import { resolveOptionalThunk, resolveThunk } from 'ts-thunk';
import { Translation } from 'react-i18next';
import { entityPermission } from '../permissions';
var EntityFieldRelationship = /** @class */ (function (_super) {
    __extends(EntityFieldRelationship, _super);
    function EntityFieldRelationship() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.filterDropdownInput = function (props) {
            var targetEntity = _this.config.targetEntity;
            var _targetEntity = resolveThunk(targetEntity);
            var value = props.selectedKeys;
            return (React.createElement(ResourceCollectionLayer, { name: _targetEntity.name, fields: [
                    'id'
                ].concat(_targetEntity.searchableFields
                    .map(function (x) { return x.fetchField(); })
                    .filter(function (x) { return x; })), dataSource: _targetEntity.dataSource, initialFilters: _targetEntity.initialFilters, initialSorting: _targetEntity.initialSorting, autoload: !!value, render: function (resource) {
                    return (React.createElement(ResourceSelect, { valueKey: "id", labelKey: function (value) {
                            return _targetEntity.render(value);
                        }, value: value, mode: _this.mode, allowClear: false, showSearch: true, resourceCollection: resource, style: { minWidth: '200px' }, onChange: function (value, option) {
                            if (Array.isArray(value)) {
                                props.setSelectedKeys(value);
                            }
                            else {
                                props.setSelectedKeys([value.toString()]);
                            }
                        } }));
                } }));
        };
        return _this;
    }
    Object.defineProperty(EntityFieldRelationship.prototype, "type", {
        get: function () {
            return this.config.type === 'toOne' ? 'toOne' : 'toMany';
        },
        enumerable: true,
        configurable: true
    });
    EntityFieldRelationship.prototype.columnName = function () {
        return "" + this.name + (this.type === 'toOne' ? 'Id' : 'Ids');
    };
    Object.defineProperty(EntityFieldRelationship.prototype, "mode", {
        get: function () {
            return this.type === 'toOne' ? 'default' : 'multiple';
        },
        enumerable: true,
        configurable: true
    });
    EntityFieldRelationship.prototype.fetchField = function () {
        var name = this.name;
        var searchFields = resolveThunk(this.config.targetEntity)
            .searchableFields;
        name += "{ id " + searchFields
            .map(function (f) { return f.name; })
            .join(' ') + "} " + this.columnName() + " ";
        return name;
    };
    Object.defineProperty(EntityFieldRelationship.prototype, "render", {
        get: function () {
            var _this = this;
            var _a = this.config, targetEntity = _a.targetEntity, type = _a.type, render = _a.render;
            var _render = render || resolveThunk(targetEntity).render;
            return function (values) {
                var value = values[_this.name];
                if (type === 'toMany' && Array.isArray(value)) {
                    return value
                        .map(function (x) { return _render && _render(x); })
                        .filter(function (x) { return x; })
                        .map(function (x) { return React.createElement(Tag, { key: String(x) }, x); });
                }
                if (!value) {
                    return '–';
                }
                return _render && _render(value);
            };
        },
        enumerable: true,
        configurable: true
    });
    EntityFieldRelationship.prototype.fieldElement = function (formContext, key, config) {
        var _this = this;
        var targetEntity = this.config.targetEntity;
        var _targetEntity = resolveThunk(targetEntity);
        var formItemLayout = config.formLayout === 'horizontal'
            ? {
                labelCol: { span: 8 },
                wrapperCol: { span: 16 }
            }
            : null;
        var addButtonMargin = config.formLayout === 'horizontal' ? '4px 0 0 4px' : '0 0 0 4px';
        return (React.createElement(ResourceCollectionLayer, { key: key, name: _targetEntity.name, fields: [
                'id'
            ].concat(_targetEntity.searchableFields.map(function (x) { return x.name; })), initialSorting: _targetEntity.initialSorting, initialFilters: _targetEntity.initialFilters, dataSource: _targetEntity.dataSource, render: function (collection) { return (React.createElement(Translation, null, function (t) { return (React.createElement(FormField, __assign({ label: t(_this.entity.name + "." + _this.name, {
                    default: _this.title
                }), extra: _this.config.description, name: _this.columnName(), formContext: formContext, style: {
                    width: '100%'
                }, rules: resolveOptionalThunk(_this.config.rules) }, formItemLayout),
                React.createElement(ResourceSelect, { key: "relationship_field_" + _this.entity.name + "_" + _this.valuePropName, valueKey: "id", labelKey: function (value) {
                        return _targetEntity.render(value);
                    }, mode: _this.mode, resourceCollection: collection, showSearch: true, style: {
                        width: '100%',
                        minWidth: '200px',
                        marginRight: '-38px',
                        paddingRight: '38px'
                    } }),
                entityPermission(_targetEntity, 'create') && (React.createElement(Button, { key: "relationship_field_" + _this.entity.name + "_" + _this.valuePropName + "_add", size: "small", icon: "plus", style: {
                        margin: addButtonMargin,
                        height: '32px'
                    }, onClick: function () {
                        var infoWindow = Modal.info({
                            title: "Add " + _targetEntity.title,
                            maskClosable: true,
                            okText: 'Close',
                            style: { minWidth: '60%' },
                            content: _targetEntity.getCreateView(undefined, {
                                onSave: function (id) { return __awaiter(_this, void 0, void 0, function () {
                                    var updateValues;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, collection.get()];
                                            case 1:
                                                _a.sent();
                                                updateValues = {};
                                                updateValues[this.columnName()] = id;
                                                formContext.form.setFieldsValue(updateValues);
                                                infoWindow.destroy();
                                                return [2 /*return*/];
                                        }
                                    });
                                }); }
                            })
                        });
                    } })))); })); } }));
    };
    EntityFieldRelationship.prototype.inputElement = function (props) {
        var _this = this;
        var targetEntity = this.config.targetEntity;
        var _targetEntity = resolveThunk(targetEntity);
        var onChange = props && props.onChange;
        var onChangeProp = onChange
            ? function (value, option) {
                var options = Array.isArray(option)
                    ? option
                    : [option];
                // const array: LabeledValue[] = Array.isArray(value) ? value : [value];
                onChange(value, options.map(function (o) { return o.props.children; }).join(', '));
            }
            : undefined;
        return (React.createElement(ResourceCollectionLayer, { name: _targetEntity.name, fields: [
                'id'
            ].concat(_targetEntity.searchableFields.map(function (x) { return x.name; })), initialSorting: _targetEntity.initialSorting, initialFilters: _targetEntity.initialFilters, dataSource: _targetEntity.dataSource, render: function (collection) {
                return (React.createElement(ResourceSelect, __assign({}, props, { valueKey: "id", allowClear: true, showSearch: true, style: { width: '100%', minWidth: '200px' }, labelKey: function (value) {
                        return _targetEntity.render(value);
                    }, mode: _this.mode, resourceCollection: collection, 
                    // labelInValue={true}
                    onChange: onChangeProp })));
            } }));
    };
    Object.defineProperty(EntityFieldRelationship.prototype, "filterNormalize", {
        get: function () {
            var _this = this;
            return function (values) {
                var res = {};
                if (values.length == 1) {
                    res[_this.name] = { id: values[0] };
                }
                else if (values.length > 1) {
                    res[_this.name] = { id_in: values };
                }
                return res;
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityFieldRelationship.prototype, "filterDenormalize", {
        get: function () {
            var _this = this;
            return function (values) {
                var res = [];
                var value = values[_this.columnName()] ||
                    values[_this.columnName()
                        .replace('Ids', '')
                        .replace('Id', '')];
                if (value) {
                    if (value.id) {
                        res = [value.id];
                    }
                    else if (value.id_in) {
                        res = value.id_in;
                    }
                }
                return res;
            };
        },
        enumerable: true,
        configurable: true
    });
    return EntityFieldRelationship;
}(EntityField));
export { EntityFieldRelationship };
//# sourceMappingURL=EntityFieldRelationship.js.map