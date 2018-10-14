var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
import { ResourceCollectionLayer } from 'webpanel-data';
import { EntityField } from '../EntityField';
import { FormField, ResourceSelect } from 'webpanel-antd';
import { getThunkValue } from '../../thunk';
var EntityFieldRelationship = /** @class */ (function (_super) {
    __extends(EntityFieldRelationship, _super);
    function EntityFieldRelationship() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(EntityFieldRelationship.prototype, "columnName", {
        get: function () {
            return this.name + "_" + (this.config.type === 'toOne' ? 'id' : 'ids');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityFieldRelationship.prototype, "fetchField", {
        get: function () {
            var name = this.name;
            var searchFields = getThunkValue(this.config.targetEntity)
                .searchableFields;
            name += "{ id " + searchFields.map(function (f) { return f.name; }).join(' ') + "} " + this.columnName + " ";
            return name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityFieldRelationship.prototype, "render", {
        get: function () {
            var _this = this;
            var _a = this.config, targetEntity = _a.targetEntity, type = _a.type;
            var render = getThunkValue(targetEntity).render;
            return function (values) {
                var value = values[_this.name];
                if (type === 'toMany' && Array.isArray(value)) {
                    return value
                        .map(function (x) { return render && render(x); })
                        .filter(function (x) { return x; })
                        .join(', ');
                }
                return render && render(value);
            };
        },
        enumerable: true,
        configurable: true
    });
    EntityFieldRelationship.prototype.fieldElement = function (field, formContext, key) {
        var _this = this;
        var _a = this.config, targetEntity = _a.targetEntity, mode = _a.mode;
        return (React.createElement(ResourceCollectionLayer, { key: key, name: targetEntity.name, fields: ['id'].concat(targetEntity.searchableFields.map(function (x) { return x.name; })), dataSource: targetEntity.dataSource, render: function (collection) {
                return (React.createElement(FormField, { label: _this.title, name: _this.columnName, formContext: formContext },
                    React.createElement(ResourceSelect, { valueKey: "id", labelKey: function (value) {
                            return targetEntity.render(value);
                        }, mode: mode, resourceCollection: collection })));
            } }));
    };
    EntityFieldRelationship.prototype.inputElement = function (props) {
        var _a = this.config, targetEntity = _a.targetEntity, mode = _a.mode;
        return (React.createElement(ResourceCollectionLayer, { name: targetEntity.name, fields: ['id'].concat(targetEntity.searchableFields.map(function (x) { return x.fetchField; })), dataSource: targetEntity.dataSource, render: function (collection) {
                return (React.createElement(ResourceSelect, __assign({}, props, { valueKey: "id", labelKey: function (value) {
                        return targetEntity.render(value);
                    }, mode: mode, resourceCollection: collection })));
            } }));
    };
    return EntityFieldRelationship;
}(EntityField));
export { EntityFieldRelationship };
//# sourceMappingURL=EntityFieldRelationship.js.map