"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var antd_1 = require("antd");
// import { startCase } from 'lodash';
var inflection = require("inflection");
var React = require("react");
var webpanel_antd_1 = require("webpanel-antd");
var webpanel_data_1 = require("webpanel-data");
var EntityDetail = /** @class */ (function (_super) {
    __extends(EntityDetail, _super);
    function EntityDetail() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EntityDetail.prototype.render = function () {
        var _a = this.props, entity = _a.entity, route = _a.route, dataSource = _a.dataSource;
        return (React.createElement(webpanel_data_1.ResourceLayer, { name: entity.name, id: route.match.params.id, fields: entity.detailFields.map(function (f) { return f.name; }), dataSource: dataSource, onCreate: function (id) {
                route.history.push(id);
            }, render: function (resource) { return (React.createElement(antd_1.Card, null,
                React.createElement(webpanel_antd_1.ResourceForm, { formResource: resource, render: function (formContext) { return (React.createElement(React.Fragment, null,
                        entity.detailFields.map(function (field, i) { return (React.createElement(webpanel_antd_1.FormField, { key: i, label: inflection.transform(field.title || field.name, [
                                'underscore',
                                'titleize'
                            ]), name: field.name, formContext: formContext },
                            React.createElement(webpanel_antd_1.Input, null))); }),
                        React.createElement(webpanel_antd_1.ResourceFormButtons, { formContext: formContext }))); } }))); } }));
    };
    return EntityDetail;
}(React.Component));
exports.EntityDetail = EntityDetail;
//# sourceMappingURL=detail.js.map