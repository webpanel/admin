import * as React from "react";

import { Button, Form } from "antd";

export interface ResourceFormButtonsProps {
  saving?: boolean;
  submit?: () => void;
  reset?: () => void;
}

export const ResourceFormPageButtons = (props: ResourceFormButtonsProps) => {
  const { saving, reset, submit } = props;
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
        Save
      </Button>
      <Button style={{ marginLeft: 8 }} onClick={reset}>
        Reset
      </Button>
    </Form.Item>
  );
};
