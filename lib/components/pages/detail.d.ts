import "../../../styles/form-detail.css";
import * as React from "react";
import { ModalProps } from "antd/lib/modal";
import { ResourceID } from "webpanel-data";
import { CardProps } from "antd/lib/card";
import { DescriptionsProps } from "antd/lib/descriptions";
import { Entity } from "../../model/Entity";
import { Thunk } from "ts-thunk";
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
    entity: Entity;
    resourceID: ResourceID;
}
export declare class EntityDetail extends React.Component<IEntityDetailProps> {
    render(): React.ReactNode;
}
