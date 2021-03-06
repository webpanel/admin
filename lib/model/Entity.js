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
import * as inflection from "inflection";
import { CreateEntityButton, } from "../components/buttons/EntityAddButton";
import { useResource, useResourceCollection, } from "webpanel-data";
import { DetailEntityButton, } from "../components/buttons/EntityDetailButton";
import { EditOutlined, FolderOutlined } from "@ant-design/icons";
import { EntityDetail, } from "../components/pages/detail";
import { EntityEdit, } from "../components/pages/edit";
import { EntityFieldBoolean, } from "./fields/EntityFieldBoolean";
import { EntityFieldComputed, } from "./fields/EntityFieldComputed";
import { EntityFieldCustom, } from "./fields/EntityFieldCustom";
import { EntityFieldDate, } from "./fields/EntityFieldDate";
import { EntityFieldEnum, } from "./fields/EntityFieldEnum";
import { EntityFieldFile, } from "./fields/EntityFieldFile";
import { EntityFieldNumber, } from "./fields/EntityFieldNumber";
import { EntityFieldPercentage, } from "./fields/EntityFieldPercentage";
import { EntityFieldRelationship, } from "./fields/EntityFieldRelationship";
import { EntityList } from "../components/pages/list";
import { EntitySelect } from "../components/entity-picker";
import { Layout, Link } from "webpanel-antd";
import { resolveOptionalThunk, resolveThunk } from "ts-thunk";
import { Button } from "antd";
import { EntityFieldColor } from "./fields/EntityFieldColor";
import { EntityFieldPasssword } from "./fields/EntityFieldPassword";
import { EntityFieldString } from "./fields/EntityFieldString";
import { EntityFieldText } from "./fields/EntityFieldText";
import { LayoutBuilder } from "../layout-builder";
import { Redirect } from "react-router";
import { Translation } from "react-i18next";
var Entity = /** @class */ (function () {
    function Entity(config) {
        var _this = this;
        this.config = config;
        this.fields = [];
        this.cardLayouts = {};
        this.setCardLayout = function (type, fn) {
            _this.cardLayouts[type] = fn;
        };
        this.menuItem = function () {
            var props = resolveOptionalThunk(_this.config.menu);
            return (React.createElement(Layout.MenuItem, __assign({ key: _this.structureName, title: React.createElement(Translation, null, function (t) {
                    return t(_this.name + "._title", {
                        count: 100,
                        defaultValue: _this.title,
                    });
                }), icon: resolveOptionalThunk(_this.config.icon) || React.createElement(FolderOutlined, null) }, props)));
        };
        this.structureItem = function () {
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
        this.getDetailPageLayout = function (route, config) {
            var resourceID = route.match.params.id;
            if (_this.config.showDetailPage) {
                if (_this.detailLayout) {
                    return _this.detailLayout(__assign({ entity: _this, resourceID: resourceID }, __assign(__assign({}, _this.getDetailConfig(resourceID)), config)));
                }
                return (React.createElement(EntityDetail, __assign({ entity: _this, resourceID: resourceID }, _this.getDetailConfig(resourceID), config)));
            }
            return React.createElement(Redirect, { to: resourceID + "/edit" });
        };
        this.handleFormOnSave = function (route) { return function (id) {
            var _a;
            if (route.history.length > 1 &&
                ((_a = route.location.state) === null || _a === void 0 ? void 0 : _a.goBackEnabled)) {
                route.history.goBack();
                return;
            }
            route.history.push(_this.getDetailLink(id));
        }; };
        this.getEditPageLayout = function (route, props) {
            var onSave = _this.handleFormOnSave(route);
            var resourceID = route.match.params.id;
            if (_this.editLayout) {
                return _this.editLayout(__assign({ entity: _this, onSave: onSave, resourceID: resourceID }, props));
            }
            return (React.createElement(EntityEdit, __assign({ entity: _this, onSave: onSave, resourceID: resourceID }, _this.getEditConfig(resourceID), props)));
        };
        this.getCreatePageLayout = function (route, config) {
            var onSave = _this.handleFormOnSave(route);
            if (_this.createLayout) {
                return _this.createLayout({ entity: _this, onSave: onSave });
            }
            return (React.createElement(EntityEdit, __assign({ entity: _this, onSave: onSave }, _this.getEditConfig(), config)));
        };
        // views
        this.getListView = function (config) {
            return React.createElement(EntityList, __assign({ entity: _this }, config));
        };
        this.getDetailView = function (resourceID, config) {
            return (React.createElement(EntityDetail, __assign({ entity: _this, resourceID: resourceID }, _this.getDetailConfig(resourceID), config)));
        };
        this.getDetailButton = function (id, props) {
            return React.createElement(DetailEntityButton, __assign({ entity: _this, entityId: id }, props));
        };
        this.getCreateView = function (props) {
            if (_this.createLayout) {
                return _this.createLayout(__assign({ entity: _this }, props));
            }
            return React.createElement(EntityEdit, __assign({ entity: _this }, _this.getEditConfig(), props));
        };
        this.getCreateButton = function (props) {
            return React.createElement(CreateEntityButton, __assign({ entity: _this }, props));
        };
        this.getEditView = function (props) {
            // const { onSave } = handlers || {
            //   onSave: undefined,
            // };
            if (_this.editLayout) {
                return _this.editLayout(__assign({ entity: _this }, props));
            }
            return (React.createElement(EntityEdit, __assign({ entity: _this }, _this.getEditConfig(props.resourceID), props)));
        };
        this.getEditButton = function (resourceID) {
            return (React.createElement(Link, { to: {
                    pathname: _this.getEditLink(resourceID),
                    state: { goBackEnabled: true },
                } },
                React.createElement(Button, { size: "small", htmlType: "button", icon: React.createElement(EditOutlined, null) })));
        };
        this.getSearchResourceCollectionConfig = function () {
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
    }
    Entity.prototype.updateConfig = function (config) {
        var entity = this.clone();
        entity.config = __assign(__assign({}, entity.config), config);
        return entity;
    };
    Entity.prototype.clone = function () {
        var e = new Entity(this.config);
        e.fields = this.fields.map(function (f) {
            return f.clone();
        });
        return e;
    };
    Object.defineProperty(Entity.prototype, "structureName", {
        get: function () {
            return "" + inflection.transform(resolveThunk(this.config.name), [
                "tableize",
                "dasherize",
                "pluralize",
            ]);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "title", {
        get: function () {
            return (resolveOptionalThunk(this.config.title) ||
                inflection.titleize(resolveThunk(this.config.name)));
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "enabled", {
        get: function () {
            var val = resolveOptionalThunk(this.config.enabled);
            if (typeof val !== "undefined")
                return val;
            return true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "creatable", {
        get: function () {
            var val = resolveOptionalThunk(this.config.creatable);
            if (typeof val !== "undefined")
                return val;
            return true;
        },
        enumerable: false,
        configurable: true
    });
    Entity.prototype.updateable = function (values) {
        var val = resolveOptionalThunk(this.config.updateable, values);
        if (typeof val !== "undefined")
            return val;
        return true;
    };
    Entity.prototype.deletable = function (values) {
        var val = resolveOptionalThunk(this.config.deletable, values);
        if (typeof val !== "undefined")
            return val;
        return true;
    };
    Object.defineProperty(Entity.prototype, "showDetailPage", {
        get: function () {
            return resolveOptionalThunk(this.config.showDetailPage) || false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "name", {
        get: function () {
            return resolveThunk(this.config.name);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "resourceName", {
        get: function () {
            return resolveOptionalThunk(this.config.resourceName) || this.name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "dataSource", {
        get: function () {
            return resolveThunk(this.config.dataSource);
        },
        enumerable: false,
        configurable: true
    });
    Entity.prototype.getListConfig = function () {
        return resolveOptionalThunk(this.config.list);
    };
    Entity.prototype.getEditConfig = function (resourceID) {
        return resolveOptionalThunk(this.config.edit, { entity: this, resourceID: resourceID });
    };
    Entity.prototype.getDetailConfig = function (resourceID) {
        return resolveOptionalThunk(this.config.detail, {
            entity: this,
            resourceID: resourceID,
        });
    };
    Object.defineProperty(Entity.prototype, "render", {
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
    Entity.prototype.setRender = function (fn) {
        this.config.render = function (value) {
            if (value === null) {
                return "–";
            }
            return fn(value);
        };
        return this;
    };
    Object.defineProperty(Entity.prototype, "initialSorting", {
        get: function () {
            var list = resolveOptionalThunk(this.config.list);
            return (list && list.initialSorting) || this.config.initialSorting;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "initialFilters", {
        get: function () {
            var list = resolveOptionalThunk(this.config.list);
            return (list && list.initialFilters) || this.config.initialFilters;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "searchable", {
        get: function () {
            return typeof this.config.searchable !== "undefined";
        },
        enumerable: false,
        configurable: true
    });
    Entity.prototype.getField = function (name) {
        var filtered = this.fields.filter(function (f) { return f.name === name; });
        return filtered.length > 0 ? filtered[0] : null;
    };
    Entity.prototype.getFieldOrFail = function (name) {
        var filtered = this.fields.filter(function (f) { return f.name === name; });
        if (filtered.length === 0) {
            throw new Error("Cannot find field " + name + " on entity " + this.name);
        }
        return filtered[0];
    };
    Entity.prototype.getListFields = function () {
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
    Entity.prototype.getEditFields = function (resourceID) {
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
    Entity.prototype.getDetailFields = function (resourceID) {
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
    Object.defineProperty(Entity.prototype, "searchableFields", {
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
    Object.defineProperty(Entity.prototype, "detailLayout", {
        get: function () {
            var layouts = resolveOptionalThunk(this.config.layouts);
            return layouts === null || layouts === void 0 ? void 0 : layouts.detail;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "editLayout", {
        get: function () {
            var layouts = resolveOptionalThunk(this.config.layouts);
            return layouts === null || layouts === void 0 ? void 0 : layouts.edit;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "createLayout", {
        get: function () {
            var layouts = resolveOptionalThunk(this.config.layouts);
            return layouts === null || layouts === void 0 ? void 0 : layouts.create;
        },
        enumerable: false,
        configurable: true
    });
    Entity.prototype.setDetailLayout = function (fn) {
        var layouts = resolveOptionalThunk(this.config.layouts) || {};
        this.config.layouts = layouts;
        layouts.detail = fn;
    };
    Entity.prototype.setEditLayout = function (fn) {
        var layouts = resolveOptionalThunk(this.config.layouts) || {};
        layouts.edit = fn;
        this.config.layouts = layouts;
    };
    Entity.prototype.setCreateLayout = function (fn) {
        var layouts = resolveOptionalThunk(this.config.layouts) || {};
        layouts.create = fn;
        this.config.layouts = layouts;
    };
    Entity.prototype.getCardLayout = function (type, config) {
        var builder = new LayoutBuilder(config);
        var fn = this.cardLayouts[type];
        if (fn) {
            return fn(builder);
        }
        if (type == "detail" && config.id) {
            var detail = this.getDetailConfig(config.id);
            return builder.getDefaultDetailContent({
                descriptions: detail && detail.desriptions,
                fields: config.fields || (detail && detail.fields),
            });
        }
        else if (type == "edit") {
            var edit = this.getEditConfig(config.id);
            return builder.getDefaultEditContent({
                fields: config.fields || (edit && edit.fields),
            });
        }
        return null;
    };
    Entity.prototype.getSelect = function (config) {
        return React.createElement(EntitySelect, __assign({ entity: this }, config));
    };
    // fields
    Entity.prototype.stringField = function (name, config) {
        var entity = this.clone();
        entity.fields.push(new EntityFieldString(name, config || {}, entity));
        return entity;
    };
    Entity.prototype.textField = function (name, config) {
        var entity = this.clone();
        entity.fields.push(new EntityFieldText(name, config || {}, entity));
        return entity;
    };
    Entity.prototype.numberField = function (name, config) {
        var entity = this.clone();
        entity.fields.push(new EntityFieldNumber(name, config || {}, entity));
        return entity;
    };
    Entity.prototype.percentageField = function (name, config) {
        var entity = this.clone();
        entity.fields.push(new EntityFieldPercentage(name, config || {}, entity));
        return entity;
    };
    Entity.prototype.passwordField = function (name, config) {
        var entity = this.clone();
        entity.fields.push(new EntityFieldPasssword(name, config || {}, entity));
        return entity;
    };
    Entity.prototype.dateField = function (name, config) {
        var entity = this.clone();
        entity.fields.push(new EntityFieldDate(name, config || {}, entity));
        return entity;
    };
    Entity.prototype.booleanField = function (name, config) {
        var entity = this.clone();
        entity.fields.push(new EntityFieldBoolean(name, config || {}, entity));
        return entity;
    };
    Entity.prototype.relationshipField = function (name, config) {
        var entity = this.clone();
        entity.fields.push(new EntityFieldRelationship(name, config, entity));
        return entity;
    };
    Entity.prototype.fileField = function (name, config) {
        var entity = this.clone();
        entity.fields.push(new EntityFieldFile(name, config || {}, entity));
        return entity;
    };
    Entity.prototype.colorField = function (name, config) {
        var entity = this.clone();
        entity.fields.push(new EntityFieldColor(name, config || {}, entity));
        return entity;
    };
    Entity.prototype.enumField = function (name, config) {
        var entity = this.clone();
        entity.fields.push(new EntityFieldEnum(name, config, entity));
        return entity;
    };
    Entity.prototype.computedField = function (name, config) {
        var entity = this.clone();
        entity.fields.push(new EntityFieldComputed(name, config || {}, this));
        return entity;
    };
    Entity.prototype.customField = function (name, config) {
        var entity = this.clone();
        entity.fields.push(new EntityFieldCustom(name, config, this));
        return entity;
    };
    Entity.prototype.setFieldRender = function (name, fn) {
        var _a;
        (_a = this.getField(name)) === null || _a === void 0 ? void 0 : _a.setRender(fn);
        return this;
    };
    // links
    Entity.prototype.getListLink = function () {
        var prefix = resolveOptionalThunk(this.config.pathPrefix);
        var props = resolveOptionalThunk(this.config.structure);
        return (props === null || props === void 0 ? void 0 : props.key) || (prefix || "") + "/" + this.structureName;
    };
    Entity.prototype.getCreateLink = function () {
        return this.getListLink() + "/new";
    };
    Entity.prototype.getDetailLink = function (id) {
        return this.getListLink() + "/" + id;
    };
    Entity.prototype.getEditLink = function (id) {
        return this.getListLink() + "/" + id + "/edit";
    };
    // resource hooks
    Entity.prototype.useResource = function (config) {
        var entityFields = (config === null || config === void 0 ? void 0 : config.id)
            ? this.getDetailFields(config === null || config === void 0 ? void 0 : config.id)
            : this.getEditFields();
        return useResource(__assign(__assign({ fields: __spreadArray([
                "id"
            ], entityFields
                .map(function (x) { return x && x.fetchField(); })
                .filter(function (x) { return x; })) }, config), { name: this.resourceName, id: config === null || config === void 0 ? void 0 : config.id, dataSource: this.dataSource }));
    };
    Entity.prototype.useResourceCollection = function (config) {
        var entityFields = this.getListFields();
        return useResourceCollection(__assign(__assign({ fields: __spreadArray([
                "id"
            ], entityFields
                .map(function (x) { return x && x.fetchField(); })
                .filter(function (x) { return x; })) }, config), { name: this.resourceName, dataSource: this.dataSource }));
    };
    return Entity;
}());
export { Entity };
//# sourceMappingURL=Entity.js.map