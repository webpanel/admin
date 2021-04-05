/// <reference types="react" />
import { Entity } from "../../model/Entity";
export interface LayoutBuilderStringFieldProps {
    name: string;
    layout?: "horizontal" | "vertical";
}
export interface LayoutBuilderStringFieldInternalProps {
    entity: Entity;
    data: any;
}
export declare const LayoutBuilderStringField: (props: LayoutBuilderStringFieldProps & LayoutBuilderStringFieldInternalProps) => JSX.Element | null;
