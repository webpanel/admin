import * as React from "react";
import { ResourceSelect } from "webpanel-antd";
export var EntitySelect = function (props) {
    var entity = props.entity, key = props.key;
    var resourceConfig = entity.getSearchResourceCollectionConfig();
    return (React.createElement(ResourceSelect, { resource: resourceConfig, key: "entity_select_" + entity.name + "_" + key, valueKey: "id", labelKey: function (value) {
            return entity.render(value);
        }, showSearch: true }));
};
//# sourceMappingURL=index.js.map