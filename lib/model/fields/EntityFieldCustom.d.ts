import * as React from "react";
import { EntityField, IEntityFieldConfig, IEntityFieldInputElementProps } from "../EntityField";
import { FormContext } from "webpanel-antd/lib/form/form/Form";
export interface IEntityFieldCustomConfig<T> extends IEntityFieldConfig<T> {
    fetchField?: string;
    editFetchField?: string;
    inputElement: (props: {
        value: T | undefined;
        onChange: (value?: T) => void;
        formContext?: FormContext;
    }) => React.ReactNode;
}
export declare class EntityFieldCustom<T, C extends IEntityFieldCustomConfig<T>> extends EntityField<T, C> {
    editFetchField(): string;
    fetchField(): string | null;
    inputElement(props?: IEntityFieldInputElementProps<T>): React.ReactNode;
}
