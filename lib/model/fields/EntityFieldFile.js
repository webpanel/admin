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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import * as React from "react";
import * as numeral from "numeral";
import { EntityField, } from "../EntityField";
import { resolveOptionalThunk } from "ts-thunk";
import { FileInput } from "../../components/form/fileinput";
import { message } from "antd";
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
    EntityFieldFile.prototype.openItem = function (hostURL, id, accessToken) {
        return __awaiter(this, void 0, void 0, function () {
            var token, url, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, accessToken];
                    case 1:
                        token = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, 5, 6]);
                        return [4 /*yield*/, fetch(hostURL + "/" + id, {
                                method: "GET",
                                headers: { Authorization: "Bearer " + token },
                            })
                                .then(function (res) { return res.json(); })
                                .then(function (json) { return json.url; })];
                    case 3:
                        url = _a.sent();
                        window.open(url, "_blank");
                        return [3 /*break*/, 6];
                    case 4:
                        err_1 = _a.sent();
                        message.error(err_1.message);
                        return [3 /*break*/, 6];
                    case 5: return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(EntityFieldFile.prototype, "render", {
        get: function () {
            var _this = this;
            var _a = this.config, render = _a.render, accessToken = _a.accessToken, hostURL = _a.hostURL;
            return function (values) {
                var value = values[_this.name];
                if (!value || !hostURL) {
                    return "–";
                }
                return ((render && render(value)) || (React.createElement("a", { href: "#", onClick: function () {
                        return _this.openItem(hostURL, value.id, resolveOptionalThunk(accessToken));
                    } },
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