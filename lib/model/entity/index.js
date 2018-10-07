// import { ColumnProps } from 'antd/lib/table';
import * as inflection from 'inflection';
// import { kebabCase } from 'lodash';
import * as React from 'react';
import { Layout } from 'webpanel-antd';
import { EntityDetail } from './detail';
import { EntityList } from './list';
var Entity = /** @class */ (function () {
    function Entity(config) {
        var _this = this;
        this.config = config;
        this.menuItem = function () {
            return React.createElement(Layout.MenuItem, { key: _this.structureName, title: _this.title });
        };
        this.structureItem = function () {
            return (React.createElement(Layout.StructureItem, { key: "/" + _this.structureName, name: _this.title, content: React.createElement(EntityList, { entity: _this, dataSource: _this.config.dataSource }) },
                React.createElement(Layout.StructureItem, { key: "/new", name: "New", content: function (route) { return (React.createElement(EntityDetail, { entity: _this, dataSource: _this.config.dataSource, route: route })); } }),
                React.createElement(Layout.StructureItem, { key: "/:id", name: "Detail", content: function (route) { return (React.createElement(EntityDetail, { entity: _this, dataSource: _this.config.dataSource, route: route })); } })));
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
    Object.defineProperty(Entity.prototype, "listFields", {
        get: function () {
            return this.config.fields.filter(function (f) { return !f.visibility || f.visibility.list; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "detailFields", {
        get: function () {
            return this.config.fields.filter(function (f) { return !f.visibility || f.visibility.detail; });
        },
        enumerable: true,
        configurable: true
    });
    return Entity;
}());
export { Entity };
//# sourceMappingURL=index.js.map