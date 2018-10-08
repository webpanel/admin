import * as React from 'react';
import { FormContext } from 'webpanel-antd/lib/form/form/Form';
import { Entity } from './Entity';
import { Thunk } from '../thunk';
export interface IEntityFieldInput {
    type?: 'string' | 'number' | 'text' | 'date' | 'datetime' | 'boolean';
}
export interface IEntityFieldRelationship {
    type?: 'relationship';
    targetEntity?: Thunk<Entity<any>>;
    toMany?: boolean;
}
export interface IEntityFieldBaseConfig<T> {
    name: string;
    title?: string;
    visibility?: {
        list?: boolean;
        detail?: boolean;
        search?: boolean;
    };
    render?: (record: T) => React.ReactNode;
}
export declare type IEntityFieldConfig<T> = IEntityFieldBaseConfig<T> & (IEntityFieldInput | IEntityFieldRelationship);
export declare class EntityField<T> {
    private readonly config;
    readonly entity: Entity<any>;
    constructor(config: IEntityFieldConfig<T>, entity: Entity<any>);
    readonly title: string;
    readonly name: string;
    readonly fetchField: string;
    visible(type: 'list' | 'detail' | 'searchable', strict?: boolean): boolean;
    readonly render: ((record: T) => React.ReactNode) | undefined;
    inputElement(): React.ReactNode;
    fieldElement(formContext: FormContext, key: string | number): React.ReactNode;
    private relationshipFieldElement;
}
