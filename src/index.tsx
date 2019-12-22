import * as React from "react";

import { AdminLayout, ILayoutProps } from "./components/layout";
import {
  Auth,
  AuthContentProps,
  AuthFormProps,
  DummyAuth
} from "webpanel-auth";
import { Button, Result, Spin } from "antd";
import {
  IAutopermissionConfig,
  configurePermissions
} from "./model/permissions";

import { DummyAuthProps } from "webpanel-auth/lib/DummyAuth";
import { Entity } from "./model/Entity";
import { LoginForm } from "webpanel-antd";
import { OAuth2AuthProps } from "webpanel-auth/lib/Auth";

export { Entity } from "./model/Entity";
export { Layout } from "webpanel-antd";
export * from "./layout-builder";
export { AdminLayout, ILayoutProps } from "./components/layout";
export { getRelationshipFilterDropdownInput } from "./model/fields/EntityFieldRelationship";

export interface IAdminProps extends ILayoutProps {
  auth?: OAuth2AuthProps | DummyAuthProps;
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

    return auth.type === "dummy" ? (
      <DummyAuth {...auth} content={content} form={form} />
    ) : (
      <Auth
        {...auth}
        content={content}
        form={form}
        processing={() => <Spin />}
        failed={({ error, logout }) => (
          <Result
            status="403"
            title="403"
            subTitle={`${error.message}`}
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
