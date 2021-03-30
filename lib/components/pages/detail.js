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
import "../../../styles/form-detail.css";
import * as React from "react";
import Modal from "antd/lib/modal";
import { Card } from "antd";
import { PageNotFound } from "./not-found";
import { useTranslation } from "react-i18next";
export var EntityDetail = function (props) {
    var entity = props.entity, resourceID = props.resourceID, pollInterval = props.pollInterval, wrapperType = props.wrapperType, modal = props.modal, card = props.card;
    var t = useTranslation().t;
    var resource = entity.useResource(resourceID, {
        pollInterval: pollInterval,
    });
    if (!resource.loading && resource.data === null) {
        return React.createElement(PageNotFound, null);
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
            return (React.createElement(Card, __assign({ title: getTitle(), loading: resource.loading && !resource.polling, extra: resource.data &&
                    entity.updateable(resource.data) &&
                    entity.getEditButton(resourceID) }, card), content));
    }
};
//# sourceMappingURL=detail.js.map