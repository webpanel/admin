import * as React from "react";

import { Button, Result } from "antd";

import { Link } from "react-router-dom";

export const PageNotFound = () => {
  return (
    <Result
      status="404"
      title="Not found"
      subTitle="Check page address or contact tech assistance"
      extra={
        <Link to="/">
          <Button type="primary">Home</Button>
        </Link>
      }
    />
  );
};
