import * as React from 'react';
import { ILayoutProps } from './components/layout';
import { IAutopermissionConfig } from './model/permissions';
import { AuthProps } from 'webpanel-auth/lib/Auth';
import { DummyAuthProps } from 'webpanel-auth/lib/DummyAuth';
import { Entity } from './model/Entity';
export { Entity } from './model/Entity';
export { Layout } from 'webpanel-antd';
export * from './layout-builder';
export { AdminLayout, ILayoutProps } from './components/layout';
export { getRelationshipFilterDropdownInput } from './model/fields/EntityFieldRelationship';
export interface IAdminProps extends ILayoutProps {
    auth?: AuthProps | DummyAuthProps;
    autopermissions?: IAutopermissionConfig | boolean;
    logoURL?: string;
    logoCollapsedURL?: string;
    loggedInContentWrapper?: (content: React.ReactNode) => React.ReactNode;
}
export declare class Admin extends React.Component<IAdminProps> {
    static Entity: typeof Entity;
    render(): React.ReactNode;
}
