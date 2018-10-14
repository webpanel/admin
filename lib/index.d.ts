import * as React from 'react';
import { AuthProps } from 'webpanel-auth/lib/Auth';
import { DummyAuthProps } from 'webpanel-auth/lib/DummyAuth';
import { Entity } from './model/Entity';
export { Entity } from './model/Entity';
export { DataGrid } from './components/data-grid';
export { Layout } from 'webpanel-antd';
export interface IAdminProps {
    auth?: (AuthProps | DummyAuthProps) & {
        type: 'dummy' | 'oauth';
    };
    entities: Entity<any>[];
    menuItems?: React.ReactNode[];
    structureItems?: React.ReactNode[];
}
export declare class Admin extends React.Component<IAdminProps> {
    static Entity: typeof Entity;
    render(): JSX.Element;
}
