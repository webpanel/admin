import * as React from 'react';
import { Entity } from '../../model/Entity';
import { RowProps } from 'antd/lib/row';
export interface LayoutEditButtonInternalProps extends RowProps {
    entity: Entity<any>;
    data: any;
}
export declare class LayoutBuilderEditButton extends React.Component<LayoutEditButtonInternalProps> {
    render(): React.ReactNode;
}
