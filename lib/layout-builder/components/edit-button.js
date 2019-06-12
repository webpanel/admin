var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as React from 'react';
import { Button } from 'antd';
import { Link } from 'webpanel-antd';
var LayoutBuilderEditButton = /** @class */ (function (_super) {
    __extends(LayoutBuilderEditButton, _super);
    function LayoutBuilderEditButton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LayoutBuilderEditButton.prototype.render = function () {
        var _a = this.props, entity = _a.entity, data = _a.data;
        return (React.createElement(Link, { to: entity.getEditLink(data.id) },
            React.createElement(Button, { size: "small", htmlType: "button", icon: "edit" })));
    };
    return LayoutBuilderEditButton;
}(React.Component));
export { LayoutBuilderEditButton };
//# sourceMappingURL=edit-button.js.map