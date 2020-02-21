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
import * as React from "react";
import { LayoutBuilderCard } from "./components/card";
import { LayoutBuilderCol } from "./components/col";
import { LayoutBuilderEditField } from "./components/edit-field";
import { LayoutBuilderRow } from "./components/row";
import { LayoutBuilderStringField } from "./components/string-field";
import { LayoutBuilderTabs } from "./components/tabs";
import { LayoutBuilderValue } from "./components/value";
import { resolveOptionalThunk, resolveThunk } from "ts-thunk";
import { Descriptions } from "antd";
import { LayoutBuilderEditButton } from "./components/edit-button";
import { Translation } from "react-i18next";
var LayoutBuilder = /** @class */ (function () {
    function LayoutBuilder(config) {
        this.config = config;
    }
    LayoutBuilder.prototype.isLoading = function () {
        return this.config.resource.loading;
    };
    LayoutBuilder.prototype.isInitLoading = function () {
        var resource = this.config.resource;
        return resource.loading && !resource.polling;
    };
    Object.defineProperty(LayoutBuilder.prototype, "data", {
        get: function () {
            return this.config.data;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayoutBuilder.prototype, "resourceID", {
        get: function () {
            return this.config.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayoutBuilder.prototype, "entity", {
        get: function () {
            return this.config.entity;
        },
        enumerable: true,
        configurable: true
    });
    LayoutBuilder.prototype.getFieldsFromThunk = function (fields) {
        var fs = [];
        var _fields = resolveOptionalThunk(fields);
        if (typeof _fields !== "undefined") {
            fs = _fields.map(function (f) {
                var _f = { field: null };
                if (typeof f === "string" || f === null) {
                    return { field: f };
                }
                else {
                    _f = f;
                }
                return _f;
            });
        }
        return fs;
    };
    LayoutBuilder.prototype.getDefaultDetailContent = function (config) {
        return this.getDescriptions(config);
    };
    LayoutBuilder.prototype.getDescriptions = function (config) {
        var _this = this;
        if (!this.resourceID) {
            return "missing resourceID";
        }
        var entityFields = this.entity.getDetailFields(this.resourceID);
        var descriptionItems = entityFields.map(function (field) { return ({
            field: field
        }); });
        if (config && config.fields) {
            var fs = this.getFieldsFromThunk(config.fields);
            descriptionItems = fs.map(function (f) {
                return {
                    field: (f.field && _this.entity.getFieldOrFail(f.field)) || null,
                    span: f["span"] || 1
                };
            });
        }
        return (React.createElement(Translation, null, function (t) { return (React.createElement(Descriptions, __assign({ bordered: true, size: "small", column: { md: 2, xs: 1 } }, (config && config.descriptions)), descriptionItems.map(function (item, i) { return (React.createElement(Descriptions.Item, { span: item.span, key: ((item.field && item.field.name) || "empty") + "_" + i, label: item.field &&
                t(_this.entity.name + "." + item.field.name, {
                    defaultValue: item.field.title
                }) }, item.field ? item.field.render(_this.data) || "–" : "")); }))); }));
    };
    LayoutBuilder.prototype.getDefaultEditContent = function (config) {
        var _this = this;
        var fields = this.entity.getEditFields(this.resourceID);
        if (config && config.fields) {
            fields = this.getFieldsFromThunk(config.fields)
                .map(function (f) { return (f.field && _this.entity.getFieldOrFail(f.field)) || null; })
                .filter(function (x) { return x; });
        }
        return fields.map(function (f) { return _this.editField({ name: f.name }); });
    };
    LayoutBuilder.prototype.card = function (props) {
        return React.createElement(LayoutBuilderCard, __assign({}, resolveThunk(props, this.config)));
    };
    LayoutBuilder.prototype.row = function (props) {
        return React.createElement(LayoutBuilderRow, __assign({}, resolveThunk(props, this.config)));
    };
    LayoutBuilder.prototype.col = function (props) {
        return React.createElement(LayoutBuilderCol, __assign({}, resolveThunk(props, this.config)));
    };
    LayoutBuilder.prototype.tabs = function (props) {
        // const tabProps = Array.isArray(tabList) ? { tabList } : tabList;
        return React.createElement(LayoutBuilderTabs, __assign({}, resolveThunk(props, this.config)));
    };
    LayoutBuilder.prototype.value = function (props) {
        return (React.createElement(LayoutBuilderValue, __assign({}, resolveThunk(props, this.config), { entity: this.config.entity, data: this.config.data })));
    };
    LayoutBuilder.prototype.stringField = function (props) {
        return (React.createElement(LayoutBuilderStringField, __assign({}, resolveThunk(props, this.config), { entity: this.config.entity, data: this.config.data })));
    };
    LayoutBuilder.prototype.editField = function (props) {
        var formContext = this.config.formContext;
        if (!formContext) {
            throw new Error("cannot create editField without formContext");
        }
        return (React.createElement(LayoutBuilderEditField, __assign({}, resolveThunk(props, this.config), { entity: this.config.entity, formContext: formContext })));
    };
    LayoutBuilder.prototype.editButton = function () {
        return (React.createElement(LayoutBuilderEditButton, { entity: this.config.entity, data: this.config.data }));
    };
    LayoutBuilder.prototype.formValue = function (name) {
        var _a;
        return (_a = this.config.formContext) === null || _a === void 0 ? void 0 : _a.form.getFieldValue(name);
    };
    return LayoutBuilder;
}());
export { LayoutBuilder };
//# sourceMappingURL=builder.js.map