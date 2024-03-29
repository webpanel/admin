import * as React from "react";
import { ResourceID } from "webpanel-data";
import { Thunk } from "ts-thunk";
import { FormInstance } from "webpanel-antd";
import { FormLayout } from "antd/lib/form/Form";
import { EntityWithFields } from "../../model/EntityWithFields";
export type EntityOnSaveHandler = (id: ResourceID) => void;
export interface IEntityFormFieldOptions {
    field: string | null;
}
export type IEntityFormConfigField = IEntityFormFieldOptions | string | null;
interface IEntityInternalFormProps {
    layout?: FormLayout;
}
export interface IEntityFormConfig {
    form?: IEntityInternalFormProps;
    fields?: Thunk<IEntityFormConfigField[]>;
    initialValues?: {
        [key: string]: any;
    };
}
export interface IEntityFormProps extends IEntityFormConfig {
    entity: EntityWithFields;
    formRef?: React.MutableRefObject<FormInstance | null>;
    onSave?: EntityOnSaveHandler;
    onValuesChanged?: (values: any) => void;
    showButtons?: boolean;
}
export interface IEntityFormEditProps extends IEntityFormProps {
    resourceID: ResourceID;
}
export interface IEntityFormCreateProps extends IEntityFormProps {
}
export declare const isEntityEditFormProps: (props: any) => props is IEntityFormEditProps;
export declare const EntityForm: (props: IEntityFormCreateProps | IEntityFormEditProps) => JSX.Element;
export {};
