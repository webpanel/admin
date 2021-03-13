import * as React from "react";
import { Button, Result } from "antd";
import { Link } from "react-router-dom";
export var PageNotFound = function () {
    return (React.createElement(Result, { status: "404", title: "Not found", subTitle: "Check page address or contact tech assistance", extra: React.createElement(Link, { to: "/" },
            React.createElement(Button, { type: "primary" }, "Home")) }));
};
//# sourceMappingURL=not-found.js.map