import * as React from 'react';
import { EntityField, IEntityFieldConfig, IEntityFieldFilterProps } from '../EntityField';
import { Thunk } from 'ts-thunk';
import { Entity } from '../Entity';
import { FormContext } from 'webpanel-antd/lib/form/form/Form';
import { FormLayout } from 'antd/lib/form/Form';
export declare type IEntityFieldRelationshipType = 'toOne' | 'toMany';
export declare type IEntityFieldRelationshipSelectMode = 'default' | 'multiple';
export interface IEntityFieldRelationshipConfig<T> extends IEntityFieldConfig<T> {
    targetEntity: Thunk<Entity>;
    type: IEntityFieldRelationshipType;
}
export declare class EntityFieldRelationship<T> extends EntityField<T, IEntityFieldRelationshipConfig<T>> {
    readonly type: IEntityFieldRelationshipType;
    columnName(): string;
    readonly mode: IEntityFieldRelationshipSelectMode;
    fetchField(): string | null;
    readonly render: (record: T) => React.ReactNode;
    fieldElement(formContext: FormContext, key: string | number, config: {
        formLayout?: FormLayout;
    }): React.ReactNode;
    inputElement(props?: {
        value?: any;
        onChange?: (value: any, valueElement: React.ReactNode) => void;
        autoFocus?: boolean;
    }): React.ReactNode;
    filterDropdownInput: (props: IEntityFieldFilterProps<string>) => React.ReactNode;
    readonly filterNormalize: (values: string[]) => {
        [key: string]: any;
    };
    readonly filterDenormalize: (values: {
        [key: string]: any;
    }) => any[];
}
