import * as React from 'react';

import { AdminLayout, ILayoutProps } from './components/layout';
import {
  Auth,
  AuthContentProps,
  AuthFormProps,
  DummyAuth
} from 'webpanel-auth';
import {
  IAutopermissionConfig,
  configurePermissions
} from './model/permissions';

import { AuthProps } from 'webpanel-auth/lib/Auth';
import { DummyAuthProps } from 'webpanel-auth/lib/DummyAuth';
import { Entity } from './model/Entity';
import { LoginForm } from 'webpanel-antd';

export { Entity } from './model/Entity';
export { DataGrid } from './components/data-grid';
export { Layout } from 'webpanel-antd';
export * from './layout-builder';
export { AdminLayout, ILayoutProps } from './components/layout';

export interface IAdminProps extends ILayoutProps {
  auth?: AuthProps | DummyAuthProps;
  autopermissions?: IAutopermissionConfig | boolean;
  logoURL?: string;
  logoCollapsedURL?: string;
}

export class Admin extends React.Component<IAdminProps> {
  static Entity = Entity;

  render(): React.ReactNode {
    const {
      auth,
      entities,
      menuItems,
      structureItems,
      autopermissions,
      ...restProps
    } = this.props;

    configurePermissions(autopermissions);

    if (!auth) {
      return <AdminLayout entities={entities} logout={() => {}} />;
    }

    const content = (props: AuthContentProps) => (
      <AdminLayout
        entities={entities}
        menuItems={menuItems}
        structureItems={structureItems}
        {...props}
        {...restProps}
      />
    );

    const form = (props: AuthFormProps) => (
      <LoginForm authorizationInfo={props} />
    );

    return auth.type === 'dummy' ? (
      <DummyAuth {...auth} content={content} form={form} />
    ) : (
      <Auth {...auth} content={content} form={form} />
    );
  }
}
