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
import * as React from 'react';
import * as inflection from 'inflection';
import { EntityEditLayout } from '../components/layouts/entity.edit';
import { EntityField } from './EntityField';
import { EntityFieldBoolean } from './fields/EntityFieldBoolean';
import { EntityFieldComputed } from './fields/EntityFieldComputed';
import { EntityFieldDate } from './fields/EntityFieldDate';
import { EntityFieldEnum } from './fields/EntityFieldEnum';
import { EntityFieldFile } from './fields/EntityFieldFile';
import { EntityFieldRelationship } from './fields/EntityFieldRelationship';
import { EntityList } from '../components/pages/list';
import { Layout } from 'webpanel-antd';
import { resolveOptionalThunk, resolveThunk } from 'ts-thunk';
import { componentPermission, entityPermission } from './permissions';
import { EntityDetailLayout } from '../components/layouts/entity.detail';
import { EntityFieldColor } from './fields/EntityFieldColor';
import { EntityFieldNumber } from './fields/EntityFieldNumber';
import { EntityFieldPasssword } from './fields/EntityFieldPassword';
import { EntityFieldText } from './fields/EntityFieldText';
import { LayoutBuilder } from '../layout-builder';
import { Redirect } from 'react-router';
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
            return (componentPermission(_this.structureName) && (React.createElement(Layout.MenuItem, { key: _this.structureName, title: _this.title, icon: resolveOptionalThunk(_this.config.icon) || 'folder' })));
        };
        this.structureItem = function () {
            return (React.createElement(Layout.StructureItem, { key: _this.getListLink(), name: _this.title, header: {
                // title: undefined //this.title,
                // action: (
                //   <Link to="new">
                //     <Button htmlType="button">+</Button>
                //   </Link>
                // )
                }, content: _this.getListView(resolveOptionalThunk(_this.config.list)) },
                React.createElement(Layout.StructureItem, { key: "/new", name: "New", header: {
                    // title: 'New'
                    }, content: _this.getCreatePageLayout }),
                React.createElement(Layout.StructureItem, { key: "/:id", name: "Detail", header: function (route) { return ({
                    // title: `Detail`,
                    // action: (
                    //   <Link to={`${route.match.params.id}/edit`}>
                    //     <Button htmlType="button">Edit</Button>
                    //   </Link>
                    // )
                    }); }, content: _this.getDetailPageLayout }),
                React.createElement(Layout.StructureItem, { key: "/:id/edit", name: "Edit", header: {
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
                case 'add':
                    route.history.push(_this.getCreateLink());
                    break;
                case 'edit':
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
            // if (this.editLayout) {
            //   return this.editLayout({ entity: this, onSave });
            // }
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
        this.getCreateView = function (config, handlers) {
            var _a = handlers || {
                onSave: undefined,
                onCancel: undefined
            }, onSave = _a.onSave, onCancel = _a.onCancel;
            // if (this.editLayout) {
            //   return this.editLayout({ entity: this, onSave, onCancel });
            // }
            return (React.createElement(EntityEditLayout, __assign({ entity: _this, onSave: onSave, onCancel: onCancel }, resolveOptionalThunk(_this.config.edit), config)));
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
    }
    Object.defineProperty(Entity.prototype, "structureName", {
        get: function () {
            return "" + inflection.transform(resolveThunk(this.config.name), [
                'tableize',
                'dasherize',
                'pluralize'
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
            if (typeof val !== 'undefined')
                return val;
            return entityPermission(this, 'list');
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
                if (value === null || typeof value !== 'object') {
                    return '–';
                }
                return _this.searchableFields.map(function (x) { return value[x.name]; }).join(', ');
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
            return this.config.searchable || false;
        },
        enumerable: true,
        configurable: true
    });
    Entity.prototype.getField = function (name) {
        var filtered = this.fields.filter(function (f) { return f.name === name; });
        return filtered.length > 0 ? filtered[0] : null;
    };
    Object.defineProperty(Entity.prototype, "listFields", {
        get: function () {
            return this.fields.filter(function (f) { return f.visible('list', 'read'); });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "editFields", {
        get: function () {
            return this.fields.filter(function (f) { return f.visible('edit', 'write'); });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "detailFields", {
        get: function () {
            return this.fields.filter(function (f) { return f.visible('detail', 'read'); });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "searchableFields", {
        get: function () {
            var fields = this.fields.filter(function (f) { return f.visible('search', 'read', true); });
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
    Entity.prototype.inputField = function (name, config) {
        this.fields.push(new EntityField(name, config || {}, this));
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
    // links
    Entity.prototype.getListLink = function () {
        return "/" + this.structureName;
    };
    Entity.prototype.getCreateLink = function () {
        return "/" + this.structureName + "/new";
    };
    Entity.prototype.getDetailLink = function (id) {
        return "/" + this.structureName + "/" + id;
    };
    Entity.prototype.getEditLink = function (id) {
        return "/" + this.structureName + "/" + id + "/edit";
    };
    return Entity;
}());
export { Entity };
//# sourceMappingURL=Entity.js.map