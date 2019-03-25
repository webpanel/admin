import * as React from 'react';
import { Resource } from 'webpanel-data';
import { SaveOption } from '../form/buttons';
import { Entity } from '../../model/Entity';
import { FormContext } from 'webpanel-antd/lib/form/form/Form';
import { FormLayout } from 'antd/lib/form/Form';
import { ModalProps } from 'antd/lib/modal';
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
    modal?: ModalProps;
}
export interface IEntityEditProps extends IEntityEditConfig {
    entity: Entity<any>;
    resourceID?: string | number;
    onSave?: EntityOnSaveHandler;
    onCreate?: (id: string) => void;
    onCancel?: () => void;
}
export declare class EntityEdit extends React.Component<IEntityEditProps, {
    version: number;
}> {
    state: {
        version: number;
    };
    private currentSaveOption?;
    handleSave: (formContext: FormContext, resource: Resource, option?: "edit" | "add" | undefined) => Promise<void>;
    handleFormSuccess: (resource: Resource) => Promise<void>;
    private formCardContent;
    private formModalContent;
    render(): JSX.Element;
}
