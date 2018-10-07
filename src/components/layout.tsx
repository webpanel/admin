import * as React from 'react';

import { Entity } from '../model/Entity';
import { Layout } from 'webpanel-antd';
import { LayoutProps } from 'webpanel-antd/lib/layout/Layout';

export interface ILayoutProps extends LayoutProps {
  entities: Entity[];
}

export class AdminLayout extends React.Component<ILayoutProps> {
  render() {
    const { entities, ...props } = this.props;
    return (
      <Layout {...props}>
        <Layout.Menu>{entities.map(x => x.menuItem())}</Layout.Menu>
        <Layout.Structure>
          {entities.map(x => x.structureItem())}
        </Layout.Structure>
      </Layout>
    );
  }
}
