import * as React from "react";

import { Button, Form } from "antd";

export type SaveOption = "edit" | "add";

export interface ResourceFormButtonsProps {
  reset: () => void;
  submit: () => Promise<void>;
}

export const ResourceFormPageButtons = (props: ResourceFormButtonsProps) => {
  const { reset: handleReset, submit: handleSave } = props;
  const [saving, setSaving] = React.useState(false);
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
        htmlType="submit"
        loading={saving}
        onClick={async () => {
          setSaving(true);
          try {
            await handleSave();
          } finally {
            setSaving(false);
          }
        }}
      >
        Save
      </Button>
      <Button style={{ marginLeft: 8 }} onClick={handleReset} htmlType="reset">
        Reset
      </Button>
    </Form.Item>
  );
};
