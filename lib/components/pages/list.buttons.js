import * as React from "react";
import { EditOutlined, SearchOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { Link } from "webpanel-antd";
export var detailListButton = function (props, size) { return (React.createElement(Link, { key: "detail-button-action", to: props.entity.getDetailLink(props.resourceID) },
    React.createElement(Button, { size: size == "small" ? "small" : undefined, icon: React.createElement(SearchOutlined, null) }))); };
export var editListButton = function (props, size) { return (React.createElement(Link, { key: "edit-button-action", to: props.entity.getEditLink(props.resourceID) },
    React.createElement(Button, { size: size == "small" ? "small" : undefined, icon: React.createElement(EditOutlined, null) }))); };
//# sourceMappingURL=list.buttons.js.map