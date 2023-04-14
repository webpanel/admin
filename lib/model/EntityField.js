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
import * as inflection from "inflection";
import { Button, Form, Tooltip } from "antd";
import { DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import Input from "antd/lib/input";
import { resolveOptionalThunk } from "ts-thunk";
import { Translation } from "react-i18next";
var isIEntityFieldConfigFilter = function (value) {
    return typeof value === "object";
};
var EntityField = /** @class */ (function () {
    function EntityField(name, config, _entity) {
        var _this = this;
        this.name = name;
        this.config = config;
        this._entity = _entity;
        this.filterDropdownInput = function (props) {
            var value = props.selectedKeys ? props.selectedKeys[0] : undefined;
            return (React.createElement(Input, { key: "field_".concat(_this._entity.name, "_").concat(_this.valuePropName), value: value, onChange: function (e) {
                    return props.setSelectedKeys(e.target.value ? [e.target.value] : []);
                } }));
        };
        this._filterDropdownInput = function (props) {
            var filter = _this.config.filter;
            if (filter && typeof filter === "object" && filter.dropdownInput) {
                return filter.dropdownInput(props);
            }
            return _this.filterDropdownInput(props);
        };
        this.filterDropdown = function (resource) {
            return function (props) {
                return (React.createElement("div", { style: {
                        display: "flex",
                        padding: "8px",
                        backgroundColor: "white",
                        borderRadius: "6px",
                        boxShadow: "0 1px 6px rgba(0, 0, 0, .2)",
                    } },
                    React.createElement("div", { style: { marginRight: 2 } }, _this._filterDropdownInput(props)),
                    React.createElement(Button, { style: { marginRight: 2 }, disabled: !props.selectedKeys, onClick: function () { return props.confirm(); }, type: "primary", icon: React.createElement(SearchOutlined, null) }),
                    React.createElement(Button, { disabled: !props.selectedKeys, onClick: function () { return props.clearFilters(); }, icon: React.createElement(DeleteOutlined, null) })));
            };
        };
    }
    EntityField.prototype.clone = function (entity) {
        return this.constructor(this.name, this.config, entity || this._entity);
    };
    Object.defineProperty(EntityField.prototype, "titleTranslationKey", {
        get: function () {
            return "".concat(this._entity.name, ".").concat(this.name);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EntityField.prototype, "entity", {
        get: function () {
            return this._entity;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EntityField.prototype, "title", {
        get: function () {
            return (resolveOptionalThunk(this.config.title) ||
                inflection.transform(this.name, ["underscore", "titleize"]));
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EntityField.prototype, "shortTitle", {
        get: function () {
            return resolveOptionalThunk(this.config.shortTitle) || this.title;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EntityField.prototype, "listColumnAlign", {
        get: function () {
            return this.config.listColumnAlign || "left";
        },
        enumerable: false,
        configurable: true
    });
    EntityField.prototype.columnName = function () {
        return this.name;
    };
    EntityField.prototype.fetchField = function () {
        return this.name;
    };
    EntityField.prototype.editFetchField = function () {
        return this.columnName();
    };
    Object.defineProperty(EntityField.prototype, "sortable", {
        get: function () {
            var sortable = this.config.sortable;
            switch (typeof sortable) {
                case "undefined":
                    return false;
                case "boolean":
                    return sortable;
                default:
                    return true;
            }
        },
        enumerable: false,
        configurable: true
    });
    EntityField.prototype.sortColumns = function () {
        var sortable = this.config.sortable;
        switch (typeof sortable) {
            case "undefined":
                return [];
            case "boolean":
                return [this.columnName()];
            default:
                return sortable.fields;
        }
    };
    Object.defineProperty(EntityField.prototype, "filter", {
        get: function () {
            if (typeof this.config.filter === "boolean") {
                return this.config.filter;
            }
            return typeof this.config.filter !== "undefined" || false;
        },
        enumerable: false,
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
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EntityField.prototype, "filterNormalize", {
        get: function () {
            var _this = this;
            return function (values) {
                var res = {};
                values = values || [];
                if (values.length == 1) {
                    res[_this.columnName() + "_like"] = values[0] + "*";
                }
                else if (values.length > 1) {
                    res[_this.columnName() + "_in"] = values;
                }
                return res;
            };
        },
        enumerable: false,
        configurable: true
    });
    EntityField.prototype.filterNormalizeFn = function () {
        var filter = this.config.filter;
        if (filter && typeof filter === "object" && filter.normalizer) {
            return filter.normalizer;
        }
        return this.filterNormalize;
    };
    Object.defineProperty(EntityField.prototype, "filterDenormalize", {
        get: function () {
            var _this = this;
            return function (values) {
                var res = [];
                if (values[_this.columnName() + "_like"]) {
                    var val = values[_this.columnName() + "_like"];
                    res = [val.substring(0, val.length - 1)];
                }
                else if (values[_this.columnName() + "_in"]) {
                    res = values[_this.columnName() + "_in"];
                }
                return res;
            };
        },
        enumerable: false,
        configurable: true
    });
    EntityField.prototype.filterDenormalizeFn = function () {
        var filter = this.config.filter;
        if (filter && typeof filter === "object" && filter.denormalizer) {
            return filter.denormalizer;
        }
        return this.filterDenormalize;
    };
    Object.defineProperty(EntityField.prototype, "enabled", {
        get: function () {
            var val = resolveOptionalThunk(this.config.enabled);
            if (typeof val !== "undefined")
                return val;
            return true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EntityField.prototype, "readable", {
        get: function () {
            if (!this.enabled)
                return false;
            var val = resolveOptionalThunk(this.config.readable);
            if (typeof val !== "undefined")
                return val;
            return true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EntityField.prototype, "writeable", {
        get: function () {
            if (!this.enabled)
                return false;
            var val = resolveOptionalThunk(this.config.writable);
            if (typeof val !== "undefined")
                return val;
            return true;
        },
        enumerable: false,
        configurable: true
    });
    EntityField.prototype.isWriteable = function (values) {
        if (!this.enabled)
            return false;
        var val = resolveOptionalThunk(this.config.writable, values);
        if (typeof val !== "undefined")
            return val;
        return true;
    };
    Object.defineProperty(EntityField.prototype, "render", {
        get: function () {
            var _this = this;
            if (this.config.render) {
                return this.config.render;
            }
            return function (values, options) {
                var value = values[_this.name] || "";
                if (!value ||
                    !value.substring ||
                    value.length < 50 ||
                    (options === null || options === void 0 ? void 0 : options.forceString)) {
                    return value;
                }
                var shortValue = value.substring(0, 50) + "...";
                return React.createElement(Tooltip, { title: value }, shortValue);
            };
        },
        enumerable: false,
        configurable: true
    });
    EntityField.prototype.setRender = function (fn) {
        this.config.render = fn;
    };
    EntityField.prototype.inputElement = function (props) {
        return "input element is empty";
    };
    Object.defineProperty(EntityField.prototype, "valuePropName", {
        get: function () {
            return "value";
        },
        enumerable: false,
        configurable: true
    });
    EntityField.prototype.fieldElement = function (key, config, values) {
        var _this = this;
        var formItemLayout = config.formLayout === "horizontal"
            ? {
                labelCol: { span: 8 },
                wrapperCol: { span: 16 },
            }
            : null;
        var deps = resolveOptionalThunk(this.config.dependencies);
        var formItem = function () { return (React.createElement(Form.Item, __assign({ name: _this.columnName(), valuePropName: _this.valuePropName, rules: resolveOptionalThunk(_this.config.rules), label: React.createElement(Translation, null, function (t) { return t(_this.titleTranslationKey, {}); }), extra: resolveOptionalThunk(_this.config.description) }, formItemLayout), _this.inputElement({
            values: values,
            formInstance: config.formInstance,
        }))); };
        return deps ? (React.createElement(Form.Item, { key: key, dependencies: deps, noStyle: true }, formItem)) : (formItem());
    };
    return EntityField;
}());
export { EntityField };
//# sourceMappingURL=EntityField.js.map