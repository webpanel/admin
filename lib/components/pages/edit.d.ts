import * as React from 'react';
import { FormLayout } from 'antd/lib/form/Form';
import { RouteComponentProps } from 'webpanel-antd';
import { FormContext } from 'webpanel-antd/lib/form/form/Form';
import { Resource } from 'webpanel-data';
import { Entity } from '../../model/Entity';
import { SaveOption } from '../form/buttons';
export interface IEntityEditFormProps {
    layout?: FormLayout;
}
export interface IEntityEditConfig {
    form?: IEntityEditFormProps;
    initialValues?: {
        [key: string]: any;
    };
}
export interface IEntityEditProps extends IEntityEditConfig {
    entity: Entity<any>;
    resourceID?: string;
    route?: RouteComponentProps<any>;
    onCreate?: (id: string) => void;
}
export declare class EntityEdit extends React.Component<IEntityEditProps, {
    version: number;
}> {
    state: {
        version: number;
    };
    private ignoreFormSuccessRedirect;
    handleSave: (formContext: FormContext, option: SaveOption, resource: Resource) => Promise<void>;
    handleFormSuccess: (resource: Resource) => Promise<void>;
    render(): JSX.Element;
}
