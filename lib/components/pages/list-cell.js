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
import { Button, Col, Popover, Row, message } from "antd";
import { EditOutlined, LoadingOutlined, SaveOutlined } from "@ant-design/icons";
export var ListCell = function (props) {
    var _a = React.useState(), currentValue = _a[0], setCurrentvalue = _a[1];
    var _b = React.useState(undefined), value = _b[0], setValue = _b[1];
    var _c = React.useState(false), saving = _c[0], setSaving = _c[1];
    var _d = React.useState(false), editing = _d[0], setEditing = _d[1];
    var save = function (value) { return __awaiter(void 0, void 0, void 0, function () {
        var collection, field, values, data, item;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    collection = props.collection, field = props.field, values = props.values;
                    setSaving(true);
                    data = {};
                    data[field.columnName()] = value;
                    return [4 /*yield*/, collection.patchItemValues(values.id, data)];
                case 1:
                    item = _a.sent();
                    setSaving(false);
                    setCurrentvalue(field.render(item.data, { size: "small" }));
                    return [2 /*return*/];
            }
        });
    }); };
    var values = props.values, field = props.field, editable = props.editable;
    return (React.createElement(React.Fragment, null,
        currentValue || field.render(values, { size: "small" }),
        editable ? (React.createElement(Popover, { content: React.createElement("div", null,
                React.createElement(Row, { gutter: [8, 8] },
                    React.createElement(Col, { flex: "auto", style: { width: 250 } }, field.inputElement({
                        value: value || values[field.columnName()],
                        onChange: function (value, valueElement) { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                setValue(value);
                                return [2 /*return*/];
                            });
                        }); },
                        values: values,
                    })),
                    React.createElement(Col, { flex: "32px" },
                        React.createElement(Button, { icon: React.createElement(SaveOutlined, null), type: "primary", onClick: function () { return __awaiter(void 0, void 0, void 0, function () {
                                var err_1;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            _a.trys.push([0, 2, 3, 4]);
                                            return [4 /*yield*/, save(value)];
                                        case 1:
                                            _a.sent();
                                            setValue(undefined);
                                            return [3 /*break*/, 4];
                                        case 2:
                                            err_1 = _a.sent();
                                            message.error(err_1.message);
                                            return [3 /*break*/, 4];
                                        case 3:
                                            setEditing(false);
                                            return [7 /*endfinally*/];
                                        case 4: return [2 /*return*/];
                                    }
                                });
                            }); } })))), trigger: "click", onVisibleChange: function (visible) {
                setEditing(visible);
                if (!visible) {
                    setValue(undefined);
                }
            }, visible: editing }, saving ? (React.createElement(LoadingOutlined, null)) : (React.createElement(Button, { shape: "circle", icon: React.createElement(EditOutlined, null), size: "small", className: "no-print", style: { marginLeft: "10px" }, onClick: function () { return setEditing(true); } })))) : null));
};
//# sourceMappingURL=list-cell.js.map