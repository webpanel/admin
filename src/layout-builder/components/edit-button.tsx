import * as React from 'react';
import { Button } from 'antd';
import { RowProps } from 'antd/lib/row';
import { Link } from 'webpanel-antd';
import { Entity } from '../../model/Entity';

export interface LayoutEditButtonInternalProps extends RowProps {
  entity: Entity<any>;
  data: any;
}

export class LayoutBuilderEditButton extends React.Component<
  LayoutEditButtonInternalProps
> {
  render() {
    const { entity, data } = this.props;
    return (
      <Link to={`/${entity.structureName}/${data.id}/edit`}>
        <Button size="small" htmlType="button" icon="edit" />
      </Link>
    );
  }
}
