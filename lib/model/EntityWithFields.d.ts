import * as React from "react";
import { Resource, ResourceCollectionHookConfig, ResourceHookConfig, ResourceID } from "webpanel-data";
import { EntityField, IEntityFieldConfig, IEntityFieldRenderOptions } from "./EntityField";
import { IEntityFieldBooleanConfig } from "./fields/EntityFieldBoolean";
import { IEntityFieldComputedConfig } from "./fields/EntityFieldComputed";
import { IEntityFieldCustomConfig } from "./fields/EntityFieldCustom";
import { IEntityFieldDateConfig } from "./fields/EntityFieldDate";
import { IEntityFieldEnumConfig } from "./fields/EntityFieldEnum";
import { IEntityFieldFileConfig } from "./fields/EntityFieldFile";
import { IEntityFieldNumberConfig } from "./fields/EntityFieldNumber";
import { IEntityFieldPercentageConfig } from "./fields/EntityFieldPercentage";
import { IEntityFieldRelationshipConfig } from "./fields/EntityFieldRelationship";
import { ResourceCollection, ResourceCollectionConfig } from "webpanel-data/lib/ResourceCollection";
import { Thunk } from "ts-thunk";
import { EntityDataType, EntityBase } from "./EntityBase";
import { CreateEntityProps } from "../components/buttons/EntityAddButton";
import { IEntityCreateProps, IEntityEditProps } from "../components/pages/edit";
import { DetailEntityProps } from "../components/buttons/EntityDetailButton";
import { IEntityDetailConfig } from "../components/pages/detail";
import { IEntityListConfig } from "../components/pages/list";
import { EntitySelectConfig } from "../components/entity-picker";
type MergeEntityFieldType<T, U, T0 = T & U, T1 = {
    [K in keyof T0]: T0[K];
}> = T1;
type UnwrapEntity<T> = T extends EntityBase<infer U> ? U : never;
export declare class EntityWithFields<T extends EntityDataType = any> extends EntityBase<T> {
    fields: EntityField<any, any>[];
    protected clone(): this;
    getField(name: string): EntityField<T, any> | null;
    getFieldOrFail(name: string): EntityField<T, any>;
    getListFields(): EntityField<T, any>[];
    getEditFields(resourceID?: ResourceID): EntityField<T, any>[];
    getDetailFields(resourceID: ResourceID): EntityField<T, any>[];
    get searchableFields(): EntityField<T, any>[];
    get render(): (value: T | null) => React.ReactNode;
    setRender(fn: (value: T) => React.ReactNode): this;
    stringField<Name extends string, T2 extends MergeEntityFieldType<T, {
        [K in Name]: string;
    }>>(name: Name, config?: IEntityFieldConfig<T2>): EntityWithFields<T2>;
    textField<Name extends string, T2 extends MergeEntityFieldType<T, {
        [K in Name]: string;
    }>>(name: Name, config?: IEntityFieldConfig<T2>): EntityWithFields<T2>;
    numberField<Name extends string, T2 extends MergeEntityFieldType<T, {
        [K in Name]: number;
    }>>(name: Name, config?: IEntityFieldNumberConfig<T2>): EntityWithFields<T2>;
    percentageField<Name extends string, T2 extends MergeEntityFieldType<T, {
        [K in Name]: number;
    }>>(name: Name, config?: IEntityFieldPercentageConfig<T2>): EntityWithFields<T2>;
    passwordField<Name extends string, T2 extends MergeEntityFieldType<T, {
        [K in Name]: string;
    }>>(name: Name, config?: IEntityFieldConfig<T2>): EntityWithFields<T2>;
    dateField<Name extends string, T2 extends MergeEntityFieldType<T, {
        [K in Name]: moment.Moment;
    }>>(name: Name, config?: IEntityFieldDateConfig<T2>): EntityWithFields<T2>;
    booleanField<Name extends string, T2 extends MergeEntityFieldType<T, {
        [K in Name]: boolean;
    }>>(name: Name, config?: IEntityFieldBooleanConfig<T2>): EntityWithFields<T2>;
    relationshipField<Name extends string, T2 extends MergeEntityFieldType<T, EnhancedKeys>, Config extends IEntityFieldRelationshipConfig<EnhancedKeys>, EnhancedKeys = {
        [K in Name]: UnwrapEntity<ReturnType<Config["targetEntity"]>>;
    }>(name: Name, config: Config): EntityWithFields<T2>;
    fileField<Name extends string, T2 extends MergeEntityFieldType<T, {
        [K in Name]: any;
    }>>(name: Name, config?: IEntityFieldFileConfig<T>): EntityWithFields<T2>;
    colorField<Name extends string, T2 extends MergeEntityFieldType<T, {
        [K in Name]: string;
    }>>(name: Name, config?: IEntityFieldConfig<T2>): EntityWithFields<T2>;
    enumField<Name extends string, T2 extends MergeEntityFieldType<T, {
        [K in Name]: string;
    }>>(name: Name, config: IEntityFieldEnumConfig<T2>): EntityWithFields<T2>;
    computedField<Name extends string, EnhancedKeys = {
        [K in Name]: any;
    }>(name: Name, config?: IEntityFieldComputedConfig<any>): EntityWithFields<T & EnhancedKeys>;
    customField<Name extends string, EnhancedKeys = {
        [K in Name]: any;
    }>(name: Name, config: IEntityFieldCustomConfig<any>): EntityWithFields<T & EnhancedKeys>;
    setFieldRender<Name extends keyof T>(name: Name, fn: (record: T, options?: IEntityFieldRenderOptions) => React.ReactNode): this;
    getSearchResourceCollectionConfig: () => ResourceCollectionConfig<T>;
    useResource(config?: Partial<ResourceHookConfig<T>>): Resource<T>;
    useResourceCollection(config?: Partial<ResourceCollectionHookConfig<T>>): ResourceCollection<T>;
    getListView: (config?: Thunk<IEntityListConfig<T>>) => React.ReactNode;
    getDetailView: (resourceID: ResourceID, config?: IEntityDetailConfig) => React.ReactNode;
    getDetailButton: (id: ResourceID, props: DetailEntityProps) => React.ReactNode;
    getCreateView: (props?: Omit<IEntityCreateProps, "entity">) => React.ReactNode;
    getCreateButton: (props: Omit<CreateEntityProps, "entity">) => React.ReactNode;
    getEditView: (props: Omit<IEntityEditProps, "entity">) => React.ReactNode;
    menuItem: () => React.ReactNode;
    structureItem: () => React.ReactNode;
    private getDetailPageLayout;
    private handleFormOnSave;
    private getEditPageLayout;
    private getCreatePageLayout;
    getEditButton: (resourceID: ResourceID) => React.ReactNode;
    getSelect(config?: EntitySelectConfig): React.ReactNode;
}
export {};
