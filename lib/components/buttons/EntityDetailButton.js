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
import * as React from 'react';
import { Button } from 'antd';
import { Link } from 'webpanel-antd';
import { Translation } from 'react-i18next';
var DetailEntityButton = /** @class */ (function (_super) {
    __extends(DetailEntityButton, _super);
    function DetailEntityButton() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { showModal: false };
        _this.showModal = function () {
            _this.setState({ showModal: true });
        };
        _this.hideModal = function () {
            _this.setState({ showModal: false });
        };
        return _this;
    }
    DetailEntityButton.prototype.render = function () {
        var _this = this;
        var _a = this.props, entity = _a.entity, entityId = _a.entityId, flow = _a.flow, key = _a.key, button = _a.button, modal = _a.modal, rest = __rest(_a, ["entity", "entityId", "flow", "key", "button", "modal"]);
        var _flow = flow || 'redirect';
        if (_flow === 'redirect') {
            return (React.createElement(Link, { to: entity.getDetailLink(entityId), key: key },
                React.createElement(Button, __assign({ htmlType: "button", icon: "search" }, button))));
        }
        if (_flow.type === 'modal') {
            var modal_1 = _flow.modal;
            return (React.createElement(Translation, { key: key }, function (t) { return (React.createElement(React.Fragment, null,
                React.createElement("div", { style: { position: 'absolute' } }, entity.getDetailView(entityId, __assign({ wrapperType: 'modal', modal: __assign({ title: t(entity.name + "._title", {
                            defaultValue: "" + entity.title
                        }), onCancel: _this.hideModal, footer: entity.getDetailButton(entityId, {
                            flow: 'redirect',
                            button: { icon: 'select' }
                        }), width: '80%' }, modal_1, { visible: _this.state.showModal, destroyOnClose: true }) }, rest))),
                React.createElement(Button, __assign({ icon: "search" }, button, { onClick: _this.showModal })))); }));
        }
        return "unexpected flow";
    };
    return DetailEntityButton;
}(React.Component));
export { DetailEntityButton };
//# sourceMappingURL=EntityDetailButton.js.map