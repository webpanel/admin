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
import { Button, Upload, message } from "antd";
import { CloseOutlined, UploadOutlined } from "@ant-design/icons";
import { resolveOptionalThunk } from "ts-thunk";
import { ResourceLayer } from "webpanel-data";
import { UploadRequest } from "./upload-request";
var FileInput = /** @class */ (function (_super) {
    __extends(FileInput, _super);
    function FileInput(props) {
        var _this = _super.call(this, props) || this;
        _this.openItem = function (hostURL, id, token) { return __awaiter(_this, void 0, void 0, function () {
            var url, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        return [4 /*yield*/, fetch(hostURL + "/" + id, {
                                method: "GET",
                                headers: { Authorization: "Bearer " + token },
                            })
                                .then(function (res) { return res.json(); })
                                .then(function (json) { return json.url; })];
                    case 1:
                        url = _a.sent();
                        window.open(url, "_blank");
                        return [3 /*break*/, 4];
                    case 2:
                        err_1 = _a.sent();
                        message.error(err_1.message);
                        return [3 /*break*/, 4];
                    case 3: return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        _this.state = { value: props.value || null };
        return _this;
    }
    FileInput.getDerivedStateFromProps = function (props) {
        var state = { value: null };
        if ("value" in props) {
            state.value = props.value || null;
        }
        return state;
    };
    FileInput.prototype.componentDidMount = function () {
        var _this = this;
        var accessToken = this.props.accessToken;
        var loadToken = function () { return __awaiter(_this, void 0, void 0, function () {
            var token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, resolveOptionalThunk(accessToken)];
                    case 1:
                        token = _a.sent();
                        if (token) {
                            this.setState({ accessToken: token });
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        loadToken();
    };
    FileInput.prototype.fileChangeHandler = function (file) {
        if (file.status === "done") {
            this.udpateValue(file.response);
        }
    };
    FileInput.prototype.udpateValue = function (file) {
        this.setState({ value: file && (file.id || file.ID) });
        if (this.props.onChange) {
            this.props.onChange((file && (file.id || file.ID)) || null);
        }
    };
    FileInput.prototype.renderFile = function () {
        var _this = this;
        var _a = this.state, value = _a.value, accessToken = _a.accessToken;
        var _b = this.props, entity = _b.entity, hostURL = _b.hostURL;
        if (!value) {
            return null;
        }
        return (React.createElement(ResourceLayer, { name: "File", id: value, dataSource: entity.dataSource, fields: ["name", "size"], render: function (_a) {
                var data = _a.data;
                return (data && (React.createElement(Button, { size: "small", onClick: function () {
                        return hostURL && _this.openItem(hostURL, value, accessToken);
                    } },
                    data.name,
                    " (",
                    numeral(data.size).format("0.0 b"),
                    ")"))) ||
                    null;
            } }));
    };
    FileInput.prototype.clearValue = function () {
        this.setState({ value: null });
    };
    FileInput.prototype.render = function () {
        var _this = this;
        var _a = this.state, value = _a.value, accessToken = _a.accessToken;
        var fileUploadURL = this.props.uploadURL;
        var headers = {};
        if (accessToken) {
            headers.authorization = "Bearer " + accessToken;
        }
        return value ? (React.createElement(React.Fragment, null,
            this.renderFile(),
            React.createElement(Button, { icon: React.createElement(CloseOutlined, null), onClick: function () { return _this.udpateValue(null); }, size: "small" }))) : (React.createElement(Upload, { action: fileUploadURL, onChange: function (_a) {
                var file = _a.file;
                return _this.fileChangeHandler(file);
            }, headers: headers, customRequest: UploadRequest },
            React.createElement(Button, null,
                React.createElement(UploadOutlined, null),
                " Upload")));
    };
    return FileInput;
}(React.Component));
export { FileInput };
//# sourceMappingURL=fileinput.js.map