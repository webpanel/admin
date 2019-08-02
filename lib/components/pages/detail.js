var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
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
import * as React from 'react';
import { Button, Card, Form } from 'antd';
import { ResourceLayer } from 'webpanel-data';
// import { Link  } from 'react-router-dom';
import { Link } from 'webpanel-antd';
import { Translation } from 'react-i18next';
var EntityDetail = /** @class */ (function (_super) {
    __extends(EntityDetail, _super);
    function EntityDetail() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EntityDetail.prototype.render = function () {
        var _a = this.props, entity = _a.entity, resourceID = _a.resourceID, pollInterval = _a.pollInterval;
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
        return (React.createElement(Translation, null, function (t) { return (React.createElement(ResourceLayer, { name: entity.name, id: resourceID, dataSource: entity.dataSource, fields: [
                'id'
            ].concat(entity.detailFields
                .map(function (x) { return x.fetchField(); })
                .filter(function (x) { return x; })), pollInterval: pollInterval, render: function (resource) {
                var layout = entity.getLayout('detail', {
                    entity: entity,
                    resource: resource,
                    id: resourceID,
                    data: resource.data || {}
                });
                if (layout)
                    return layout;
                return (React.createElement(Card, { title: t(entity.name, { default: entity.title }), loading: resource.loading && !resource.polling, extra: React.createElement(Link, { to: resourceID + "/edit" },
                        React.createElement(Button, { size: "small", htmlType: "button", icon: "edit" })) },
                    React.createElement(Form, null, entity.detailFields.map(function (field, i) { return (React.createElement(Form.Item, __assign({ key: field.name + "_" + i, label: t(field.name, { default: field.title }) }, formItemLayout), resource.data && field.render(resource.data))); }))));
            } })); }));
    };
    return EntityDetail;
}(React.Component));
export { EntityDetail };
//# sourceMappingURL=detail.js.map