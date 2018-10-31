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
import * as React from 'react';
import { Button, Popconfirm, Form, Menu, Dropdown } from 'antd';
var ResourceFormPageButtons = /** @class */ (function (_super) {
    __extends(ResourceFormPageButtons, _super);
    function ResourceFormPageButtons() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ResourceFormPageButtons.prototype.render = function () {
        var _a = this.props, handleReset = _a.handleReset, handleSave = _a.handleSave, hasChanges = _a.hasChanges;
        var menu = (React.createElement(Menu, { onClick: function (e) { return handleSave(e.key); } },
            React.createElement(Menu.Item, { key: "edit" }, "Save and continue editing"),
            React.createElement(Menu.Item, { key: "add" }, "Save and add new")));
        return (React.createElement(Form.Item, { wrapperCol: {
                xs: { span: 24, offset: 0 },
                sm: { span: 16, offset: 8 }
            } },
            React.createElement(Dropdown.Button, { disabled: !hasChanges, type: "primary", overlay: menu, onClick: function () { return handleSave('default'); } }, "Save"),
            React.createElement(Popconfirm, { title: "Reset?", cancelText: "No", okText: "Yes", onConfirm: handleReset },
                React.createElement(Button, { disabled: !hasChanges, style: { marginLeft: 8 } }, "Reset"))));
    };
    return ResourceFormPageButtons;
}(React.Component));
export { ResourceFormPageButtons };
//# sourceMappingURL=buttons.js.map