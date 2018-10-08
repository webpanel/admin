import * as React from 'react';
import { EntityField } from '../../model/EntityField';
import { Entity } from '../../model/Entity';
import { FormContext } from 'webpanel-antd/lib/form/form/Form';
export interface IRelationFieldProps {
    field: EntityField<any>;
    formContext: FormContext;
    targetEntity: Entity<any>;
    mode?: 'default' | 'multiple' | 'tags';
}
export declare class RelationField extends React.Component<IRelationFieldProps> {
    render(): JSX.Element;
}
