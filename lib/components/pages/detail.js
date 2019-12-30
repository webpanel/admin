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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import "../../../styles/form-detail.css";
import * as React from "react";
import { Card, Descriptions } from "antd";
import Modal from "antd/lib/modal";
import { ResourceLayer } from "webpanel-data";
import { resolveOptionalThunk } from "ts-thunk";
import { Translation } from "react-i18next";
var EntityDetail = /** @class */ (function (_super) {
    __extends(EntityDetail, _super);
    function EntityDetail() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EntityDetail.prototype.render = function () {
        var _this = this;
        var _a = this.props, entity = _a.entity, resourceID = _a.resourceID, pollInterval = _a.pollInterval, wrapperType = _a.wrapperType, fields = _a.fields, modal = _a.modal;
        var entityFields = entity.detailFields;
        var descriptionItems = entityFields.map(function (field) { return ({
            field: field
        }); });
        var _fields = resolveOptionalThunk(fields);
        if (typeof _fields !== "undefined") {
            var fs = _fields.map(function (f) {
                var _f = { field: null };
                if (typeof f === "string" || f === null) {
                    return { field: f };
                }
                else {
                    _f = f;
                }
                return _f;
            });
            descriptionItems = fs.map(function (f) {
                return {
                    field: (f.field && entity.getFieldOrFail(f.field)) || null,
                    span: f.span
                };
            });
        }
        var contentFn = function (resource, t) { return (React.createElement(Descriptions, __assign({ bordered: true, size: "small", column: { md: 2, xs: 1 } }, _this.props.desriptions), descriptionItems.map(function (item, i) { return (React.createElement(Descriptions.Item, { span: item.span, key: ((item.field && item.field.name) || "empty") + "_" + i, label: item.field &&
                t(entity.name + "." + item.field.name, {
                    defaultValue: item.field.title
                }) }, item.field
            ? (resource.data && item.field.render(resource.data)) || "–"
            : "")); }))); };
        return (React.createElement(Translation, null, function (t) { return (React.createElement(ResourceLayer, { name: entity.name, id: resourceID, dataSource: entity.dataSource, fields: __spreadArrays([
                "id"
            ], descriptionItems
                .map(function (x) { return x.field && x.field.fetchField(); })
                .filter(function (x) { return x; })), pollInterval: pollInterval, render: function (resource) {
                var layout = entity.getLayout("detail", {
                    entity: entity,
                    resource: resource,
                    id: resourceID,
                    data: resource.data || {}
                });
                if (layout)
                    return layout;
                var content = contentFn(resource, t);
                switch (wrapperType) {
                    case "plain":
                        return content;
                    case "modal":
                        return React.createElement(Modal, __assign({}, modal), content);
                    default:
                        return (React.createElement(Card, { title: t(entity.name + "._title", {
                                defaultValue: entity.title
                            }), loading: resource.loading && !resource.polling, extra: entity.updateable && entity.getEditButton(resourceID) }, content));
                }
            } })); }));
    };
    return EntityDetail;
}(React.Component));
export { EntityDetail };
//# sourceMappingURL=detail.js.map