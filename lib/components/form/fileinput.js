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
import * as React from 'react';
import * as numeral from 'numeral';
import { Button, Icon, Upload } from 'antd';
import { AuthSession } from 'webpanel-auth';
import { ResourceLayer } from 'webpanel-data';
var FileInput = /** @class */ (function (_super) {
    __extends(FileInput, _super);
    function FileInput(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { value: props.value || null };
        return _this;
    }
    FileInput.getDerivedStateFromProps = function (props) {
        var state = { value: null };
        if ('value' in props) {
            state.value = props.value || null;
        }
        return state;
    };
    FileInput.prototype.fileChangeHandler = function (file) {
        if (file.status === 'done') {
            this.udpateValue(file.response);
        }
    };
    FileInput.prototype.udpateValue = function (file) {
        this.setState({ value: file && file.id });
        if (this.props.onChange) {
            this.props.onChange((file && file.id) || null);
        }
    };
    FileInput.prototype.renderFile = function () {
        var value = this.state.value;
        var entity = this.props.entity;
        if (!value)
            return null;
        return (React.createElement(ResourceLayer, { name: "File", id: value, dataSource: entity.dataSource, fields: ['url', 'name', 'size'], render: function (_a) {
                var data = _a.data;
                return (data && (React.createElement("a", { target: "_blank", href: data.url + "?access_token=" + AuthSession.current().accessToken },
                    data.name,
                    " (",
                    numeral(data.size).format('0.0 b'),
                    ")"))) ||
                    null;
            } }));
        // return value;
        // if (!file) {
        //   return null;
        // }
        // return (
        //   <a
        //     target="_blank"
        //     href={`${file.url}?access_token=${AuthSession.current().accessToken}`}
        //   >
        //     {file.name} ({numeral(file.size).format('0.0 b')})
        //   </a>
        // );
    };
    FileInput.prototype.clearValue = function () {
        this.setState({ value: null });
    };
    FileInput.prototype.render = function () {
        var _this = this;
        var value = this.state.value;
        var fileUploadURL = this.props.uploadURL;
        var accessToken = AuthSession.current().accessToken;
        var headers = {};
        if (accessToken) {
            headers.authorization = "Bearer " + accessToken;
        }
        return value ? (React.createElement(React.Fragment, null,
            this.renderFile(),
            React.createElement(Button, { icon: "cross", onClick: function () { return _this.udpateValue(null); }, size: "small" }))) : (React.createElement(Upload, { action: fileUploadURL, onChange: function (_a) {
                var file = _a.file;
                return _this.fileChangeHandler(file);
            }, headers: headers },
            React.createElement(Button, null,
                React.createElement(Icon, { type: "upload" }),
                " Upload")));
    };
    return FileInput;
}(React.Component));
export { FileInput };
//# sourceMappingURL=fileinput.js.map