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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
import { Form, Spin, message } from "antd";
import { resolveOptionalThunk } from "ts-thunk";
import { PageNotFound } from "../pages/not-found";
import { ResourceFormPageButtons } from "./buttons";
import { useTranslation } from "react-i18next";
export var isEntityEditFormProps = function (props) {
    return typeof props.resourceID !== "undefined";
};
export var EntityForm = function (props) {
    var t = useTranslation("webpanel-admin").t;
    var formRef = props.formRef, onSave = props.onSave, onValuesChanged = props.onValuesChanged, showButtons = props.showButtons, form = props.form;
    var formInstance = Form.useForm()[0];
    var _a = React.useState(false), saving = _a[0], setSaving = _a[1];
    if (formRef) {
        formRef.current = formInstance;
    }
    var handleFormSuccess = function (resource) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            message.success(t("formSaved"));
            if (onSave) {
                onSave(resource.id || 0);
            }
            return [2 /*return*/];
        });
    }); };
    var resourceID = undefined;
    if (isEntityEditFormProps(props)) {
        resourceID = props.resourceID;
    }
    var entity = props.entity, initialValues = props.initialValues, fields = props.fields;
    var entityFields = entity
        .getEditFields(resourceID)
        .filter(function (f) { return f && f.fetchField() && f.writeable; });
    var _fields = resolveOptionalThunk(fields);
    if (typeof _fields !== "undefined") {
        entityFields = _fields
            .map(function (f) {
            if (typeof f === "string") {
                return entity.getFieldOrFail(f);
            }
            else if (f === null || f.field === null) {
                return null;
            }
            return entity.getFieldOrFail(f.field);
        })
            .filter(function (x) { return x; });
    }
    var resource = entity.useResource({
        id: resourceID,
        initialValues: initialValues,
        fields: entityFields
            .filter(function (f) { return f && f.fetchField() && f.writeable; })
            .map(function (f) { return f.editFetchField(); })
            .filter(function (f) { return f; }),
    });
    if (!resource.loading && resource.data === null) {
        return React.createElement(PageNotFound, null);
    }
    var content = entity.getCardLayout("edit", {
        entity: entity,
        resource: resource,
        formInstance: formInstance,
        id: resourceID,
        data: resource.data,
        fields: fields,
    });
    return (React.createElement(Form, __assign({ key: JSON.stringify(resource.data), form: formInstance, onFinish: function (values) { return __awaiter(void 0, void 0, void 0, function () {
            var err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        setSaving(true);
                        return [4 /*yield*/, resource.save(values)];
                    case 1:
                        _a.sent();
                        handleFormSuccess(resource);
                        return [3 /*break*/, 4];
                    case 2:
                        err_1 = _a.sent();
                        message.error(t("formSaveFailed") + err_1.message);
                        return [3 /*break*/, 4];
                    case 3:
                        setSaving(false);
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        }); }, onValuesChange: onValuesChanged, layout: "vertical", initialValues: resource.data }, form),
        React.createElement(Spin, { spinning: (resource.loading && !resource.polling) || saving },
            content,
            showButtons && (React.createElement(ResourceFormPageButtons, { saving: saving, 
                // submit={() => formRefLocal?.current?.submit()}
                reset: function () { return formInstance.resetFields(); } })))));
};
//# sourceMappingURL=entity-form.js.map