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
var EntityAddButton = /** @class */ (function (_super) {
    __extends(EntityAddButton, _super);
    function EntityAddButton() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { showModal: false };
        _this.hideModal = function () {
            _this.setState({ showModal: false });
        };
        return _this;
    }
    EntityAddButton.prototype.render = function () {
        var _this = this;
        var _a = this.props, entity = _a.entity, initialValues = _a.initialValues, flow = _a.flow, modal = _a.modal;
        if (flow === 'redirect') {
            return (React.createElement(Link, { to: entity.getCreateLink(), key: "newButton" },
                React.createElement(Button, { size: "small", htmlType: "button", icon: "plus" })));
        }
        return (React.createElement(Translation, null, function (t) { return (React.createElement(React.Fragment, null,
            React.createElement("div", { style: { position: 'absolute' } }, entity.getCreateView({
                initialValues: initialValues,
                wrapperType: 'modal',
                modal: __assign({ title: t(entity.name + ".title.create", {
                        defaultValue: "Create " + entity.title
                    }) }, modal, { visible: _this.state.showModal, destroyOnClose: true })
            }, {
                onCancel: _this.hideModal,
                onSave: function () {
                    _this.hideModal();
                    var fn = _this.props.onCreate;
                    if (fn) {
                        fn();
                    }
                }
            })),
            React.createElement(Button, { size: "small", icon: "plus", onClick: function () { return _this.setState({ showModal: true }); } }))); }));
    };
    return EntityAddButton;
}(React.Component));
export { EntityAddButton };
//# sourceMappingURL=EntityAddButton.js.map