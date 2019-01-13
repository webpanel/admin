import * as React from 'react';

import { Entity } from '../model/Entity';
import { Layout } from 'webpanel-antd';
import { LayoutProps } from 'webpanel-antd/lib/layout/Layout';
import { Thunk, resolveOptionalThunk } from 'ts-thunk';
import { HeaderConfig } from 'webpanel-antd/lib/layout/Header';

export interface ILayoutProps {
  entities?: Thunk<Entity<any>[]>;
  menuItems?: Thunk<React.ReactNode[]>;
  structureItems?: Thunk<React.ReactNode[]>;
  header?: HeaderConfig;
}

export class AdminLayout extends React.Component<ILayoutProps & LayoutProps> {
  render() {
    const { entities, menuItems, structureItems, ...props } = this.props;
    return (
      <Layout {...props}>
        <Layout.Menu>
          {resolveOptionalThunk(menuItems) ||
            (resolveOptionalThunk(entities) || [])
              .filter(x => x.enabled)
              .map(x => x.menuItem())}
        </Layout.Menu>
        <Layout.Structure>
          {resolveOptionalThunk(structureItems) ||
            (resolveOptionalThunk(entities) || [])
              .filter(x => x.enabled)
              .map(x => x.structureItem())}
        </Layout.Structure>
      </Layout>
    );
  }
}
