import * as React from 'react';

import { Button } from 'antd';
import { Entity } from '../../model/Entity';
import { Link } from 'webpanel-antd';
import { RowProps } from 'antd/lib/row';

export interface LayoutEditButtonInternalProps extends RowProps {
  entity: Entity;
  data: any;
}

export class LayoutBuilderEditButton extends React.Component<
  LayoutEditButtonInternalProps
> {
  render(): React.ReactNode {
    const { entity, data } = this.props;
    return (
      <Link to={entity.getEditLink(data.id)}>
        <Button size="small" htmlType="button" icon="edit" />
      </Link>
    );
  }
}
