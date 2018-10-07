"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { ColumnProps } from 'antd/lib/table';
var inflection = require("inflection");
// import { kebabCase } from 'lodash';
var React = require("react");
var webpanel_antd_1 = require("webpanel-antd");
var detail_1 = require("../components/detail");
var list_1 = require("../components/list");
var Entity = /** @class */ (function () {
    function Entity(config) {
        var _this = this;
        this.config = config;
        this.menuItem = function () {
            return React.createElement(webpanel_antd_1.Layout.MenuItem, { key: _this.structureName, title: _this.title });
        };
        this.structureItem = function () {
            return (React.createElement(webpanel_antd_1.Layout.StructureItem, { key: "/" + _this.structureName, name: _this.title, content: React.createElement(list_1.EntityList, { entity: _this, dataSource: _this.config.dataSource }) },
                React.createElement(webpanel_antd_1.Layout.StructureItem, { key: "/new", name: "New", content: function (route) { return (React.createElement(detail_1.EntityDetail, { entity: _this, dataSource: _this.config.dataSource, route: route })); } }),
                React.createElement(webpanel_antd_1.Layout.StructureItem, { key: "/:id", name: "Detail", content: function (route) { return (React.createElement(detail_1.EntityDetail, { entity: _this, dataSource: _this.config.dataSource, route: route })); } })));
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
exports.Entity = Entity;
//# sourceMappingURL=Entity.js.map