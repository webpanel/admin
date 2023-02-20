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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import * as React from "react";
import { ResourceSelect } from "webpanel-antd";
export var EntitySelect = function (props) {
    var entity = props.entity, key = props.key, resource = props.resource, rest = __rest(props, ["entity", "key", "resource"]);
    var resourceConfig = entity.getSearchResourceCollectionConfig();
    return (React.createElement(ResourceSelect, __assign({ resource: __assign(__assign({}, resourceConfig), resource), key: "entity_select_".concat(entity.name, "_").concat(key), valueKey: "id", labelKey: function (value) {
            return entity.render(value);
        }, showSearch: true }, rest)));
};
//# sourceMappingURL=index.js.map