import * as React from "react";

import { Button, Result } from "antd";

import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const PageNotFound = () => {
  const { t } = useTranslation("webpanel-admin");
  return (
    <Result
      status="404"
      title={t("notFoundPageTitle")}
      subTitle={t("notFoundPageSubTitle")}
      extra={
        <Link to="/">
          <Button type="primary">{t("notFoundPageHome")}</Button>
        </Link>
      }
    />
  );
};
