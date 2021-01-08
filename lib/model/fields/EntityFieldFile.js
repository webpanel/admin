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
import * as React from "react";
import * as numeral from "numeral";
import { EntityField, } from "../EntityField";
import { resolveOptionalThunk } from "ts-thunk";
import { FileInput } from "../../components/form/fileinput";
// This entity field is tied with usage of https://github.com/graphql-services/graphql-files
var EntityFieldFile = /** @class */ (function (_super) {
    __extends(EntityFieldFile, _super);
    function EntityFieldFile() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EntityFieldFile.prototype.fetchField = function () {
        return this.name + " { id name size }";
    };
    EntityFieldFile.prototype.columnName = function () {
        return this.name + "Id";
    };
    Object.defineProperty(EntityFieldFile.prototype, "render", {
        get: function () {
            var _this = this;
            var _a = this.config, render = _a.render, accessToken = _a.accessToken;
            return function (values) {
                var value = values[_this.name];
                if (!value) {
                    return "–";
                }
                var url = value.url;
                var token = resolveOptionalThunk(accessToken);
                if (token) {
                    url += "?access_token=" + token;
                }
                return ((render && render(value)) || (React.createElement("a", { target: "_blank", href: url },
                    value.name,
                    " (",
                    numeral(value.size).format("0.0 b"),
                    ")")));
            };
        },
        enumerable: true,
        configurable: true
    });
    EntityFieldFile.prototype.inputElement = function (props) {
        var accessToken = this.config.accessToken;
        var onChange = props && props.onChange;
        var onChangeProp = onChange
            ? function (value) { return onChange(value, value); }
            : undefined;
        return (React.createElement(FileInput, __assign({ entity: this.entity, hostURL: this.config.hostURL, uploadURL: this.config.uploadURL, key: "text_field_" + this.entity.name + "_" + this.valuePropName, accessToken: accessToken }, props, { onChange: onChangeProp })));
    };
    return EntityFieldFile;
}(EntityField));
export { EntityFieldFile };
//# sourceMappingURL=EntityFieldFile.js.map