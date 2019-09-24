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
import { Button } from 'antd';
import { Link } from 'webpanel-antd';
import { Translation } from 'react-i18next';
var CreateEntityButton = /** @class */ (function (_super) {
    __extends(CreateEntityButton, _super);
    function CreateEntityButton() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { showModal: false };
        _this.hideModal = function () {
            _this.setState({ showModal: false });
        };
        return _this;
    }
    CreateEntityButton.prototype.render = function () {
        var _this = this;
        var _a = this.props, entity = _a.entity, initialValues = _a.initialValues, fields = _a.fields, flow = _a.flow, onCreate = _a.onCreate, button = _a.button;
        var _flow = flow || 'redirect';
        if (_flow === 'redirect') {
            return (React.createElement(Link, { to: entity.getCreateLink(), key: "newButton" },
                React.createElement(Button, __assign({ htmlType: "button", icon: "plus" }, button))));
        }
        if (_flow.type === 'modal') {
            var modal_1 = _flow.modal;
            return (React.createElement(Translation, null, function (t) { return (React.createElement(React.Fragment, null,
                React.createElement("div", { style: { position: 'absolute' } }, entity.getCreateView({
                    initialValues: initialValues,
                    fields: fields,
                    wrapperType: 'modal',
                    modal: __assign({ title: t(entity.name + ".title.create", {
                            defaultValue: "Create " + entity.title
                        }) }, modal_1, { visible: _this.state.showModal, destroyOnClose: true })
                }, {
                    onCancel: _this.hideModal,
                    onSave: function (id) {
                        _this.hideModal();
                        if (onCreate) {
                            onCreate(id);
                        }
                    }
                })),
                React.createElement(Button, __assign({ icon: "plus" }, button, { onClick: function () { return _this.setState({ showModal: true }); } })))); }));
        }
        return "unexpected flow";
    };
    return CreateEntityButton;
}(React.Component));
export { CreateEntityButton };
//# sourceMappingURL=EntityAddButton.js.map