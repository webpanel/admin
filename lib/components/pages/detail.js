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
import { Button, Card, Col, Row } from 'antd';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { ResourceLayer } from 'webpanel-data';
var EntityDetail = /** @class */ (function (_super) {
    __extends(EntityDetail, _super);
    function EntityDetail() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EntityDetail.prototype.render = function () {
        var entity = this.props.entity;
        var id = this.props.route.match.params.id;
        return (React.createElement(ResourceLayer, { name: entity.name, id: id, dataSource: entity.dataSource, fields: ['id'].concat(entity.listFields.map(function (x) { return x.fetchField; })), render: function (resource) { return (React.createElement(Card, { title: entity.title, extra: React.createElement(Link, { to: id + "/edit" },
                    React.createElement(Button, { htmlType: "button" }, "Edit")) }, entity.listFields.map(function (field, i) { return (React.createElement(Row, { key: field.name },
                React.createElement(Col, { span: 12 }, "" + field.title),
                React.createElement(Col, { span: 12 }, resource.data && field.render(resource.data)))); }))); } }));
    };
    return EntityDetail;
}(React.Component));
export { EntityDetail };
//# sourceMappingURL=detail.js.map