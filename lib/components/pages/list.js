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
import { Button, Card } from 'antd';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { ResourceTable } from 'webpanel-antd';
import { ResourceCollectionLayer, SortInfoOrder } from 'webpanel-data';
var EntityList = /** @class */ (function (_super) {
    __extends(EntityList, _super);
    function EntityList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EntityList.prototype.render = function () {
        var _this = this;
        var entity = this.props.entity;
        return (React.createElement(ResourceCollectionLayer, { name: entity.name, dataSource: this.props.dataSource, fields: ['id'].concat(entity.listFields.map(function (x) { return x.fetchField; })), initialSorting: [{ columnKey: 'id', order: SortInfoOrder.ascend }], render: function (resource) { return (React.createElement(Card, { title: entity.title, extra: React.createElement(Link, { to: "new" },
                    React.createElement(Button, { htmlType: "button" }, "+")) },
                React.createElement(ResourceTable, { resourceCollection: resource, columns: entity.listFields.map(function (field, i) {
                        var render = field.render;
                        return {
                            key: i,
                            dataIndex: field.name,
                            title: field.title,
                            render: render
                                ? function (value) {
                                    return render(value);
                                }
                                : undefined
                        };
                    }), detailButtonText: _this.props.detailButtonText }))); } }));
    };
    return EntityList;
}(React.Component));
export { EntityList };
//# sourceMappingURL=list.js.map