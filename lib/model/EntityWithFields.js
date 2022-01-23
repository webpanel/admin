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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
import * as React from "react";
import { useResource, useResourceCollection, } from "webpanel-data";
import { EntityFieldBoolean, } from "./fields/EntityFieldBoolean";
import { EntityFieldComputed, } from "./fields/EntityFieldComputed";
import { EntityFieldCustom, } from "./fields/EntityFieldCustom";
import { EntityFieldDate, } from "./fields/EntityFieldDate";
import { EntityFieldEnum, } from "./fields/EntityFieldEnum";
import { EntityFieldFile, } from "./fields/EntityFieldFile";
import { EntityFieldNumber, } from "./fields/EntityFieldNumber";
import { EntityFieldPercentage, } from "./fields/EntityFieldPercentage";
import { EntityFieldRelationship, } from "./fields/EntityFieldRelationship";
import { resolveOptionalThunk } from "ts-thunk";
import { EntityFieldColor } from "./fields/EntityFieldColor";
import { EntityFieldPasssword } from "./fields/EntityFieldPassword";
import { EntityFieldString } from "./fields/EntityFieldString";
import { EntityFieldText } from "./fields/EntityFieldText";
import { EntityBase } from "./EntityBase";
import { CreateEntityButton, } from "../components/buttons/EntityAddButton";
import { EntityEdit, } from "../components/pages/edit";
import { DetailEntityButton, } from "../components/buttons/EntityDetailButton";
import { EntityDetail } from "../components/pages/detail";
import { EntityList } from "../components/pages/list";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { EditOutlined, FolderOutlined } from "@ant-design/icons";
import { Layout } from "webpanel-antd";
import { Redirect } from "react-router";
import { Translation } from "react-i18next";
import { EntitySelect } from "../components/entity-picker";
var EntityWithFields = /** @class */ (function (_super) {
    __extends(EntityWithFields, _super);
    function EntityWithFields() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.fields = [];
        // resource hooks
        _this.getSearchResourceCollectionConfig = function () {
            return {
                name: _this.resourceName,
                fields: __spreadArray([
                    "id"
                ], _this.searchableFields.map(function (x) { return x.fetchField() || x.name; })),
                initialSorting: _this.initialSorting,
                initialFilters: _this.initialFilters,
                dataSource: _this.dataSource,
            };
        };
        // views
        _this.getListView = function (config) {
            return React.createElement(EntityList, __assign({ entity: _this }, config));
        };
        _this.getDetailView = function (resourceID, config) {
            return (React.createElement(EntityDetail, __assign({ entity: _this, resourceID: resourceID }, _this.getDetailConfig(resourceID), config)));
        };
        _this.getDetailButton = function (id, props) {
            return React.createElement(DetailEntityButton, __assign({ entity: _this, entityId: id }, props));
        };
        _this.getCreateView = function (props) {
            if (_this.createLayout) {
                return _this.createLayout(__assign({ entity: _this }, props));
            }
            return React.createElement(EntityEdit, __assign({ entity: _this }, _this.getEditConfig(), props));
        };
        _this.getCreateButton = function (props) {
            return React.createElement(CreateEntityButton, __assign({ entity: _this }, props));
        };
        _this.getEditView = function (props) {
            if (_this.editLayout) {
                return _this.editLayout(__assign({ entity: _this }, props));
            }
            return (React.createElement(EntityEdit, __assign({ entity: _this }, _this.getEditConfig(props.resourceID), props)));
        };
        // layouts
        _this.menuItem = function () {
            var props = resolveOptionalThunk(_this.config.menu);
            return (React.createElement(Layout.MenuItem, __assign({ key: _this.structureName, title: React.createElement(Translation, null, function (t) {
                    return t(_this.name + "._title", {
                        count: 100,
                        defaultValue: _this.title,
                    });
                }), icon: resolveOptionalThunk(_this.config.icon) || React.createElement(FolderOutlined, null) }, props)));
        };
        _this.structureItem = function () {
            var props = resolveOptionalThunk(_this.config.structure);
            return (React.createElement(Layout.StructureItem, __assign({ key: "/" + _this.structureName, name: React.createElement(Translation, null, function (t) {
                    return t(_this.name + "._title", { count: 100, defaultValue: _this.title });
                }), 
                // header={
                //   {
                //     // title: undefined //this.title,
                //     // action: (
                //     //   <Link to="new">
                //     //     <Button htmlType="button">+</Button>
                //     //   </Link>
                //     // )
                //   }
                // }
                content: function () { return _this.getListView(_this.getListConfig()); } }, props),
                React.createElement(Layout.StructureItem, { key: "/new", name: React.createElement(Translation, { ns: "webpanel-admin" }, function (t) { return t("new", { defaultValue: "New" }); }), 
                    // header={
                    //   {
                    //     // title: 'New'
                    //   }
                    // }
                    content: _this.getCreatePageLayout }),
                React.createElement(Layout.StructureItem, { key: "/:id", name: React.createElement(Translation, { ns: "webpanel-admin" }, function (t) { return t("detail"); }), 
                    // header={(route: RouteComponentProps<any>) => ({
                    //   // title: `Detail`,
                    //   // action: (
                    //   //   <Link to={`${route.match.params.id}/edit`}>
                    //   //     <Button htmlType="button">Edit</Button>
                    //   //   </Link>
                    //   // )
                    // })}
                    content: _this.getDetailPageLayout }),
                React.createElement(Layout.StructureItem, { key: "/:id/edit", name: React.createElement(Translation, { ns: "webpanel-admin" }, function (t) { return t("edit"); }), 
                    // header={
                    //   {
                    //     // title: 'Edit'
                    //   }
                    // }
                    content: _this.getEditPageLayout })));
        };
        _this.getDetailPageLayout = function (route, config) {
            var resourceID = route.match.params.id;
            if (_this.config.showDetailPage) {
                if (_this.detailLayout) {
                    return _this.detailLayout(__assign({ entity: _this, resourceID: resourceID }, __assign(__assign({}, _this.getDetailConfig(resourceID)), config)));
                }
                return (React.createElement(EntityDetail, __assign({ entity: _this, resourceID: resourceID }, _this.getDetailConfig(resourceID), config)));
            }
            return React.createElement(Redirect, { to: resourceID + "/edit" });
        };
        _this.handleFormOnSave = function (route) { return function (id) {
            var _a;
            if (route.history.length > 1 &&
                ((_a = route.location.state) === null || _a === void 0 ? void 0 : _a.goBackEnabled)) {
                route.history.goBack();
                return;
            }
            route.history.push(_this.getDetailLink(id));
        }; };
        _this.getEditPageLayout = function (route, props) {
            var onSave = _this.handleFormOnSave(route);
            var resourceID = route.match.params.id;
            if (_this.editLayout) {
                return _this.editLayout(__assign({ entity: _this, onSave: onSave, resourceID: resourceID }, props));
            }
            return (React.createElement(EntityEdit, __assign({ entity: _this, onSave: onSave, resourceID: resourceID }, _this.getEditConfig(resourceID), props)));
        };
        _this.getCreatePageLayout = function (route, config) {
            var onSave = _this.handleFormOnSave(route);
            if (_this.createLayout) {
                return _this.createLayout({ entity: _this, onSave: onSave });
            }
            return (React.createElement(EntityEdit, __assign({ entity: _this, onSave: onSave }, _this.getEditConfig(), config)));
        };
        _this.getEditButton = function (resourceID) {
            return (React.createElement(Link, { to: {
                    pathname: _this.getEditLink(resourceID),
                    state: { goBackEnabled: true },
                } },
                React.createElement(Button, { size: "small", htmlType: "button", icon: React.createElement(EditOutlined, null) })));
        };
        return _this;
    }
    EntityWithFields.prototype.clone = function () {
        var e = _super.prototype.clone.call(this);
        e.fields = this.fields.map(function (f) {
            return f.clone();
        });
        return e;
    };
    EntityWithFields.prototype.getField = function (name) {
        var filtered = this.fields.filter(function (f) { return f.name === name; });
        return filtered.length > 0 ? filtered[0] : null;
    };
    EntityWithFields.prototype.getFieldOrFail = function (name) {
        var filtered = this.fields.filter(function (f) { return f.name === name; });
        if (filtered.length === 0) {
            throw new Error("Cannot find field " + name + " on entity " + this.name);
        }
        return filtered[0];
    };
    EntityWithFields.prototype.getListFields = function () {
        var _this = this;
        var listConfig = this.getListConfig();
        if (listConfig) {
            var fields = resolveOptionalThunk(listConfig.fields);
            if (fields) {
                return fields
                    .map(function (f) {
                    var fieldName = typeof f === "string" ? f : f === null || f === void 0 ? void 0 : f.field;
                    if (!fieldName) {
                        return null;
                    }
                    return _this.getFieldOrFail(fieldName);
                })
                    .filter(function (x) { return x; });
            }
        }
        return this.fields.filter(function (f) { return f.readable; });
    };
    EntityWithFields.prototype.getEditFields = function (resourceID) {
        var _this = this;
        var editConfig = this.getEditConfig(resourceID);
        if (editConfig) {
            var fields = resolveOptionalThunk(editConfig.fields);
            if (fields) {
                return fields
                    .map(function (f) {
                    var fieldName = typeof f === "string" ? f : f === null || f === void 0 ? void 0 : f.field;
                    if (!fieldName) {
                        return null;
                    }
                    return _this.getFieldOrFail(fieldName);
                })
                    .filter(function (x) { return x; });
            }
        }
        return this.fields.filter(function (f) { return f.writeable; });
    };
    EntityWithFields.prototype.getDetailFields = function (resourceID) {
        var detailConfig = this.getDetailConfig(resourceID);
        if (detailConfig) {
            var _detailFields = resolveOptionalThunk(detailConfig.fields);
            if (_detailFields) {
                var detailFields_1 = _detailFields.map(function (f) {
                    return typeof f === "string" ? f : f === null || f === void 0 ? void 0 : f.field;
                });
                return this.fields.filter(function (f) { return f.readable && detailFields_1.indexOf(f.name) !== -1; });
            }
        }
        return this.fields.filter(function (f) { return f.readable; });
    };
    Object.defineProperty(EntityWithFields.prototype, "searchableFields", {
        get: function () {
            var search = resolveOptionalThunk(this.config.searchable);
            var fields = [];
            if (search && typeof search !== "boolean") {
                var searchFields_1 = resolveOptionalThunk(search.fields);
                if (searchFields_1) {
                    fields = this.fields.filter(function (f) { return f.readable && searchFields_1.indexOf(f.name) !== -1; });
                }
            }
            var listFields = this.getListFields();
            if (fields.length === 0 && listFields.length > 0) {
                return [listFields[0]];
            }
            return fields;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EntityWithFields.prototype, "render", {
        get: function () {
            var _this = this;
            if (this.config.render) {
                return this.config.render;
            }
            return function (value) {
                if (value === null || typeof value !== "object") {
                    return "–";
                }
                return _this.searchableFields.map(function (x) { return value[x.name]; }).join(", ");
            };
        },
        enumerable: false,
        configurable: true
    });
    EntityWithFields.prototype.setRender = function (fn) {
        this.config.render = function (value) {
            if (value === null) {
                return "–";
            }
            return fn(value);
        };
        return this;
    };
    // fields
    EntityWithFields.prototype.stringField = function (name, config) {
        var entity = this.clone();
        entity.fields.push(new EntityFieldString(name, config || {}, entity));
        return entity;
    };
    EntityWithFields.prototype.textField = function (name, config) {
        var entity = this.clone();
        entity.fields.push(new EntityFieldText(name, config || {}, entity));
        return entity;
    };
    EntityWithFields.prototype.numberField = function (name, config) {
        var entity = this.clone();
        entity.fields.push(new EntityFieldNumber(name, config || {}, entity));
        return entity;
    };
    EntityWithFields.prototype.percentageField = function (name, config) {
        var entity = this.clone();
        entity.fields.push(new EntityFieldPercentage(name, config || {}, entity));
        return entity;
    };
    EntityWithFields.prototype.passwordField = function (name, config) {
        var entity = this.clone();
        entity.fields.push(new EntityFieldPasssword(name, config || {}, entity));
        return entity;
    };
    EntityWithFields.prototype.dateField = function (name, config) {
        var entity = this.clone();
        entity.fields.push(new EntityFieldDate(name, config || {}, entity));
        return entity;
    };
    EntityWithFields.prototype.booleanField = function (name, config) {
        var entity = this.clone();
        entity.fields.push(new EntityFieldBoolean(name, config || {}, entity));
        return entity;
    };
    EntityWithFields.prototype.relationshipField = function (name, config) {
        var entity = this.clone();
        entity.fields.push(new EntityFieldRelationship(name, config, entity));
        return entity;
    };
    EntityWithFields.prototype.fileField = function (name, config) {
        var entity = this.clone();
        entity.fields.push(new EntityFieldFile(name, config || {}, entity));
        return entity;
    };
    EntityWithFields.prototype.colorField = function (name, config) {
        var entity = this.clone();
        entity.fields.push(new EntityFieldColor(name, config || {}, entity));
        return entity;
    };
    EntityWithFields.prototype.enumField = function (name, config) {
        var entity = this.clone();
        entity.fields.push(new EntityFieldEnum(name, config, entity));
        return entity;
    };
    EntityWithFields.prototype.computedField = function (name, config) {
        var entity = this.clone();
        entity.fields.push(new EntityFieldComputed(name, config || {}, entity));
        return entity;
    };
    EntityWithFields.prototype.customField = function (name, config) {
        var entity = this.clone();
        entity.fields.push(new EntityFieldCustom(name, config, this));
        return entity;
    };
    EntityWithFields.prototype.setFieldRender = function (name, fn) {
        var _a;
        (_a = this.getField(name)) === null || _a === void 0 ? void 0 : _a.setRender(fn);
        return this;
    };
    EntityWithFields.prototype.useResource = function (config) {
        var entityFields = (config === null || config === void 0 ? void 0 : config.id)
            ? this.getDetailFields(config === null || config === void 0 ? void 0 : config.id)
            : this.getEditFields();
        return useResource(__assign(__assign({ fields: __spreadArray([
                "id"
            ], entityFields
                .map(function (x) { return x && x.fetchField(); })
                .filter(function (x) { return x; })) }, config), { name: this.resourceName, id: config === null || config === void 0 ? void 0 : config.id, dataSource: this.dataSource }));
    };
    EntityWithFields.prototype.useResourceCollection = function (config) {
        var entityFields = this.getListFields();
        return useResourceCollection(__assign(__assign({ fields: __spreadArray([
                "id"
            ], entityFields
                .map(function (x) { return x && x.fetchField(); })
                .filter(function (x) { return x; })) }, config), { name: this.resourceName, dataSource: this.dataSource }));
    };
    EntityWithFields.prototype.getSelect = function (config) {
        return React.createElement(EntitySelect, __assign({ entity: this }, config));
    };
    return EntityWithFields;
}(EntityBase));
export { EntityWithFields };
//# sourceMappingURL=EntityWithFields.js.map