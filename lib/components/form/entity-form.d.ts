/// <reference types="react" />
import { ResourceID } from "webpanel-data";
import { Thunk } from "ts-thunk";
import { Entity } from "../../model/Entity";
import { FormContext } from "webpanel-antd/lib/form/form/Form";
import { FormLayout } from "antd/lib/form/Form";
import { ModalProps } from "antd/lib/modal";
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
    modal?: ModalProps;
}
export interface IEntityFormProps extends IEntityFormConfig {
    entity: Entity;
    resourceID?: ResourceID;
    onSave?: EntityOnSaveHandler;
    onCancel?: () => void;
    useFormContext?: (form: FormContext) => void;
}
export declare const EntityForm: (props: IEntityFormProps) => JSX.Element;
export {};
