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
import { useResource } from "webpanel-data";
import { resolveOptionalThunk } from "ts-thunk";
import { Card } from "antd";
import { PageNotFound } from "./not-found";
// import { Link  } from 'react-router-dom';
import { useTranslation } from "react-i18next";
export var EntityDetail = function (props) {
    var entity = props.entity, resourceID = props.resourceID, pollInterval = props.pollInterval, wrapperType = props.wrapperType, modal = props.modal, card = props.card, fields = props.fields;
    var entityFields = entity.getDetailFields(resourceID);
    var t = useTranslation().t;
    var resource = useResource({
        name: entity.name,
        id: resourceID,
        dataSource: entity.dataSource,
        fields: __spreadArrays([
            "id"
        ], entityFields
            .map(function (x) { return x && x.fetchField(); })
            .filter(function (x) { return x; })),
        pollInterval: pollInterval,
    });
    if (!resource.loading && resource.data === null) {
        return React.createElement(PageNotFound, null);
    }
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
    var content = entity.getCardLayout("detail", {
        entity: entity,
        resource: resource,
        id: resourceID,
        data: resource.data || {},
    });
    var getTitle = function () {
        return (t(entity.name + "._title", {
            defaultValue: entity.title,
        }) +
            ": " +
            ((resource.data && entity.render(resource.data)) || "-"));
    };
    switch (wrapperType) {
        case "plain":
            return React.createElement(React.Fragment, null, "content");
        case "modal":
            return (React.createElement(Modal, __assign({ title: getTitle() }, modal), content));
        default:
            return (React.createElement(Card, __assign({ title: getTitle(), loading: resource.loading && !resource.polling, extra: entity.updateable(resource.data) && entity.getEditButton(resourceID) }, card), content));
    }
};
//# sourceMappingURL=detail.js.map