import * as React from 'react';

import { Button, Popconfirm, Form, Menu, Dropdown, Icon } from 'antd';
import { ClickParam } from 'antd/lib/menu';

export type SaveOption = 'edit' | 'add';

export interface ResourceFormButtonsProps {
  hasChanges: boolean;
  handleSave: (option: SaveOption) => void;
  handleReset: () => void;
}

export class ResourceFormPageButtons extends React.Component<
  ResourceFormButtonsProps
> {
  render() {
    const { handleReset, handleSave, hasChanges } = this.props;

    const menu = (
      <Menu onClick={(e: ClickParam) => handleSave(e.key as SaveOption)}>
        <Menu.Item key="edit">Save and continue editing</Menu.Item>
        <Menu.Item key="add">Save and add new</Menu.Item>
      </Menu>
    );

    return (
      <Form.Item
        wrapperCol={{
          xs: { span: 24, offset: 0 },
          sm: { span: 16, offset: 8 }
        }}
      >
        <Dropdown disabled={!hasChanges} overlay={menu}>
          <Button type="primary" htmlType="submit">
            Save <Icon type="down" />
          </Button>
        </Dropdown>
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
