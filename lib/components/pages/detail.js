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
import '../../../styles/form-detail.css';
import * as React from 'react';
import { Card, Form } from 'antd';
import Modal from 'antd/lib/modal';
import { ResourceLayer } from 'webpanel-data';
import { resolveOptionalThunk } from 'ts-thunk';
import { Translation } from 'react-i18next';
var EntityDetail = /** @class */ (function (_super) {
    __extends(EntityDetail, _super);
    function EntityDetail() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EntityDetail.prototype.render = function () {
        var _a = this.props, entity = _a.entity, resourceID = _a.resourceID, pollInterval = _a.pollInterval, wrapperType = _a.wrapperType, fields = _a.fields, modal = _a.modal;
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
        var entityFields = entity.detailFields;
        var _fields = resolveOptionalThunk(fields);
        if (typeof _fields !== 'undefined') {
            entityFields = _fields.map(function (name) { return entity.getFieldOrFail(name); });
        }
        var contentFn = function (resource, t) { return (React.createElement(Form, { className: "webpanel-form-detail" }, entityFields.map(function (field, i) { return (React.createElement(Form.Item, __assign({ key: field.name + "_" + i, label: t(entity.name + "." + field.name, {
                defaultValue: field.title
            }) }, formItemLayout), resource.data && field.render(resource.data))); }))); };
        return (React.createElement(Translation, null, function (t) { return (React.createElement(ResourceLayer, { name: entity.name, id: resourceID, dataSource: entity.dataSource, fields: [
                'id'
            ].concat(entityFields
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
                var content = contentFn(resource, t);
                switch (wrapperType) {
                    case 'plain':
                        return content;
                    case 'modal':
                        return React.createElement(Modal, __assign({}, modal), content);
                    default:
                        return (React.createElement(Card, { title: t(entity.name + "._title", {
                                defaultValue: entity.title
                            }), loading: resource.loading && !resource.polling, extra: entity.getEditButton(resourceID) }, content));
                }
            } })); }));
    };
    return EntityDetail;
}(React.Component));
export { EntityDetail };
//# sourceMappingURL=detail.js.map