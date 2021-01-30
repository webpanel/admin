import * as React from "react";
import { FormInstance, FormLayout } from "antd/lib/form/Form";
import { Entity } from "../../model/Entity";
export interface LayoutBuilderEditFieldProps {
    name: string;
    formLayout?: FormLayout;
    formInstance?: FormInstance;
    values?: any;
}
export interface LayoutBuilderEditFieldInternalProps {
    entity: Entity;
}
export declare class LayoutBuilderEditField extends React.Component<LayoutBuilderEditFieldProps & LayoutBuilderEditFieldInternalProps> {
    render(): React.ReactNode;
}
