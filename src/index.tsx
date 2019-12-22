import * as React from "react";

import { AdminLayout, ILayoutProps } from "./components/layout";
import {
  Auth,
  AuthContentProps,
  AuthFormProps,
  AuthProps,
  DummyAuth
} from "webpanel-auth";
import { Button, Result, Spin } from "antd";
import {
  IAutopermissionConfig,
  configurePermissions
} from "./model/permissions";

import { Entity } from "./model/Entity";
import { LoginForm } from "webpanel-antd";

export { Entity } from "./model/Entity";
export { Layout } from "webpanel-antd";
export * from "./layout-builder";
export { AdminLayout, ILayoutProps } from "./components/layout";
export { getRelationshipFilterDropdownInput } from "./model/fields/EntityFieldRelationship";

export interface IAdminProps extends ILayoutProps {
  auth?: AuthProps;
  autopermissions?: IAutopermissionConfig | boolean;
  logoURL?: string;
  logoCollapsedURL?: string;
  loggedInContentWrapper?: (content: React.ReactNode) => React.ReactNode;
}

export class Admin extends React.Component<IAdminProps> {
  static Entity = Entity;

  render(): React.ReactNode {
    let {
      auth,
      entities,
      menuItems,
      structureItems,
      autopermissions,
      loggedInContentWrapper,
      ...restProps
    } = this.props;

    configurePermissions(autopermissions);

    if (!auth) {
      return <AdminLayout entities={entities} logout={() => {}} />;
    }

    const _loggedInContentWrapper = loggedInContentWrapper || (x => x);

    let content = (props: AuthContentProps): React.ReactNode =>
      _loggedInContentWrapper(
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

    const _auth = auth as AuthProps;
    return _auth.type === "dummy" ? (
      <DummyAuth {..._auth} children={content} form={form} />
    ) : (
      <Auth
        {..._auth}
        children={content}
        form={form}
        processing={() => <Spin style={{ width: "100%", marginTop: 80 }} />}
        failed={({ error, logout }) => (
          <Result
            status="403"
            title={error.message}
            subTitle={`${error.description}`}
            extra={
              <Button type="primary" onClick={logout}>
                Logout
              </Button>
            }
          />
        )}
      />
    );
  }
}
