import * as inflection from 'inflection';
import * as React from 'react';
import { Redirect } from 'react-router';
import { Layout, Link } from 'webpanel-antd';
import { Button } from 'antd';
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
var Entity = /** @class */ (function () {
    function Entity(config) {
        var _this = this;
        this.config = config;
        this.fields = [];
        this.menuItem = function () {
            return (React.createElement(Layout.MenuItem, { key: _this.structureName, title: _this.title, icon: _this.config.icon || 'folder' }));
        };
        this.structureItem = function () {
            return (React.createElement(Layout.StructureItem, { key: "/" + _this.structureName, name: _this.title, header: {
                    title: _this.title,
                    action: (React.createElement(Link, { to: "new" },
                        React.createElement(Button, { htmlType: "button" }, "+")))
                }, content: React.createElement(EntityList, { entity: _this, dataSource: _this.config.dataSource, detailButtonText: _this.config.showDetailPage ? 'Detail' : 'Edit' }) },
                React.createElement(Layout.StructureItem, { key: "/new", name: "New", header: {
                        title: 'New'
                    }, content: _this.getCreatePageLayout }),
                React.createElement(Layout.StructureItem, { key: "/:id", name: "Detail", header: function (route) { return ({
                        title: "Detail",
                        action: (React.createElement(Link, { to: route.match.params.id + "/edit" },
                            React.createElement(Button, { htmlType: "button" }, "Edit")))
                    }); }, content: _this.getDetailPageLayout }),
                React.createElement(Layout.StructureItem, { key: "/:id/edit", name: "Edit", header: {
                        title: 'Edit'
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
            return React.createElement(EntityEditLayout, { entity: _this, route: route });
        };
        this.getCreatePageLayout = function (route) {
            if (_this.editLayout) {
                return _this.editLayout({ entity: _this, route: route });
            }
            return (React.createElement(EntityEditLayout, { entity: _this, route: route, pushDetailOnCreate: true }));
        };
    }
    Object.defineProperty(Entity.prototype, "structureName", {
        get: function () {
            return "" + inflection.transform(this.config.name, [
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
            return inflection.titleize(this.config.title || this.config.name);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "name", {
        get: function () {
            return this.config.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "dataSource", {
        get: function () {
            return this.config.dataSource;
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
                return _this.searchableFields.map(function (x) { return value[x.name]; }).join(', ');
            };
        },
        enumerable: true,
        configurable: true
    });
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
            if (fields.length === 0) {
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
    // fields
    Entity.prototype.stringField = function (name, config) {
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
    return Entity;
}());
export { Entity };
//# sourceMappingURL=Entity.js.map