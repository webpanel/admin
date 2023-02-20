var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
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
var UploadError = /** @class */ (function (_super) {
    __extends(UploadError, _super);
    function UploadError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return UploadError;
}(Error));
function getError(options, xhr) {
    var msg = "cannot ".concat(options.action, " ").concat(xhr.status, "'");
    var err = new UploadError(msg);
    err.status = xhr.status;
    err.url = options.action;
    return err;
}
function getBody(xhr) {
    var text = xhr.responseText || xhr.response;
    if (!text) {
        return text;
    }
    try {
        return JSON.parse(text);
    }
    catch (e) {
        return text;
    }
}
// interface UploadOptions {
//   onProgress: (event: { percent: number }) => void;
//   onError: (event: UploadError, body?: Object) => void;
//   onSuccess: (body: Object, xhr: XMLHttpRequest) => void;
//   method: string;
//   data: Object;
//   filename: string;
//   file: File;
//   withCredentials: boolean;
//   action: string;
//   headers: Headers;
// }
var getFileObject = function (options) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, fetch(options.action, {
                method: "POST",
                body: JSON.stringify({
                    filename: options.file.name,
                    size: options.file.size,
                    contentType: options.file.type,
                }),
                headers: __assign(__assign({}, options.headers), { "Content-Type": "application/json" }),
            }).then(function (res) { return res.json(); })];
    });
}); };
export function UploadRequest(options) {
    var xhr = new XMLHttpRequest();
    var fileObject;
    if (options.onProgress && xhr.upload) {
        xhr.upload.onprogress = function progress(e) {
            var event = __assign(__assign({}, e), { percent: 0 });
            if (e.total > 0) {
                event.percent = (e.loaded / e.total) * 100;
            }
            if (options.onProgress) {
                options.onProgress(event);
            }
        };
    }
    xhr.onerror = function error(e) {
        if (options.onError) {
            options.onError(getError(options, xhr), getBody(xhr));
        }
    };
    xhr.onload = function onload() {
        // allow success when 2xx status
        // see https://github.com/react-component/upload/issues/34
        if (xhr.status < 200 || xhr.status >= 300) {
            return (options.onError && options.onError(getError(options, xhr), getBody(xhr)));
        }
        options.onSuccess && options.onSuccess(fileObject);
    };
    getFileObject(options).then(function (fo) {
        fileObject = fo;
        xhr.open("PUT", fo.uploadURL, true);
        // Has to be after `.open()`. See https://github.com/enyo/dropzone/issues/179
        if (options.withCredentials && "withCredentials" in xhr) {
            xhr.withCredentials = true;
        }
        xhr.send(options.file);
    });
    return {
        abort: function () {
            xhr.abort();
        },
    };
}
//# sourceMappingURL=upload-request.js.map