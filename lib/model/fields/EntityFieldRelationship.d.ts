import * as React from "react";
import { EntityField, IEntityFieldConfig, IEntityFieldConfigFilter, IEntityFieldFilterProps, IEntityFieldRenderOptions } from "../EntityField";
import { Thunk } from "ts-thunk";
import { Entity } from "../Entity";
import { FormLayout } from "antd/lib/form/Form";
import { EntityBase } from "../EntityBase";
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
    showLink?: Thunk<boolean>;
}
export declare const relationshipFieldFilter: (columnName: string, entity: Thunk<Entity<any>>) => IEntityFieldConfigFilter;
export declare class EntityFieldRelationship<T, C extends IEntityFieldRelationshipConfig<T>> extends EntityField<T, C> {
    readonly name: string;
    protected readonly config: C;
    readonly entity: EntityBase;
    private filterConfig;
    constructor(name: string, config: C, entity: EntityBase);
    get type(): IEntityFieldRelationshipType;
    get targetEntity(): Entity<any>;
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
    filterDropdownInput: (props: IEntityFieldFilterProps<string>) => React.ReactNode;
    get filterNormalize(): (values: string[]) => {
        [key: string]: any;
    };
    get filterDenormalize(): (values: {
        [key: string]: any;
    }) => any[];
}
export declare const getRelationshipFilterDropdownInput: (targetEntity: Entity<any>, props: IEntityFieldFilterProps<string>) => JSX.Element;
