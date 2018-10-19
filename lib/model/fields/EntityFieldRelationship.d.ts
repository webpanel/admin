import * as React from 'react';
import { Thunk } from 'ts-thunk';
import { EntityField, IEntityFieldConfig } from '../EntityField';
import { Entity } from '../Entity';
import { FormContext } from 'webpanel-antd/lib/form/form/Form';
export interface IEntityFieldRelationshipConfig<T> extends IEntityFieldConfig<T> {
    targetEntity: Thunk<Entity<any>>;
    type?: 'toOne' | 'toMany';
    mode?: 'default' | 'multiple';
}
export declare class EntityFieldRelationship<T> extends EntityField<T, IEntityFieldRelationshipConfig<T>> {
    readonly columnName: string;
    readonly fetchField: string;
    readonly render: ((record: T) => React.ReactNode);
    fieldElement(field: EntityField<T, any>, formContext: FormContext, key: string | number): React.ReactNode;
    inputElement(props?: {
        value?: any;
        onChange?: (value: any) => void;
        autoFocus?: boolean;
    }): React.ReactNode;
}
