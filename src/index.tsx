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
import { AdminLayout } from './components/layout';

export { Entity } from './model/Entity';

export interface IAdminProps {
  auth?: (AuthProps | DummyAuthProps) & {
    type: 'dummy' | 'oauth';
  };
  entities: Entity<any>[];
}

export class Admin extends React.Component<IAdminProps> {
  static Entity = Entity;

  render() {
    const { auth, entities } = this.props;

    if (!auth) {
      return <AdminLayout entities={entities} logout={() => {}} />;
    }
    const AuthComp = auth.type === 'dummy' ? DummyAuth : Auth;

    return (
      <AuthComp
        {...auth}
        content={(props: AuthContentProps) => (
          <AdminLayout entities={entities} {...props} />
        )}
        form={(props: AuthFormProps) => <LoginForm authorizationInfo={props} />}
      />
    );
  }
}
