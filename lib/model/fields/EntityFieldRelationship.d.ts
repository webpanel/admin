import * as React from 'react';
import { ResourceCollection } from 'webpanel-data';
import { Thunk } from 'ts-thunk';
import { EntityField, IEntityFieldConfig } from '../EntityField';
import { Entity } from '../Entity';
import { FormContext } from 'webpanel-antd/lib/form/form/Form';
import { FormLayout } from 'antd/lib/form/Form';
export declare type IEntityFieldRelationshipType = 'toOne' | 'toMany';
export declare type IEntityFieldRelationshipSelectMode = 'default' | 'multiple';
export interface IEntityFieldRelationshipConfig<T> extends IEntityFieldConfig<T> {
    targetEntity: Thunk<Entity<any>>;
    type?: IEntityFieldRelationshipType;
}
export declare class EntityFieldRelationship<T> extends EntityField<T, IEntityFieldRelationshipConfig<T>> {
    readonly type: IEntityFieldRelationshipType;
    readonly columnName: string;
    readonly mode: IEntityFieldRelationshipSelectMode;
    readonly fetchField: string;
    readonly render: ((record: T) => React.ReactNode);
    fieldElement(formContext: FormContext, key: string | number, config: {
        formLayout?: FormLayout;
    }): React.ReactNode;
    updateFilterField: (resource: ResourceCollection, operationName: string, value: string, customName?: string | undefined) => void;
    clearFilters: (resource: ResourceCollection) => void;
    filterDropdownInput: (mainResource: ResourceCollection) => JSX.Element;
    inputElement(props?: {
        value?: any;
        onChange?: (value: any) => void;
        autoFocus?: boolean;
    }): React.ReactNode;
}
