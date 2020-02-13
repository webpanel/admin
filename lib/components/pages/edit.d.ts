import * as React from "react";
import { Resource, ResourceID } from "webpanel-data";
import { SaveOption } from "../form/buttons";
import { Thunk } from "ts-thunk";
import { Entity } from "../../model/Entity";
import { FormLayout } from "antd/lib/form/Form";
import { ModalProps } from "antd/lib/modal";
export declare type EntityOnSaveHandler = (id: ResourceID, option?: SaveOption) => void;
export interface IEntityEditFieldOptions {
    field: string | null;
}
export declare type IEntityEditConfigField = IEntityEditFieldOptions | string | null;
export interface IEntityEditFormProps {
    layout?: FormLayout;
}
export interface IEntityEditConfig {
    form?: IEntityEditFormProps;
    fields?: Thunk<IEntityEditConfigField[]>;
    initialValues?: {
        [key: string]: any;
    };
    wrapperType?: "card" | "modal";
    modal?: ModalProps;
}
export interface IEntityEditProps extends IEntityEditConfig {
    entity: Entity;
    resourceID?: ResourceID;
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
    handleSave: (formContext: any, resource: Resource<{
        [key: string]: any;
    }, import("webpanel-data").ResourceConfig<{
        [key: string]: any;
    }>>, option?: "add" | "edit" | undefined) => Promise<void>;
    handleFormSuccess: (resource: Resource<{
        [key: string]: any;
    }, import("webpanel-data").ResourceConfig<{
        [key: string]: any;
    }>>) => Promise<void>;
    private formCardContent;
    private formModalContent;
    render(): React.ReactNode;
}
