import * as React from 'react';
import { Entity } from '../model/Entity';
import { LayoutProps } from 'webpanel-antd/lib/layout/Layout';
import { Thunk } from 'ts-thunk';
import { HeaderConfig } from 'webpanel-antd/lib/layout/Header';
export interface ILayoutProps {
    entities?: Thunk<Entity<any>[]>;
    menuItems?: Thunk<React.ReactNode[]>;
    structureItems?: Thunk<React.ReactNode[]>;
    header?: HeaderConfig;
}
export declare class AdminLayout extends React.Component<ILayoutProps & LayoutProps> {
    render(): JSX.Element;
}
