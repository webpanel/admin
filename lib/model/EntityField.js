import * as React from 'react';
import * as inflection from 'inflection';
import { Input } from 'webpanel-antd';
import { Input as AntdInput, InputNumber } from 'antd';
import { DatePicker } from '../components/date-picker';
var EntityField = /** @class */ (function () {
    function EntityField(config) {
        this.config = config;
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
    EntityField.prototype.visible = function (type) {
        return !this.config.visibility || !!this.config.visibility[type];
    };
    EntityField.prototype.inputElement = function () {
        var input = this.config.input;
        switch (input.type) {
            case 'string':
                return React.createElement(Input, null);
            case 'text':
                return React.createElement(AntdInput.TextArea, null);
            case 'number':
                return React.createElement(InputNumber, null);
            case 'date':
            case 'datetime':
                return React.createElement(DatePicker, null);
        }
        return React.createElement(Input, { type: input.type });
    };
    return EntityField;
}());
export { EntityField };
//# sourceMappingURL=EntityField.js.map