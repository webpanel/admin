import * as React from 'react';
import { Entity } from '../model/Entity';
import { LayoutProps } from 'webpanel-antd/lib/layout/Layout';
import { Thunk } from 'ts-thunk';
export interface ILayoutProps {
    entities?: Thunk<Entity<any>[]>;
    menuItems?: Thunk<React.ReactNode[]>;
    structureItems?: Thunk<React.ReactNode[]>;
}
export declare class AdminLayout extends React.Component<ILayoutProps & LayoutProps> {
    render(): JSX.Element;
}
