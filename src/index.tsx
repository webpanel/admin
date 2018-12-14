import * as React from 'react';
import {
  Auth,
  DummyAuth,
  AuthContentProps,
  AuthFormProps
} from 'webpanel-auth';
import { AuthProps } from 'webpanel-auth/lib/Auth';
import { DummyAuthProps } from 'webpanel-auth/lib/DummyAuth';
import { LoginForm } from 'webpanel-antd';

import { Entity } from './model/Entity';
import { AdminLayout, ILayoutProps } from './components/layout';
import {
  IAutopermissionConfig,
  configurePermissions
} from './model/permissions';

export { Entity } from './model/Entity';
export { DataGrid } from './components/data-grid';
export { Layout } from 'webpanel-antd';
export * from './layout-builder';

export interface IAdminProps extends ILayoutProps {
  auth?: AuthProps | DummyAuthProps;
  autopermissions?: IAutopermissionConfig | boolean;
}

export class Admin extends React.Component<IAdminProps> {
  static Entity = Entity;

  render() {
    const {
      auth,
      entities,
      menuItems,
      structureItems,
      autopermissions
    } = this.props;

    configurePermissions(autopermissions);

    if (!auth) {
      return <AdminLayout entities={entities} logout={() => {}} />;
    }
    const AuthComp = auth.type === 'dummy' ? DummyAuth : Auth;

    return (
      <AuthComp
        {...auth}
        content={(props: AuthContentProps) => (
          <AdminLayout
            entities={entities}
            menuItems={menuItems}
            structureItems={structureItems}
            {...props}
          />
        )}
        form={(props: AuthFormProps) => <LoginForm authorizationInfo={props} />}
      />
    );
  }
}
