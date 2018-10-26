import * as React from 'react';

import { Entity } from '../model/Entity';
import { Layout } from 'webpanel-antd';
import { LayoutProps } from 'webpanel-antd/lib/layout/Layout';

export interface ILayoutProps extends LayoutProps {
  entities?: Entity<any>[];
  menuItems?: React.ReactNode[];
  structureItems?: React.ReactNode[];
}

export class AdminLayout extends React.Component<ILayoutProps> {
  render() {
    const { entities, menuItems, structureItems, ...props } = this.props;
    return (
      <Layout {...props}>
        <Layout.Menu>
          {menuItems ||
            (entities || []).filter(x => x.enabled).map(x => x.menuItem())}
        </Layout.Menu>
        <Layout.Structure>
          {structureItems ||
            (entities || []).filter(x => x.enabled).map(x => x.structureItem())}
        </Layout.Structure>
      </Layout>
    );
  }
}
