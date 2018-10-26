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
import * as inflection from 'inflection';
import { Input, FormField } from 'webpanel-antd';
import { resolveThunk, resolveOptionalThunk } from 'ts-thunk';
var EntityField = /** @class */ (function () {
    function EntityField(name, config, entity) {
        this.name = name;
        this.config = config;
        this.entity = entity;
    }
    Object.defineProperty(EntityField.prototype, "title", {
        get: function () {
            return (resolveOptionalThunk(this.config.title) ||
                inflection.transform(this.name, ['underscore', 'titleize']));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityField.prototype, "columnName", {
        get: function () {
            return this.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityField.prototype, "fetchField", {
        get: function () {
            return this.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityField.prototype, "sortable", {
        get: function () {
            return this.config.sortable || false;
        },
        enumerable: true,
        configurable: true
    });
    EntityField.prototype.visible = function (section, strict) {
        if (strict === void 0) { strict = false; }
        var _a = this.config, visible = _a.visible, hidden = _a.hidden, enabled = _a.enabled;
        if (enabled === false) {
            return false;
        }
        if (strict && !visible) {
            return false;
        }
        if (visible && resolveThunk(visible).indexOf(section) === -1) {
            return false;
        }
        if (hidden && resolveThunk(hidden).indexOf(section) !== -1) {
            return false;
        }
        return true;
    };
    Object.defineProperty(EntityField.prototype, "render", {
        get: function () {
            var _this = this;
            return function (values) {
                return values[_this.name];
            };
        },
        enumerable: true,
        configurable: true
    });
    EntityField.prototype.inputElement = function (props) {
        var onChange = props && props.onChange;
        var onChangeProp = onChange
            ? function (e) { return onChange(e.target.value); }
            : undefined;
        return (React.createElement(Input, __assign({}, props, this.config.attributes || {}, { onChange: onChangeProp })));
    };
    Object.defineProperty(EntityField.prototype, "valuePropName", {
        get: function () {
            return 'value';
        },
        enumerable: true,
        configurable: true
    });
    EntityField.prototype.fieldElement = function (field, formContext, key) {
        return (React.createElement(FormField, { key: key, label: field.title, name: field.columnName, formContext: formContext, valuePropName: this.valuePropName, rules: resolveOptionalThunk(field.config.rules) }, this.inputElement()));
    };
    return EntityField;
}());
export { EntityField };
//# sourceMappingURL=EntityField.js.map