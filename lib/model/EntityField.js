import * as React from 'react';
import * as inflection from 'inflection';
import { Input, FormField } from 'webpanel-antd';
var EntityField = /** @class */ (function () {
    function EntityField(name, config, entity) {
        this.name = name;
        this.config = config;
        this.entity = entity;
    }
    Object.defineProperty(EntityField.prototype, "title", {
        get: function () {
            return inflection.transform(this.config.title || this.name, [
                'underscore',
                'titleize'
            ]);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityField.prototype, "fetchField", {
        get: function () {
            var name = this.name;
            // if (this.config.type === 'relationship' && this.config.targetEntity) {
            //   const searchFields = getThunkValue(this.config.targetEntity)
            //     .searchableFields;
            //   name += `{ id ${searchFields.map(f => f.name).join(' ')}}`;
            // }
            return name;
        },
        enumerable: true,
        configurable: true
    });
    EntityField.prototype.visible = function (section, strict) {
        if (strict === void 0) { strict = false; }
        var _a = this.config, visible = _a.visible, hidden = _a.hidden;
        if (strict && !visible) {
            return false;
        }
        if (visible && visible.indexOf(section) === -1) {
            return false;
        }
        if (hidden && hidden.indexOf(section) !== -1) {
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
    EntityField.prototype.inputElement = function () {
        return React.createElement(Input, null);
    };
    Object.defineProperty(EntityField.prototype, "valuePropName", {
        get: function () {
            return 'value';
        },
        enumerable: true,
        configurable: true
    });
    EntityField.prototype.fieldElement = function (field, formContext, key) {
        // const { type } = this.config;
        // if (type === 'relationship') {
        //   return this.relationshipFieldElement(
        //     formContext,
        //     this.config as IEntityFieldRelationship,
        //     key
        //   );
        // }
        // let valuePropName = 'value';
        // if (this.config.type === 'boolean') {
        //   valuePropName = 'checked';
        // }
        return (React.createElement(FormField, { key: key, label: field.title, name: field.name, formContext: formContext, valuePropName: this.valuePropName }, this.inputElement()));
    };
    return EntityField;
}());
export { EntityField };
//# sourceMappingURL=EntityField.js.map