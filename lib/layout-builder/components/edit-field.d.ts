/// <reference types="lodash" />
import * as React from 'react';
import { FormContext } from 'webpanel-antd/lib/form/form/Form';
import { FormLayout } from 'antd/lib/form/Form';
import { Entity } from '../../model/Entity';
export interface LayoutBuilderEditFieldProps {
    name: string;
    formLayout?: FormLayout;
}
export interface LayoutBuilderEditFieldInternalProps {
    entity: Entity<any>;
    formContext: FormContext;
}
export declare class LayoutBuilderEditField extends React.Component<LayoutBuilderEditFieldProps & LayoutBuilderEditFieldInternalProps> {
    render(): import("lodash").NotVoid;
}
