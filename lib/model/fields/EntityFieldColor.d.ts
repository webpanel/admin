import * as React from "react";
import { EntityField, IEntityFieldRenderOptions } from "../EntityField";
interface ColorInputProps {
    value?: string | null;
    onChange: (value: string | null) => void;
}
export declare const ColorInput: ({ value, onChange }: ColorInputProps) => JSX.Element;
export declare class EntityFieldColor<T, C> extends EntityField<T, C> {
    private renderValue;
    get render(): (record: T, options?: IEntityFieldRenderOptions) => React.ReactNode;
    inputElement(props?: {
        value?: any;
        onChange?: (value: any, valueElement: React.ReactNode) => void;
        autoFocus?: boolean;
    }): React.ReactNode;
}
export {};
