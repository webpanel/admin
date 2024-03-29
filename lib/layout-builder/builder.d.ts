import * as React from "react";
import { IEntityDetailConfigField, IEntityDetailFieldOptions } from "../components/pages/detail";
import { IEntityFormConfigField, IEntityFormFieldOptions } from "../components/form/entity-form";
import { LayoutBuilderCardProps } from "./components/card";
import { LayoutBuilderColProps } from "./components/col";
import { LayoutBuilderRowProps } from "./components/row";
import { LayoutBuilderStringFieldProps } from "./components/string-field";
import { LayoutBuilderTabsProps } from "./components/tabs";
import { LayoutBuilderValueProps } from "./components/value";
import { Resource, ResourceID } from "webpanel-data";
import { Thunk } from "ts-thunk";
import { DescriptionsProps } from "antd/lib/descriptions";
import { Entity } from "../model/Entity";
import { FormInstance } from "webpanel-antd";
import { LayoutBuilderEditFieldProps } from "./components/edit-field";
export interface LayoutBuilderConfig {
    entity: Entity;
    id?: ResourceID;
    data: any;
    formInstance?: FormInstance;
    resource: Resource;
}
type IEntityBuilderConfigField = IEntityDetailConfigField | IEntityFormConfigField;
type IEntityBuilderFieldOptions = IEntityFormFieldOptions | IEntityDetailFieldOptions;
export declare class LayoutBuilder {
    readonly config: LayoutBuilderConfig;
    constructor(config: LayoutBuilderConfig);
    isLoading(): boolean;
    isInitLoading(): boolean;
    get data(): any;
    get resourceID(): ResourceID | undefined;
    get entity(): Entity;
    getFieldsFromThunk(fields?: Thunk<IEntityBuilderConfigField[]>): IEntityBuilderFieldOptions[];
    getDefaultDetailContent(config?: {
        descriptions?: DescriptionsProps;
        fields?: Thunk<IEntityBuilderConfigField[]>;
    }): React.ReactNode;
    getDescriptions(config?: {
        descriptions?: DescriptionsProps;
        fields?: Thunk<IEntityBuilderConfigField[]>;
    }): React.ReactNode;
    getDefaultEditContent(config?: {
        fields?: Thunk<IEntityBuilderConfigField[]>;
    }): React.ReactNode;
    card(props: Thunk<LayoutBuilderCardProps, LayoutBuilderConfig>): React.ReactNode;
    row(props: Thunk<LayoutBuilderRowProps, LayoutBuilderConfig>): React.ReactNode;
    col(props: Thunk<LayoutBuilderColProps, LayoutBuilderConfig>): React.ReactNode;
    tabs(props: Thunk<LayoutBuilderTabsProps, LayoutBuilderConfig>): React.ReactNode;
    value(props: Thunk<LayoutBuilderValueProps, LayoutBuilderConfig>): React.ReactNode;
    stringField(props: Thunk<LayoutBuilderStringFieldProps, LayoutBuilderConfig>): React.ReactNode;
    editField(props: Thunk<LayoutBuilderEditFieldProps, LayoutBuilderConfig>): React.ReactNode;
    editButton(): React.ReactNode;
}
export {};
