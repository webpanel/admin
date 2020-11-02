import * as React from "react";
import { Entity } from "../../model/Entity";
import { FormLayout } from "antd/lib/form/Form";
export interface LayoutBuilderEditFieldProps {
    name: string;
    formLayout?: FormLayout;
}
export interface LayoutBuilderEditFieldInternalProps {
    entity: Entity;
}
export declare class LayoutBuilderEditField extends React.Component<LayoutBuilderEditFieldProps & LayoutBuilderEditFieldInternalProps> {
    render(): React.ReactNode;
}
