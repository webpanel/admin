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
import { resolveThunk } from 'ts-thunk';
import { LayoutBuilderTabs } from './components/tabs';
import { LayoutBuilderRow } from './components/row';
import { LayoutBuilderCol } from './components/col';
// import {
//   LayoutBuilderContent,
//   BuilderContentFunctionProps
//   // LayoutBuilderContentProps
// } from './builder-content';
import { LayoutBuilderStringField } from './components/string-field';
import { LayoutBuilderCard } from './components/card';
import { LayoutBuilderEditButton } from './components/edit-button';
import { LayoutBuilderEditField } from './components/edit-field';
var LayoutBuilder = /** @class */ (function () {
    function LayoutBuilder(config) {
        this.config = config;
    }
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
    LayoutBuilder.prototype.stringField = function (props) {
        return (React.createElement(LayoutBuilderStringField, __assign({}, resolveThunk(props, this.config), { entity: this.config.entity, data: this.config.data })));
    };
    LayoutBuilder.prototype.editField = function (props) {
        var formContext = this.config.formContext;
        if (!formContext) {
            throw new Error('cannot create editField without formContext');
        }
        return (React.createElement(LayoutBuilderEditField, __assign({}, resolveThunk(props, this.config), { entity: this.config.entity, formContext: formContext })));
    };
    LayoutBuilder.prototype.editButton = function () {
        return (React.createElement(LayoutBuilderEditButton, { entity: this.config.entity, data: this.config.data }));
    };
    return LayoutBuilder;
}());
export { LayoutBuilder };
//# sourceMappingURL=builder.js.map