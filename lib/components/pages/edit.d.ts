import * as React from 'react';
import { RouteComponentProps } from 'webpanel-antd';
import { FormContext } from 'webpanel-antd/lib/form/form/Form';
import { Resource } from 'webpanel-data';
import { Entity } from '../../model/Entity';
import { SaveOption } from '../form/buttons';
export interface IEntityEditProps {
    entity: Entity<any>;
    resourceID?: string;
    initialValues?: {
        [key: string]: any;
    };
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
