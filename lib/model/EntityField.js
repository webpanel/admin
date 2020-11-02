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
import { Button, Tooltip } from "antd";
import { DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import Input from "antd/lib/input";
import { resolveOptionalThunk } from "ts-thunk";
import FormItem from "antd/lib/form/FormItem";
import { Translation } from "react-i18next";
var isIEntityFieldConfigFilter = function (value) {
    return typeof value === "object";
};
var EntityField = /** @class */ (function () {
    function EntityField(name, config, entity) {
        var _this = this;
        this.name = name;
        this.config = config;
        this.entity = entity;
        this.filterDropdownInput = function (props) {
            var value = props.selectedKeys ? props.selectedKeys[0] : undefined;
            return (React.createElement(Input, { key: "field_" + _this.entity.name + "_" + _this.valuePropName, value: value, onChange: function (e) {
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
    Object.defineProperty(EntityField.prototype, "title", {
        get: function () {
            return (resolveOptionalThunk(this.config.title) ||
                inflection.transform(this.name, ["underscore", "titleize"]));
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
    Object.defineProperty(EntityField.prototype, "listColumnAlign", {
        get: function () {
            return this.config.listColumnAlign || "left";
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
        enumerable: true,
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
                    res[_this.columnName() + "_like"] = values[0] + "*";
                }
                else if (values.length > 1) {
                    res[_this.columnName() + "_in"] = values;
                }
                return res;
            };
        },
        enumerable: true,
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
        enumerable: true,
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
        enumerable: true,
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
        enumerable: true,
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
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityField.prototype, "render", {
        get: function () {
            var _this = this;
            if (this.config.render) {
                return this.config.render;
            }
            return function (values, options) {
                var value = values[_this.name] || "";
                if (!value || !value.substring || value.length < 50) {
                    return value;
                }
                var shortValue = value.substring(0, 50) + "...";
                return React.createElement(Tooltip, { title: value }, shortValue);
            };
        },
        enumerable: true,
        configurable: true
    });
    EntityField.prototype.inputElement = function (props) {
        return "input element is empty";
    };
    Object.defineProperty(EntityField.prototype, "valuePropName", {
        get: function () {
            return "value";
        },
        enumerable: true,
        configurable: true
    });
    EntityField.prototype.fieldElement = function (key, config) {
        var _this = this;
        var formItemLayout = config.formLayout === "horizontal"
            ? {
                labelCol: { span: 8 },
                wrapperCol: { span: 16 },
            }
            : null;
        return (React.createElement(Translation, { key: key }, function (t) { return (React.createElement(FormItem, __assign({ key: key, label: t(_this.entity.name + "." + _this.name, {
                defaultValue: _this.title,
            }), extra: resolveOptionalThunk(_this.config.description), name: _this.columnName(), valuePropName: _this.valuePropName, rules: resolveOptionalThunk(_this.config.rules) }, formItemLayout), _this.inputElement())); }));
    };
    return EntityField;
}());
export { EntityField };
//# sourceMappingURL=EntityField.js.map