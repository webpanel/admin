import * as React from 'react';
import { Thunk } from 'ts-thunk';
import { Entity } from '../model/Entity';
import { HeaderConfig } from 'webpanel-antd/lib/layout/Header';
import { LayoutProps } from 'webpanel-antd/lib/layout/Layout';
import { MenuConfig } from 'webpanel-antd/lib/layout/Menu';
export interface ILayoutProps {
    entities?: Thunk<Entity<any>[]>;
    menuItems?: Thunk<React.ReactNode[]>;
    structureItems?: Thunk<React.ReactNode[]>;
    header?: HeaderConfig;
    menu?: MenuConfig;
}
export declare class AdminLayout extends React.Component<ILayoutProps & LayoutProps> {
    render(): React.ReactNode;
}
