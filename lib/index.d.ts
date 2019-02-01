import * as React from 'react';
import { AuthProps } from 'webpanel-auth/lib/Auth';
import { DummyAuthProps } from 'webpanel-auth/lib/DummyAuth';
import { Entity } from './model/Entity';
import { ILayoutProps } from './components/layout';
import { IAutopermissionConfig } from './model/permissions';
export { Entity } from './model/Entity';
export { DataGrid } from './components/data-grid';
export { Layout } from 'webpanel-antd';
export * from './layout-builder';
export interface IAdminProps extends ILayoutProps {
    auth?: AuthProps | DummyAuthProps;
    autopermissions?: IAutopermissionConfig | boolean;
    logoURL?: string;
    logoCollapsedURL?: string;
}
export declare class Admin extends React.Component<IAdminProps> {
    static Entity: typeof Entity;
    render(): JSX.Element;
}
