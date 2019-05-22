/// <reference types="lodash" />
import * as React from 'react';
import { Entity } from '../../model/Entity';
export interface LayoutBuilderValueProps {
    name: string;
}
export interface LayoutBuilderValueInternalProps {
    entity: Entity<any>;
    data: any;
}
export declare class LayoutBuilderValue extends React.Component<LayoutBuilderValueProps & LayoutBuilderValueInternalProps> {
    render(): import("lodash").NotVoid;
}