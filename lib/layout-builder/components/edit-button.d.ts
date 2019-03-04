import * as React from "react";
import { RowProps } from "antd/lib/row";
import { Entity } from "../../model/Entity";
export interface LayoutEditButtonInternalProps extends RowProps {
    entity: Entity<any>;
    data: any;
}
export declare class LayoutBuilderEditButton extends React.Component<LayoutEditButtonInternalProps> {
    render(): JSX.Element;
}
