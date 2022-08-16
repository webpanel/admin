var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
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
import * as React from "react";
import { Button, Col, Row, Tag } from "antd";
import { EntityField, } from "../EntityField";
import { Link, ResourceSelect } from "webpanel-antd";
import { resolveOptionalThunk, resolveThunk } from "ts-thunk";
// import { IEntityEditConfig } from '../../components/pages/edit';
import { Translation, useTranslation } from "react-i18next";
import { CreateEntityModal } from "../../components/buttons/CreateEntityModal";
import FormItem from "antd/lib/form/FormItem";
import { PlusOutlined } from "@ant-design/icons";
var RelationshipSelectWithAddButton = function (props) {
    var field = props.field, targetEntity = props.targetEntity, isCreatable = props.isCreatable, onChange = props.onChange, value = props.value;
    var resourceConfig = targetEntity.getSearchResourceCollectionConfig();
    var _a = React.useState(undefined), modalVisible = _a[0], setModalVisible = _a[1];
    var t = useTranslation("webpanel-admin").t;
    var showAddButton = typeof isCreatable === "boolean" ? isCreatable : isCreatable.addButton;
    var showAddOnNotFound = typeof isCreatable === "boolean" ? isCreatable : isCreatable.notFound;
    var onSave = function (id) { return __awaiter(void 0, void 0, void 0, function () {
        var updateValues, ids;
        return __generator(this, function (_a) {
            updateValues = {};
            updateValues[field.columnName()] = id;
            if (onChange) {
                if (field.mode === "multiple") {
                    ids = value;
                    ids.push(id.toString());
                    onChange(ids);
                }
                else {
                    onChange(id.toString());
                }
            }
            return [2 /*return*/];
        });
    }); };
    var getAddButton = function () {
        return (React.createElement(Col, { flex: "32px" }, targetEntity.getCreateButton({
            key: "relationship_field_" + field._entity.name + "_" + field.valuePropName + "_add",
            flow: {
                type: "modal",
                modal: {
                    title: "Add " + targetEntity.title,
                    width: "70%",
                },
            },
            onSave: onSave,
        })));
    };
    return (React.createElement(Row, null,
        React.createElement(Col, { flex: "auto" },
            React.createElement(ResourceSelect
            // key={`relationship_field_${entity.name}_${this.valuePropName}`}
            , { 
                // key={`relationship_field_${entity.name}_${this.valuePropName}`}
                value: value, valueKey: "id", labelKey: function (value) {
                    return targetEntity.render(value);
                }, mode: field.mode, resource: resourceConfig, showSearch: true, style: {
                    width: "100%",
                    minWidth: "100px",
                }, onChange: function (value) { return onChange && onChange(value); }, notFoundContent: showAddOnNotFound && (React.createElement(Button, { onClick: function () { return setModalVisible(true); }, icon: React.createElement(PlusOutlined, null) }, t("notFoundCreateNew"))) })),
        showAddOnNotFound && (React.createElement(CreateEntityModal, { entity: targetEntity, onSave: function (id) {
                setModalVisible(false);
                onSave(id);
            }, modal: {
                visible: modalVisible,
                onCancel: function () { return setModalVisible(false); },
            } })),
        showAddButton && getAddButton()));
};
export var relationshipFieldFilter = function (columnName, entity) {
    return {
        dropdownInput: function (props) {
            return getRelationshipFilterDropdownInput(resolveThunk(entity), props);
        },
        normalizer: function (values) {
            var res = {};
            if (values && values.length > 0) {
                res[columnName + "_in"] = values;
            }
            return res;
        },
        denormalizer: function (values) {
            return values[columnName + "_in"] || [];
        },
    };
};
var EntityFieldRelationship = /** @class */ (function (_super) {
    __extends(EntityFieldRelationship, _super);
    function EntityFieldRelationship(name, config, _entity) {
        var _this = _super.call(this, name, config, _entity) || this;
        _this.name = name;
        _this.config = config;
        _this._entity = _entity;
        _this.filterDropdownInput = function (props) {
            return (_this.filterConfig.dropdownInput && _this.filterConfig.dropdownInput(props));
        };
        _this.filterConfig = relationshipFieldFilter(_this.columnName(), _this.config.targetEntity);
        return _this;
    }
    Object.defineProperty(EntityFieldRelationship.prototype, "type", {
        get: function () {
            return this.config.type === "toOne" ? "toOne" : "toMany";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EntityFieldRelationship.prototype, "targetEntity", {
        get: function () {
            return resolveThunk(this.config.targetEntity);
        },
        enumerable: false,
        configurable: true
    });
    EntityFieldRelationship.prototype.columnName = function () {
        return "" + this.name + (this.type === "toOne" ? "Id" : "Ids");
    };
    Object.defineProperty(EntityFieldRelationship.prototype, "mode", {
        get: function () {
            return this.type === "toOne" ? undefined : "multiple";
        },
        enumerable: false,
        configurable: true
    });
    EntityFieldRelationship.prototype.fetchField = function () {
        var name = this.name;
        var searchFields = resolveThunk(this.config.targetEntity).searchableFields;
        name += "{ id " + searchFields
            .map(function (x) { return x.fetchField(); })
            .join(" ") + "} " + this.columnName() + " ";
        return name;
    };
    Object.defineProperty(EntityFieldRelationship.prototype, "render", {
        get: function () {
            var _this = this;
            var _a = this.config, targetEntity = _a.targetEntity, type = _a.type, render = _a.render, showLink = _a.showLink;
            var _targetEntity = resolveThunk(targetEntity);
            var _showLink = resolveOptionalThunk(showLink);
            var _render = render || _targetEntity.render;
            return function (values) {
                var value = values[_this.name];
                if (type === "toMany" && Array.isArray(value)) {
                    return value
                        .map(function (x) {
                        var content = _render && _render(x);
                        if (_showLink) {
                            return (React.createElement(Link, { to: _targetEntity.getDetailLink(x.id) }, content));
                        }
                        return content;
                    })
                        .filter(function (x) { return x; })
                        .map(function (x) { return React.createElement(Tag, { key: String(x) }, x); });
                }
                if (!value) {
                    return "–";
                }
                var content = _render && _render(value);
                if (_showLink) {
                    content = (React.createElement(Link, { to: _targetEntity.getDetailLink(value.id) }, content));
                }
                return content;
            };
        },
        enumerable: false,
        configurable: true
    });
    EntityFieldRelationship.prototype.fieldElement = function (key, config) {
        var _this = this;
        var _a = this.config, targetEntity = _a.targetEntity, creatable = _a.creatable;
        var _targetEntity = resolveThunk(targetEntity);
        var formItemLayout = config.formLayout === "horizontal"
            ? {
                labelCol: { span: 8 },
                wrapperCol: { span: 16 },
            }
            : null;
        var _isCreatable = resolveOptionalThunk(creatable);
        var isCreatable = _targetEntity.creatable &&
            (_isCreatable || typeof _isCreatable === "undefined");
        return (React.createElement(Translation, { key: key }, function (t) { return (React.createElement(FormItem, __assign({ label: t(_this.titleTranslationKey, {
                defaultValue: _this.title,
            }), extra: _this.config.description, name: _this.columnName(), style: {
                width: "100%",
            }, rules: resolveOptionalThunk(_this.config.rules), dependencies: resolveOptionalThunk(_this.config.dependencies) }, formItemLayout),
            React.createElement(RelationshipSelectWithAddButton, { field: _this, targetEntity: _targetEntity, isCreatable: isCreatable }))); }));
    };
    EntityFieldRelationship.prototype.inputElement = function (props) {
        var targetEntity = this.config.targetEntity;
        var _targetEntity = resolveThunk(targetEntity);
        var onChange = props && props.onChange;
        var onChangeProp = onChange
            ? function (value) {
                // const array: LabeledValue[] = Array.isArray(value) ? value : [value];
                onChange(value || null);
            }
            : undefined;
        var resourceConfig = _targetEntity.getSearchResourceCollectionConfig();
        return (React.createElement(ResourceSelect, __assign({ showSearch: true, allowClear: true, style: { width: "100%", minWidth: "100px" } }, props, { valueKey: "id", labelKey: function (value) {
                return _targetEntity.render(value);
            }, mode: this.mode, resource: resourceConfig, onChange: onChangeProp })));
    };
    Object.defineProperty(EntityFieldRelationship.prototype, "filterNormalize", {
        get: function () {
            return this.filterConfig.normalizer;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EntityFieldRelationship.prototype, "filterDenormalize", {
        get: function () {
            return this.filterConfig.denormalizer;
        },
        enumerable: false,
        configurable: true
    });
    return EntityFieldRelationship;
}(EntityField));
export { EntityFieldRelationship };
export var getRelationshipFilterDropdownInput = function (targetEntity, props) {
    var _targetEntity = resolveThunk(targetEntity);
    var value = props.selectedKeys;
    var resourceConfig = _targetEntity.getSearchResourceCollectionConfig();
    return (React.createElement(ResourceSelect, { valueKey: "id", labelKey: function (value) {
            return _targetEntity.render(value);
        }, value: value, mode: "multiple", allowClear: false, showSearch: true, resource: resourceConfig, style: { width: 350 }, onChange: function (value) {
            if (Array.isArray(value)) {
                props.setSelectedKeys(value);
            }
            else {
                props.setSelectedKeys([value.toString()]);
            }
        } }));
};
//# sourceMappingURL=EntityFieldRelationship.js.map