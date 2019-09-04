import * as React from 'react';
import { Entity } from '../../model/Entity';
export interface LayoutBuilderStringFieldProps {
    name: string;
    layout?: 'horizontal' | 'vertical';
}
export interface LayoutBuilderStringFieldInternalProps {
    entity: Entity;
    data: any;
}
export declare class LayoutBuilderStringField extends React.Component<LayoutBuilderStringFieldProps & LayoutBuilderStringFieldInternalProps> {
    private layouts;
    render(): React.ReactNode;
}
