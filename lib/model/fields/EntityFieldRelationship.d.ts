import * as React from "react";
import { EntityField, IEntityFieldConfig, IEntityFieldFilterProps, IEntityFieldRenderOptions } from "../EntityField";
import { Thunk } from "ts-thunk";
import { Entity } from "../Entity";
import { FormLayout } from "antd/lib/form/Form";
export declare type IEntityFieldRelationshipType = "toOne" | "toMany";
export declare type IEntityFieldRelationshipSelectMode = undefined | "multiple";
export interface IEntityFieldRelationshipCreatableConfig {
    addButton: boolean;
    notFound: boolean;
}
export interface IEntityFieldRelationshipConfig<T> extends IEntityFieldConfig<T> {
    targetEntity: any;
    type: IEntityFieldRelationshipType;
    creatable?: Thunk<boolean | IEntityFieldRelationshipCreatableConfig>;
}
export declare class EntityFieldRelationship<T> extends EntityField<T, IEntityFieldRelationshipConfig<T>> {
    get type(): IEntityFieldRelationshipType;
    columnName(): string;
    get mode(): IEntityFieldRelationshipSelectMode;
    fetchField(): string | null;
    get render(): (record: T, options?: IEntityFieldRenderOptions) => React.ReactNode;
    fieldElement(key: string | number, config: {
        formLayout?: FormLayout;
    }): React.ReactNode;
    inputElement(props?: {
        value?: any;
        onChange?: (value: any) => void;
        autoFocus?: boolean;
    }): React.ReactNode;
    filterDropdownInput: (props: IEntityFieldFilterProps<string>) => JSX.Element;
    get filterNormalize(): (values: string[]) => {
        [key: string]: any;
    };
    get filterDenormalize(): (values: {
        [key: string]: any;
    }) => any[];
}
export declare const getRelationshipFilterDropdownInput: (targetEntity: Entity<any>, props: IEntityFieldFilterProps<string>) => JSX.Element;
