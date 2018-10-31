import * as React from 'react';

import { Button, Popconfirm, Form, Menu, Dropdown } from 'antd';
import { ClickParam } from 'antd/lib/menu';
// import { FormContext } from 'webpanel-antd/lib/form/form/Form';
// import { RouteComponentProps } from 'react-router';

export type SaveOption = 'edit' | 'add' | 'default';

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
        <Dropdown.Button
          disabled={!hasChanges}
          type="primary"
          overlay={menu}
          onClick={() => handleSave('default')}
        >
          Save
        </Dropdown.Button>
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
