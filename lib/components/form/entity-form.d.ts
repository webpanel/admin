/// <reference types="react" />
import { FormInstance } from "webpanel-antd";
import { ResourceID } from "webpanel-data";
import { Thunk } from "ts-thunk";
import { Entity } from "../../model/Entity";
import { FormLayout } from "antd/lib/form/Form";
import { SaveOption } from "./buttons";
export declare type EntityOnSaveHandler = (id: ResourceID, option?: SaveOption) => void;
export interface IEntityFormFieldOptions {
    field: string | null;
}
export declare type IEntityFormConfigField = IEntityFormFieldOptions | string | null;
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
    entity: Entity;
    formRef?: (form: FormInstance) => void;
    onSave?: EntityOnSaveHandler;
    onValuesChanged?: (values: any) => void;
}
export interface IEntityFormEditProps extends IEntityFormProps {
    resourceID: ResourceID;
}
export interface IEntityFormCreateProps extends IEntityFormProps {
}
export declare const EntityForm: (props: IEntityFormEditProps | IEntityFormCreateProps) => JSX.Element;
export {};
