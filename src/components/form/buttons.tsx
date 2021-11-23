import * as React from "react";

import { Button, Form } from "antd";

import { useTranslation } from "react-i18next";

export interface ResourceFormButtonsProps {
  saving?: boolean;
  submit?: () => void;
  reset?: () => void;
}

export const ResourceFormPageButtons = (props: ResourceFormButtonsProps) => {
  const { saving, reset, submit } = props;
  const { t } = useTranslation("webpanel-admin");
  return (
    <Form.Item
      key="form-buttons"
      wrapperCol={{
        xs: { span: 24, offset: 0 },
        sm: { span: 16, offset: 8 },
      }}
    >
      <Button
        type="primary"
        loading={saving}
        onClick={submit}
        htmlType={typeof submit === "undefined" ? "submit" : undefined}
      >
        {t("save")}
      </Button>
      <Button style={{ marginLeft: 8 }} onClick={reset}>
        {t("reset")}
      </Button>
    </Form.Item>
  );
};
