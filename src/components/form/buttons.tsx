import * as React from "react";

import { Button, Form, Popconfirm } from "antd";

export type SaveOption = "edit" | "add";

export interface ResourceFormButtonsProps {
  hasChanges: boolean;
  handleReset: () => void;
}

export class ResourceFormPageButtons extends React.Component<
  ResourceFormButtonsProps
> {
  render(): React.ReactNode {
    const { handleReset, hasChanges } = this.props;
    return (
      <Form.Item
        wrapperCol={{
          xs: { span: 24, offset: 0 },
          sm: { span: 16, offset: 8 },
        }}
      >
        <Button type="primary" htmlType="submit">
          Save
        </Button>
        <Popconfirm
          title="Reset?"
          cancelText="No"
          okText="Yes"
          onConfirm={handleReset}
        >
          <Button disabled={!hasChanges} style={{ marginLeft: 8 }}>
            Reset
          </Button>
        </Popconfirm>
      </Form.Item>
    );
  }
}
