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
import { ResourceSelect } from "webpanel-antd";
export var EntitySelect = function (props) {
    var entity = props.entity, key = props.key, resource = props.resource;
    var resourceConfig = entity.getSearchResourceCollectionConfig();
    return (React.createElement(ResourceSelect, { resource: __assign(__assign({}, resourceConfig), resource), key: "entity_select_" + entity.name + "_" + key, valueKey: "id", labelKey: function (value) {
            return entity.render(value);
        }, showSearch: true }));
};
//# sourceMappingURL=index.js.map