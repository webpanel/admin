import * as React from 'react';
import { FormLayout } from 'antd/lib/form/Form';
import { FormContext } from 'webpanel-antd/lib/form/form/Form';
import { Resource } from 'webpanel-data';
import { Entity } from '../../model/Entity';
import { SaveOption } from '../form/buttons';
export declare type EntityOnSaveHandler = (id: string | number, option?: SaveOption) => void;
export interface IEntityEditFormProps {
    layout?: FormLayout;
}
export interface IEntityEditConfig {
    form?: IEntityEditFormProps;
    initialValues?: {
        [key: string]: any;
    };
    wrapperType?: 'card' | 'modal';
}
export interface IEntityEditProps extends IEntityEditConfig {
    entity: Entity<any>;
    resourceID?: string;
    onSave?: EntityOnSaveHandler;
    onCreate?: (id: string) => void;
}
export declare class EntityEdit extends React.Component<IEntityEditProps, {
    version: number;
}> {
    state: {
        version: number;
    };
    private currentSaveOption?;
    handleSave: (formContext: FormContext, option: SaveOption, resource: Resource) => Promise<void>;
    handleFormSuccess: (resource: Resource) => Promise<void>;
    private formCardContent;
    private formModalContent;
    render(): JSX.Element;
}
