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
import { Input, Button } from 'antd';
import * as React from 'react';
import * as inflection from 'inflection';
import { FormField } from 'webpanel-antd';
import { resolveThunk, resolveOptionalThunk } from 'ts-thunk';
var EntityField = /** @class */ (function () {
    function EntityField(name, config, entity) {
        var _this = this;
        this.name = name;
        this.config = config;
        this.entity = entity;
        this.updateFilterField = function (resource, operationName, value, customName) {
            var filterName = "" + (customName || _this.name) + (operationName ? '_' : '') + (operationName || '');
            var filters = (resource.filters || {})[_this.name] || {};
            if (value) {
                filters[filterName] = value;
            }
            else {
                delete filters[filterName];
            }
            resource.updateNamedFilters(_this.name, filters, true);
        };
        this.valueForFilterField = function (resource, operationName, customName) {
            var filterName = "" + (customName || _this.name) + (operationName ? '_' : '') + (operationName || '');
            var filter = resource.namedFilter(_this.name);
            if (!filter) {
                return undefined;
            }
            return filter[filterName];
        };
        this.clearFilters = function (resource) {
            resource.updateNamedFilters(_this.name, undefined, true);
        };
        this.filterDropdownInput = function (resource) {
            var value = _this.valueForFilterField(resource, 'like');
            return (React.createElement(React.Fragment, null,
                React.createElement(Input.Search, { defaultValue: value, onSearch: function (value) {
                        return _this.updateFilterField(resource, 'like', value);
                    } }),
                React.createElement(Button, { disabled: !_this.isFiltered(resource), onClick: function () { return _this.clearFilters(resource); }, icon: "delete" })));
        };
        this.filterDropdown = function (resource) {
            return function () { return (React.createElement("div", { style: {
                    display: 'flex',
                    padding: '8px',
                    backgroundColor: 'white',
                    borderRadius: '6px',
                    boxShadow: '0 1px 6px rgba(0, 0, 0, .2)'
                } }, _this.filterDropdownInput(resource))); };
        };
    }
    Object.defineProperty(EntityField.prototype, "title", {
        get: function () {
            return (resolveOptionalThunk(this.config.title) ||
                inflection.transform(this.name, ['underscore', 'titleize']));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityField.prototype, "shortTitle", {
        get: function () {
            return resolveOptionalThunk(this.config.shortTitle) || this.title;
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
    Object.defineProperty(EntityField.prototype, "filter", {
        get: function () {
            return this.config.filter || false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityField.prototype, "range", {
        get: function () {
            return this.config.range || false;
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
    EntityField.prototype.hasPermission = function (permission) {
        var permissions = this.config.permissions;
        if (permissions && resolveThunk(permissions).indexOf(permission) === -1) {
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
    EntityField.prototype.fieldElement = function (formContext, key, config) {
        var formItemLayout = config.formLayout === 'horizontal'
            ? {
                labelCol: { span: 4 },
                wrapperCol: { span: 20 }
            }
            : null;
        return (React.createElement(FormField, __assign({ key: key, label: this.title, name: this.columnName, formContext: formContext, valuePropName: this.valuePropName, rules: resolveOptionalThunk(this.config.rules) }, formItemLayout), this.inputElement()));
    };
    EntityField.prototype.isFiltered = function (resource) {
        return !!this.valueForFilterField(resource, 'like');
    };
    return EntityField;
}());
export { EntityField };
//# sourceMappingURL=EntityField.js.map