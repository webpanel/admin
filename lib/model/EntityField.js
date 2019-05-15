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
import { Button, Input } from 'antd';
import { fieldPermission } from './permissions';
import { resolveOptionalThunk, resolveThunk } from 'ts-thunk';
import { FormField } from 'webpanel-antd';
var isIEntityFieldConfigFilter = function (value) {
    return typeof value === 'object';
};
var EntityField = /** @class */ (function () {
    function EntityField(name, config, entity) {
        var _this = this;
        this.name = name;
        this.config = config;
        this.entity = entity;
        this.filterDropdownInput = function (props) {
            var value = props.selectedKeys ? props.selectedKeys[0] : '';
            return (React.createElement(Input, { value: value, onChange: function (e) {
                    props.setSelectedKeys(e.target.value ? [e.target.value] : []);
                } }));
        };
        this.filterDropdown = function (resource) {
            return function (props) {
                return (React.createElement("div", { style: {
                        display: 'flex',
                        padding: '8px',
                        backgroundColor: 'white',
                        borderRadius: '6px',
                        boxShadow: '0 1px 6px rgba(0, 0, 0, .2)'
                    } },
                    _this.filterDropdownInput(props),
                    React.createElement(Button, { disabled: !props.selectedKeys, onClick: function () { return props.confirm(); }, type: "primary", icon: "search" }),
                    React.createElement(Button, { disabled: !props.selectedKeys, onClick: function () { return props.clearFilters(); }, icon: "delete" })));
            };
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
    EntityField.prototype.columnName = function () {
        return this.name;
    };
    EntityField.prototype.fetchField = function () {
        return this.name;
    };
    Object.defineProperty(EntityField.prototype, "sortable", {
        get: function () {
            return this.config.sortable || false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityField.prototype, "filter", {
        get: function () {
            if (typeof this.config.filter === 'boolean') {
                return this.config.filter;
            }
            return typeof this.config.filter !== 'undefined' || false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityField.prototype, "range", {
        get: function () {
            var filter = this.config.filter;
            if (isIEntityFieldConfigFilter(filter)) {
                return filter.range || false;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityField.prototype, "filterNormalize", {
        get: function () {
            var _this = this;
            return function (values) {
                var res = {};
                if (values.length == 1) {
                    res[_this.columnName() + '_prefix'] = values[0];
                }
                else if (values.length > 1) {
                    res[_this.columnName() + '_in'] = values;
                }
                return res;
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityField.prototype, "filterDenormalize", {
        get: function () {
            var _this = this;
            return function (values) {
                var res = [];
                if (values[_this.columnName() + '_prefix']) {
                    res = [values[_this.columnName() + '_prefix']];
                }
                else if (values[_this.columnName() + '_in']) {
                    res = values[_this.columnName() + '_in'];
                }
                return res;
            };
        },
        enumerable: true,
        configurable: true
    });
    EntityField.prototype.visible = function (section, action, strict) {
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
        return fieldPermission(this, action);
    };
    Object.defineProperty(EntityField.prototype, "render", {
        get: function () {
            var _this = this;
            if (this.config.render) {
                return this.config.render;
            }
            return function (values) {
                return values[_this.name] || null;
            };
        },
        enumerable: true,
        configurable: true
    });
    EntityField.prototype.inputElement = function (props) {
        var onChange = props && props.onChange;
        var onChangeProp = onChange
            ? function (e) {
                return onChange(e.target.value, e.target.value);
            }
            : undefined;
        return (React.createElement(Input, __assign({ key: "string_field_" + this.entity.name + "_" + this.valuePropName }, props, this.config.attributes || {}, { onChange: onChangeProp })));
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
                labelCol: { span: 8 },
                wrapperCol: { span: 16 }
            }
            : null;
        return (React.createElement(FormField, __assign({ key: key, label: this.title, extra: this.config.description, name: this.columnName(), formContext: formContext, valuePropName: this.valuePropName, rules: resolveOptionalThunk(this.config.rules) }, formItemLayout), this.inputElement()));
    };
    return EntityField;
}());
export { EntityField };
//# sourceMappingURL=EntityField.js.map