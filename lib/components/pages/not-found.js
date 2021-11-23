import * as React from "react";
import { Button, Result } from "antd";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
export var PageNotFound = function () {
    var t = useTranslation("webpanel-admin").t;
    return (React.createElement(Result, { status: "404", title: t("notFoundPageTitle"), subTitle: t("notFoundPageSubTitle"), extra: React.createElement(Link, { to: "/" },
            React.createElement(Button, { type: "primary" }, t("notFoundPageHome"))) }));
};
//# sourceMappingURL=not-found.js.map