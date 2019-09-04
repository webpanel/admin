import * as React from 'react';

import { Thunk, resolveOptionalThunk } from 'ts-thunk';

import { Entity } from '../model/Entity';
import { HeaderConfig } from 'webpanel-antd/lib/layout/Header';
import { Layout } from 'webpanel-antd';
import { LayoutProps } from 'webpanel-antd/lib/layout/Layout';
import { MenuConfig } from 'webpanel-antd/lib/layout/Menu';

export interface ILayoutProps {
  entities?: Thunk<Entity[]>;
  menuItems?: Thunk<React.ReactNode[]>;
  structureItems?: Thunk<React.ReactNode[]>;
  header?: HeaderConfig;
  menu?: MenuConfig;
}

export class AdminLayout extends React.Component<ILayoutProps & LayoutProps> {
  render(): React.ReactNode {
    const { entities, menuItems, structureItems, menu, ...props } = this.props;

    const _menuItems =
      resolveOptionalThunk(menuItems) ||
      (resolveOptionalThunk(entities) || [])
        .filter(x => x.enabled)
        .map(x => x.menuItem());

    return (
      <Layout {...props}>
        {_menuItems.length > 0 && (
          <Layout.Menu {...menu}>{_menuItems}</Layout.Menu>
        )}
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
