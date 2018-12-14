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
import * as inflection from 'inflection';
import * as React from 'react';
import { Redirect } from 'react-router';
import { Layout } from 'webpanel-antd';
// import { Button } from 'antd';
import { EntityList } from '../components/pages/list';
import { EntityField } from './EntityField';
import { EntityDetailLayout } from '../components/layouts/entity.detail';
import { EntityEditLayout } from '../components/layouts/entity.edit';
import { EntityFieldDate } from './fields/EntityFieldDate';
import { EntityFieldNumber } from './fields/EntityFieldNumber';
import { EntityFieldText } from './fields/EntityFieldText';
import { EntityFieldBoolean } from './fields/EntityFieldBoolean';
import { EntityFieldRelationship } from './fields/EntityFieldRelationship';
import { EntityFieldColor } from './fields/EntityFieldColor';
import { EntityFieldEnum } from './fields/EntityFieldEnum';
import { resolveThunk, resolveOptionalThunk } from 'ts-thunk';
import { LayoutBuilder } from '../layout-builder';
import { entityPermission, componentPermission } from './permissions';
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
            return (React.createElement(Layout.StructureItem, { key: "/" + _this.structureName, name: _this.title, header: {
                // title: undefined //this.title,
                // action: (
                //   <Link to="new">
                //     <Button htmlType="button">+</Button>
                //   </Link>
                // )
                }, content: _this.getListView() },
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
        this.getDetailPageLayout = function (route) {
            if (_this.config.showDetailPage) {
                if (_this.detailLayout) {
                    return _this.detailLayout({ entity: _this, route: route });
                }
                return React.createElement(EntityDetailLayout, { entity: _this, route: route });
            }
            return React.createElement(Redirect, { to: route.match.params.id + "/edit" });
        };
        this.getEditPageLayout = function (route) {
            if (_this.editLayout) {
                return _this.editLayout({ entity: _this, route: route });
            }
            return (React.createElement(EntityEditLayout, __assign({ entity: _this, route: route }, _this.config.edit)));
        };
        this.getCreatePageLayout = function (route) {
            if (_this.editLayout) {
                return _this.editLayout({ entity: _this, route: route });
            }
            return (React.createElement(EntityEditLayout, __assign({ entity: _this, route: route }, _this.config.edit)));
        };
        // views
        this.getListView = function () {
            return (React.createElement(EntityList, __assign({ entity: _this, dataSource: _this.dataSource }, _this.config.list)));
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
            return this.config.initialSorting;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "initialFilters", {
        get: function () {
            return this.config.initialFilters;
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
            return this.fields.filter(function (f) { return f.visible('list'); });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "editFields", {
        get: function () {
            return this.fields.filter(function (f) { return f.visible('edit'); });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "detailFields", {
        get: function () {
            return this.fields.filter(function (f) { return f.visible('detail'); });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "searchableFields", {
        get: function () {
            var fields = this.fields.filter(function (f) { return f.visible('search', true); });
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
            return this.config.layouts && this.config.layouts.detail;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "editLayout", {
        get: function () {
            return this.config.layouts && this.config.layouts.edit;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "createLayout", {
        get: function () {
            return this.config.layouts && this.config.layouts.create;
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
    // deprecated
    Entity.prototype.stringField = function (name, config) {
        return this.inputField(name, config);
    };
    Entity.prototype.textField = function (name, config) {
        this.fields.push(new EntityFieldText(name, config || {}, this));
        return this;
    };
    Entity.prototype.numberField = function (name, config) {
        this.fields.push(new EntityFieldNumber(name, config || {}, this));
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
    Entity.prototype.colorField = function (name, config) {
        this.fields.push(new EntityFieldColor(name, config || {}, this));
        return this;
    };
    Entity.prototype.enumField = function (name, config) {
        this.fields.push(new EntityFieldEnum(name, config, this));
        return this;
    };
    return Entity;
}());
export { Entity };
//# sourceMappingURL=Entity.js.map