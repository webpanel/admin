import * as React from 'react';
import * as inflection from 'inflection';
import * as moment from 'moment';
import { Input, FormField } from 'webpanel-antd';
import { Input as AntdInput, InputNumber, Checkbox } from 'antd';
import { DatePicker } from '../components/date-picker';
import { RelationField } from '../components/relation-field';
import { getThunkValue } from '../thunk';
var EntityField = /** @class */ (function () {
    function EntityField(config, entity) {
        this.config = config;
        this.entity = entity;
    }
    Object.defineProperty(EntityField.prototype, "title", {
        get: function () {
            return inflection.transform(this.config.title || this.config.name, [
                'underscore',
                'titleize'
            ]);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityField.prototype, "name", {
        get: function () {
            return this.config.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityField.prototype, "fetchField", {
        get: function () {
            var name = this.config.name;
            if (this.config.type === 'relationship' && this.config.targetEntity) {
                var searchFields = getThunkValue(this.config.targetEntity)
                    .searchableFields;
                name += "{ id " + searchFields.map(function (f) { return f.name; }).join(' ') + "}";
            }
            return name;
        },
        enumerable: true,
        configurable: true
    });
    EntityField.prototype.visible = function (type, strict) {
        if (strict === void 0) { strict = false; }
        if (strict && !this.config.visibility) {
            return false;
        }
        return !this.config.visibility || !!this.config.visibility[type];
    };
    Object.defineProperty(EntityField.prototype, "render", {
        get: function () {
            var _this = this;
            var _a = this.config, render = _a.render, type = _a.type;
            if (!render) {
                switch (type) {
                    case 'date':
                    case 'datetime':
                        return function (value) { return moment(value).calendar(); };
                    case 'boolean':
                        return function (value) { return (value ? '✓' : '✗'); };
                    case 'relationship':
                        var _b = this
                            .config, targetEntity = _b.targetEntity, toMany_1 = _b.toMany;
                        if (targetEntity) {
                            var render_1 = getThunkValue(targetEntity).render;
                            return function (value) {
                                if (toMany_1 && Array.isArray(value)) {
                                    return value
                                        .map(function (x) { return render_1 && render_1(x); })
                                        .filter(function (x) { return x; })
                                        .join(', ');
                                }
                                return render_1 && render_1(value);
                            };
                        }
                }
            }
            else {
                return function (record) {
                    return render(record);
                };
            }
            return function (values) {
                return values[_this.name];
            };
        },
        enumerable: true,
        configurable: true
    });
    EntityField.prototype.inputElement = function () {
        var type = this.config.type;
        if (!type) {
            return React.createElement(Input, null);
        }
        switch (type) {
            case 'string':
                return React.createElement(Input, null);
            case 'text':
                return React.createElement(AntdInput.TextArea, null);
            case 'number':
                return React.createElement(InputNumber, null);
            case 'date':
                return React.createElement(DatePicker, null);
            case 'datetime':
                return React.createElement(DatePicker, { showTime: true });
            case 'boolean':
                return React.createElement(Checkbox, null);
        }
        return "unknown type " + type;
    };
    EntityField.prototype.fieldElement = function (formContext, key) {
        var type = this.config.type;
        if (type === 'relationship') {
            return this.relationshipFieldElement(formContext, this.config, key);
        }
        return (React.createElement(FormField, { key: key, label: this.title, name: this.name, formContext: formContext }, this.inputElement()));
    };
    EntityField.prototype.relationshipFieldElement = function (formContext, config, key) {
        var toMany = config.toMany, targetEntity = config.targetEntity;
        if (!targetEntity) {
            return "targetEntity must be provided in field configuration";
        }
        return (React.createElement(RelationField, { key: key, formContext: formContext, field: this, targetEntity: getThunkValue(targetEntity), mode: toMany ? 'tags' : 'default' }));
    };
    return EntityField;
}());
export { EntityField };
//# sourceMappingURL=EntityField.js.map