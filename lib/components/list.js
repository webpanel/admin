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
// import * as moment from 'moment';
var inflection = require("inflection");
var React = require("react");
var react_router_dom_1 = require("react-router-dom");
var webpanel_antd_1 = require("webpanel-antd");
var webpanel_data_1 = require("webpanel-data");
var EntityList = /** @class */ (function (_super) {
    __extends(EntityList, _super);
    function EntityList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EntityList.prototype.render = function () {
        var entity = this.props.entity;
        return (React.createElement(webpanel_data_1.ResourceCollectionLayer, { name: entity.name, dataSource: this.props.dataSource, fields: ['id'].concat(entity.listFields.map(function (x) { return x.name; })), initialSorting: [{ columnKey: 'id', order: webpanel_data_1.SortInfoOrder.ascend }], render: function (resource) { return (React.createElement(antd_1.Card, { title: entity.title, extra: React.createElement(react_router_dom_1.Link, { to: "new" },
                    React.createElement(antd_1.Button, { htmlType: "button" }, "+")) },
                React.createElement(webpanel_antd_1.ResourceTable, { resourceCollection: resource, columns: entity.listFields.map(function (field, i) { return ({
                        key: i,
                        dataIndex: field.name,
                        title: inflection.transform(field.title || field.name, [
                            'underscore',
                            'titleize'
                        ])
                    }); }), detailButtonText: "Edit" }))); } }));
    };
    return EntityList;
}(React.Component));
exports.EntityList = EntityList;
//# sourceMappingURL=list.js.map