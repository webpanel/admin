import * as React from 'react';
import { Entity } from '../model/Entity';
import { LayoutProps } from 'webpanel-antd/lib/layout/Layout';
export interface ILayoutProps extends LayoutProps {
    entities: Entity<any>[];
}
export declare class AdminLayout extends React.Component<ILayoutProps> {
    render(): JSX.Element;
}
