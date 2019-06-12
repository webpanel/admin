import * as React from 'react';
import { Entity } from '../../model/Entity';
import { FormContext } from 'webpanel-antd/lib/form/form/Form';
import { FormLayout } from 'antd/lib/form/Form';
export interface LayoutBuilderEditFieldProps {
    name: string;
    formLayout?: FormLayout;
}
export interface LayoutBuilderEditFieldInternalProps {
    entity: Entity<any>;
    formContext: FormContext;
}
export declare class LayoutBuilderEditField extends React.Component<LayoutBuilderEditFieldProps & LayoutBuilderEditFieldInternalProps> {
    render(): React.ReactNode;
}
