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
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import * as React from 'react';
import { Row } from 'antd';
import '../../../styles/layout-row.css';
var LayoutBuilderRow = /** @class */ (function (_super) {
    __extends(LayoutBuilderRow, _super);
    function LayoutBuilderRow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LayoutBuilderRow.prototype.render = function () {
        var _a = this.props, children = _a.children, props = __rest(_a, ["children"]);
        props.gutter = props.gutter || 8;
        props.style = props.style || {};
        props.style.marginBottom = props.style.marginBottom || '8px';
        return (React.createElement(Row, __assign({}, props, { className: 'butter-wrapper' }), children));
    };
    return LayoutBuilderRow;
}(React.Component));
export { LayoutBuilderRow };
//# sourceMappingURL=row.js.map