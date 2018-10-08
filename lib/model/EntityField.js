import * as React from 'react';
import * as inflection from 'inflection';
import * as moment from 'moment';
import { Input } from 'webpanel-antd';
import { Input as AntdInput, InputNumber } from 'antd';
import { DatePicker } from '../components/date-picker';
// export interface IEntityFieldConfig<T>
//   extends IEntityFieldBaseConfig {
//   render?: (text: any, record: any, index: number) => React.ReactNode;
// }
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
    Object.defineProperty(EntityField.prototype, "render", {
        get: function () {
            var _a = this.config, render = _a.render, type = _a.type;
            if (!render) {
                switch (type) {
                    case 'string':
                    case 'text':
                    case 'number':
                        return undefined;
                    case 'date':
                    case 'datetime':
                        return function (value) { return moment(value).calendar(); };
                }
            }
            return this.config.render;
        },
        enumerable: true,
        configurable: true
    });
    EntityField.prototype.visible = function (type) {
        return !this.config.visibility || !!this.config.visibility[type];
    };
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
            case 'datetime':
                return React.createElement(DatePicker, null);
        }
        return "unknown type " + type;
    };
    return EntityField;
}());
export { EntityField };
//# sourceMappingURL=EntityField.js.map