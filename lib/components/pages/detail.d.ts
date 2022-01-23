/// <reference types="react" />
import "../../../styles/form-detail.css";
import { ModalProps } from "antd/lib/modal";
import { CardProps } from "antd/lib/card";
import { DescriptionsProps } from "antd/lib/descriptions";
import { ResourceID } from "webpanel-data";
import { Thunk } from "ts-thunk";
import { EntityWithFields } from "../../model/EntityWithFields";
export interface IEntityDetailFieldOptions {
    field: string | null;
    span?: number;
}
export declare type IEntityDetailConfigField = IEntityDetailFieldOptions | string | null;
export interface IEntityDetailConfig {
    fields?: Thunk<IEntityDetailConfigField[]>;
    pollInterval?: number;
    wrapperType?: "card" | "plain" | "modal";
    modal?: ModalProps;
    desriptions?: DescriptionsProps;
    card?: CardProps;
}
export interface IEntityDetailProps extends IEntityDetailConfig {
    entity: EntityWithFields;
    resourceID: ResourceID;
}
export declare const EntityDetail: (props: IEntityDetailProps) => JSX.Element;
