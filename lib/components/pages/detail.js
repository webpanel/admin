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
import Modal from "antd/lib/modal";
import { ResourceLayer } from "webpanel-data";
import { resolveOptionalThunk } from "ts-thunk";
import { Card } from "antd";
// import { Link  } from 'react-router-dom';
import { Translation } from "react-i18next";
var EntityDetail = /** @class */ (function (_super) {
    __extends(EntityDetail, _super);
    function EntityDetail() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EntityDetail.prototype.render = function () {
        var _a = this.props, entity = _a.entity, resourceID = _a.resourceID, pollInterval = _a.pollInterval, wrapperType = _a.wrapperType, modal = _a.modal, card = _a.card, fields = _a.fields;
        var entityFields = entity.getDetailFields(resourceID);
        var _fields = resolveOptionalThunk(fields);
        if (typeof _fields !== "undefined") {
            entityFields = _fields
                .map(function (f) {
                var _a;
                var fieldName = typeof f === "string" ? f : (_a = f) === null || _a === void 0 ? void 0 : _a.field;
                if (!fieldName) {
                    return null;
                }
                return entity.getFieldOrFail(fieldName);
            })
                .filter(function (x) { return x; });
        }
        return (React.createElement(Translation, null, function (t) { return (React.createElement(ResourceLayer, { name: entity.name, id: resourceID, dataSource: entity.dataSource, fields: __spreadArrays([
                "id"
            ], entityFields
                .map(function (x) { return x && x.fetchField(); })
                .filter(function (x) { return x; })), pollInterval: pollInterval, render: function (resource) {
                var content = entity.getLayout("detail", {
                    entity: entity,
                    resource: resource,
                    id: resourceID,
                    data: resource.data || {}
                });
                var getTitle = function () {
                    return (t(entity.name + "._title", {
                        defaultValue: entity.title
                    }) +
                        ": " +
                        ((resource.data && entity.render(resource.data)) || "-"));
                };
                switch (wrapperType) {
                    case "plain":
                        return content;
                    case "modal":
                        return (React.createElement(Modal, __assign({ title: getTitle() }, modal), content));
                    default:
                        return (React.createElement(Card, __assign({ title: getTitle(), loading: resource.loading && !resource.polling, extra: entity.updateable && entity.getEditButton(resourceID) }, card), content));
                }
            } })); }));
    };
    return EntityDetail;
}(React.Component));
export { EntityDetail };
//# sourceMappingURL=detail.js.map