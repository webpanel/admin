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
import { Button, Card, Form } from 'antd';
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
        var formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 }
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 }
            }
        };
        return (React.createElement(ResourceLayer, { name: entity.name, id: id, dataSource: entity.dataSource, fields: ['id'].concat(entity.listFields.map(function (x) { return x.fetchField; })), render: function (resource) { return (React.createElement(Card, { title: entity.title, extra: React.createElement(Link, { to: id + "/edit" },
                    React.createElement(Button, { htmlType: "button" }, "Edit")) },
                React.createElement(Form, null, entity.detailFields.map(function (field, i) { return (React.createElement(Form.Item, __assign({ label: field.title }, formItemLayout), resource.data && field.render(resource.data))); })))); } }));
    };
    return EntityDetail;
}(React.Component));
export { EntityDetail };
//# sourceMappingURL=detail.js.map