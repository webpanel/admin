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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import * as React from "react";
import * as inflection from "inflection";
import { CreateEntityButton } from "../components/buttons/EntityAddButton";
import { ResourceCollectionLayer } from "webpanel-data";
import { DetailEntityButton } from "../components/buttons/EntityDetailButton";
import { EntityEditLayout } from "../components/layouts/entity.edit";
import { EntityFieldBoolean } from "./fields/EntityFieldBoolean";
import { EntityFieldComputed } from "./fields/EntityFieldComputed";
import { EntityFieldCustom } from "./fields/EntityFieldCustom";
import { EntityFieldDate } from "./fields/EntityFieldDate";
import { EntityFieldEnum } from "./fields/EntityFieldEnum";
import { EntityFieldFile } from "./fields/EntityFieldFile";
import { EntityFieldRelationship } from "./fields/EntityFieldRelationship";
import { EntityList } from "../components/pages/list";
import { Layout, Link } from "webpanel-antd";
import { resolveOptionalThunk, resolveThunk } from "ts-thunk";
import { Button } from "antd";
import { EntityDetailLayout } from "../components/layouts/entity.detail";
import { EntityFieldColor } from "./fields/EntityFieldColor";
import { EntityFieldNumber } from "./fields/EntityFieldNumber";
import { EntityFieldPasssword } from "./fields/EntityFieldPassword";
import { EntityFieldString } from "./fields/EntityFieldString";
import { EntityFieldText } from "./fields/EntityFieldText";
import { LayoutBuilder } from "../layout-builder";
import { Redirect } from "react-router";
import { Translation } from "react-i18next";
import { componentPermission } from "./permissions";
var Entity = /** @class */ (function () {
    function Entity(config) {
        var _this = this;
        this.config = config;
        this.fields = [];
        this.layouts = {};
        this.setLayout = function (type, fn) {
            _this.layouts[type] = fn;
        };
        this.menuItem = function () {
            return (componentPermission(_this.structureName) && (React.createElement(Layout.MenuItem, { key: _this.structureName, title: React.createElement(Translation, null, function (t) {
                    return t(_this.name + "._title", {
                        count: 100,
                        defaultValue: _this.title
                    });
                }), icon: resolveOptionalThunk(_this.config.icon) || "folder" })));
        };
        this.structureItem = function () {
            return (React.createElement(Layout.StructureItem, { key: "/" + _this.structureName, name: React.createElement(Translation, null, function (t) {
                    return t(_this.name + "._title", { count: 100, defaultValue: _this.title });
                }), header: {
                // title: undefined //this.title,
                // action: (
                //   <Link to="new">
                //     <Button htmlType="button">+</Button>
                //   </Link>
                // )
                }, content: function () { return _this.getListView(resolveOptionalThunk(_this.config.list)); } },
                React.createElement(Layout.StructureItem, { key: "/new", name: React.createElement(Translation, null, function (t) { return t("common.new", { defaultValue: "New" }); }), header: {
                    // title: 'New'
                    }, content: _this.getCreatePageLayout }),
                React.createElement(Layout.StructureItem, { key: "/:id", name: React.createElement(Translation, null, function (t) { return t("common.detail", { defaultValue: "Detail" }); }), header: function (route) { return ({
                    // title: `Detail`,
                    // action: (
                    //   <Link to={`${route.match.params.id}/edit`}>
                    //     <Button htmlType="button">Edit</Button>
                    //   </Link>
                    // )
                    }); }, content: _this.getDetailPageLayout }),
                React.createElement(Layout.StructureItem, { key: "/:id/edit", name: React.createElement(Translation, null, function (t) { return t("common.edit", { defaultValue: "Edit" }); }), header: {
                    // title: 'Edit'
                    }, content: _this.getEditPageLayout })));
        };
        this.getDetailPageLayout = function (route, config) {
            var resourceID = route.match.params.id;
            if (_this.config.showDetailPage) {
                if (_this.detailLayout) {
                    return _this.detailLayout(__assign({ entity: _this, resourceID: resourceID }, (config || _this.config.detail)));
                }
                return (React.createElement(EntityDetailLayout, __assign({ entity: _this, resourceID: resourceID }, resolveOptionalThunk(_this.config.detail), config)));
            }
            return React.createElement(Redirect, { to: resourceID + "/edit" });
        };
        this.handleFormOnSave = function (route) { return function (id, option) {
            switch (option) {
                case "add":
                    route.history.push(_this.getCreateLink());
                    break;
                case "edit":
                    route.history.push(_this.getEditLink(id));
                    break;
                default:
                    route.history.push(_this.getListLink());
                    break;
            }
        }; };
        this.getEditPageLayout = function (route, config) {
            var onSave = _this.handleFormOnSave(route);
            var resourceID = route.match.params.id;
            if (_this.editLayout) {
                return _this.editLayout(__assign({ entity: _this, onSave: onSave }, config), resourceID);
            }
            return (React.createElement(EntityEditLayout, __assign({ entity: _this, onSave: onSave, resourceID: resourceID }, resolveOptionalThunk(_this.config.edit), config)));
        };
        this.getCreatePageLayout = function (route, config) {
            var onSave = _this.handleFormOnSave(route);
            if (_this.createLayout) {
                return _this.createLayout({ entity: _this, onSave: onSave });
            }
            return (React.createElement(EntityEditLayout, __assign({ entity: _this, onSave: onSave }, resolveOptionalThunk(_this.config.edit), config)));
        };
        // views
        this.getListView = function (config) {
            // const listConfig = resolveOptionalThunk(this.config.list);
            return (React.createElement(EntityList, __assign({ entity: _this, dataSource: _this.dataSource }, config)));
        };
        this.getDetailView = function (resourceID, config) {
            return (React.createElement(EntityDetailLayout, __assign({ entity: _this, resourceID: resourceID }, _this.config.detail, config)));
        };
        this.getDetailButton = function (id, props) {
            return React.createElement(DetailEntityButton, __assign({ entity: _this, entityId: id }, props));
        };
        this.getCreateView = function (config, handlers) {
            var _a = handlers || {
                onSave: undefined,
                onCancel: undefined
            }, onSave = _a.onSave, onCancel = _a.onCancel;
            if (_this.createLayout) {
                return _this.createLayout({ entity: _this, onSave: onSave, onCancel: onCancel });
            }
            return (React.createElement(EntityEditLayout, __assign({ entity: _this, onSave: onSave, onCancel: onCancel }, resolveOptionalThunk(_this.config.edit), config)));
        };
        this.getCreateButton = function (props) {
            return React.createElement(CreateEntityButton, __assign({ entity: _this }, props));
        };
        this.getEditView = function (resourceID, config, handlers) {
            var _a = handlers || {
                onSave: undefined,
                onCancel: undefined
            }, onSave = _a.onSave, onCancel = _a.onCancel;
            if (_this.editLayout) {
                return _this.editLayout({ entity: _this, onSave: onSave, onCancel: onCancel }, resourceID);
            }
            return (React.createElement(EntityEditLayout, __assign({ entity: _this, resourceID: resourceID, onSave: onSave, onCancel: onCancel }, resolveOptionalThunk(_this.config.edit), config)));
        };
        this.getEditButton = function (resourceID) {
            return (React.createElement(Link, { to: _this.getEditLink(resourceID) },
                React.createElement(Button, { size: "small", htmlType: "button", icon: "edit" })));
        };
        this.getSearchResourceCollectionLayer = function (render, props) {
            return (React.createElement(ResourceCollectionLayer, __assign({ name: _this.name, fields: __spreadArrays([
                    "id"
                ], _this.searchableFields.map(function (x) { return x.fetchField() || x.name; })), initialSorting: _this.initialSorting, initialFilters: _this.initialFilters, dataSource: _this.dataSource }, props, { render: render })));
        };
    }
    Object.defineProperty(Entity.prototype, "structureName", {
        get: function () {
            return "" + inflection.transform(resolveThunk(this.config.name), [
                "tableize",
                "dasherize",
                "pluralize"
            ]);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "title", {
        get: function () {
            return (resolveOptionalThunk(this.config.title) ||
                inflection.titleize(resolveThunk(this.config.name)));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "enabled", {
        get: function () {
            var val = resolveOptionalThunk(this.config.enabled);
            if (typeof val !== "undefined")
                return val;
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "creatable", {
        get: function () {
            var val = resolveOptionalThunk(this.config.creatable);
            if (typeof val !== "undefined")
                return val;
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "updateable", {
        get: function () {
            var val = resolveOptionalThunk(this.config.updateable);
            if (typeof val !== "undefined")
                return val;
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "deletable", {
        get: function () {
            var val = resolveOptionalThunk(this.config.deletable);
            if (typeof val !== "undefined")
                return val;
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "showDetailPage", {
        get: function () {
            return resolveOptionalThunk(this.config.showDetailPage) || false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "name", {
        get: function () {
            return resolveThunk(this.config.name);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "dataSource", {
        get: function () {
            return resolveThunk(this.config.dataSource);
        },
        enumerable: true,
        configurable: true
    });
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
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "initialSorting", {
        get: function () {
            var list = resolveOptionalThunk(this.config.list);
            return (list && list.initialSorting) || this.config.initialSorting;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "initialFilters", {
        get: function () {
            var list = resolveOptionalThunk(this.config.list);
            return (list && list.initialFilters) || this.config.initialFilters;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "searchable", {
        get: function () {
            return typeof this.config.searchable !== "undefined";
        },
        enumerable: true,
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
    Object.defineProperty(Entity.prototype, "listFields", {
        get: function () {
            var listConfig = resolveOptionalThunk(this.config.list);
            if (listConfig) {
                var listFields = resolveOptionalThunk(listConfig.fields);
                if (listFields) {
                    var _listFields_1 = listFields.map(function (f) {
                        return typeof f === "string" ? f : f.field;
                    });
                    return this.fields.filter(function (f) { return f.enabled && _listFields_1.indexOf(f.name) !== -1; });
                }
            }
            return this.fields.filter(function (f) { return f.readable; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "editFields", {
        get: function () {
            var editConfig = resolveOptionalThunk(this.config.edit);
            if (editConfig) {
                var listFields_1 = resolveOptionalThunk(editConfig.fields);
                if (listFields_1) {
                    return this.fields.filter(function (f) { return f.writeable && listFields_1.indexOf(f.name) !== -1; });
                }
            }
            return this.fields.filter(function (f) { return f.writeable; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "detailFields", {
        get: function () {
            var detailConfig = resolveOptionalThunk(this.config.detail);
            if (detailConfig) {
                var listFields_2 = resolveOptionalThunk(detailConfig.fields);
                if (listFields_2) {
                    return this.fields.filter(function (f) { return f.readable && listFields_2.indexOf(f.name) !== -1; });
                }
            }
            return this.fields.filter(function (f) { return f.readable; });
        },
        enumerable: true,
        configurable: true
    });
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
            if (fields.length === 0 && this.listFields.length > 0) {
                return [this.listFields[0]];
            }
            return fields;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "detailLayout", {
        get: function () {
            var layouts = resolveOptionalThunk(this.config.layouts);
            if (!layouts)
                return undefined;
            return layouts.detail;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "editLayout", {
        get: function () {
            var layouts = resolveOptionalThunk(this.config.layouts);
            return layouts && layouts.edit;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "createLayout", {
        get: function () {
            var layouts = resolveOptionalThunk(this.config.layouts);
            return layouts && layouts.create;
        },
        enumerable: true,
        configurable: true
    });
    Entity.prototype.getLayout = function (type, config) {
        var builder = new LayoutBuilder(config);
        var fn = this.layouts[type];
        if (fn) {
            return fn(builder);
        }
        return null;
    };
    // fields
    // deprecated, use stringField
    Entity.prototype.inputField = function (name, config) {
        this.fields.push(new EntityFieldString(name, config || {}, this));
        return this;
    };
    Entity.prototype.stringField = function (name, config) {
        this.fields.push(new EntityFieldString(name, config || {}, this));
        return this;
    };
    Entity.prototype.textField = function (name, config) {
        this.fields.push(new EntityFieldText(name, config || {}, this));
        return this;
    };
    Entity.prototype.numberField = function (name, config) {
        this.fields.push(new EntityFieldNumber(name, config || {}, this));
        return this;
    };
    Entity.prototype.passwordField = function (name, config) {
        this.fields.push(new EntityFieldPasssword(name, config || {}, this));
        return this;
    };
    Entity.prototype.dateField = function (name, config) {
        this.fields.push(new EntityFieldDate(name, config || {}, this));
        return this;
    };
    Entity.prototype.booleanField = function (name, config) {
        this.fields.push(new EntityFieldBoolean(name, config || {}, this));
        return this;
    };
    Entity.prototype.relationshipField = function (name, config) {
        this.fields.push(new EntityFieldRelationship(name, config, this));
        return this;
    };
    Entity.prototype.fileField = function (name, config) {
        this.fields.push(new EntityFieldFile(name, config || {}, this));
        return this;
    };
    Entity.prototype.colorField = function (name, config) {
        this.fields.push(new EntityFieldColor(name, config || {}, this));
        return this;
    };
    Entity.prototype.enumField = function (name, config) {
        this.fields.push(new EntityFieldEnum(name, config, this));
        return this;
    };
    Entity.prototype.computedField = function (name, config) {
        this.fields.push(new EntityFieldComputed(name, config || {}, this));
        return this;
    };
    Entity.prototype.customField = function (name, config) {
        this.fields.push(new EntityFieldCustom(name, config, this));
        return this;
    };
    // links
    Entity.prototype.getListLink = function () {
        var prefix = resolveOptionalThunk(this.config.pathPrefix);
        return (prefix || "") + "/" + this.structureName;
    };
    Entity.prototype.getCreateLink = function () {
        var prefix = resolveOptionalThunk(this.config.pathPrefix);
        return (prefix || "") + "/" + this.structureName + "/new";
    };
    Entity.prototype.getDetailLink = function (id) {
        var prefix = resolveOptionalThunk(this.config.pathPrefix);
        return (prefix || "") + "/" + this.structureName + "/" + id;
    };
    Entity.prototype.getEditLink = function (id) {
        var prefix = resolveOptionalThunk(this.config.pathPrefix);
        return (prefix || "") + "/" + this.structureName + "/" + id + "/edit";
    };
    return Entity;
}());
export { Entity };
//# sourceMappingURL=Entity.js.map