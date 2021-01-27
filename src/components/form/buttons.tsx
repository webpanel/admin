import * as React from "react";

import { Button, Form } from "antd";

export type SaveOption = "edit" | "add";

export interface ResourceFormButtonsProps {
  reset: () => void;
}

export const ResourceFormPageButtons = (props: ResourceFormButtonsProps) => {
  const { reset: handleReset } = props;

  return (
    <Form.Item
      key="form-buttons"
      wrapperCol={{
        xs: { span: 24, offset: 0 },
        sm: { span: 16, offset: 8 },
      }}
    >
      <Button type="primary" htmlType="submit">
        Save
      </Button>
      <Button style={{ marginLeft: 8 }} onClick={handleReset}>
        Reset
      </Button>
    </Form.Item>
  );
};
