import * as React from 'react';
import { LayoutBuilderCardProps } from './components/card';
import { LayoutBuilderColProps } from './components/col';
import { LayoutBuilderEditFieldProps } from './components/edit-field';
import { LayoutBuilderRowProps } from './components/row';
import { LayoutBuilderStringFieldProps } from './components/string-field';
import { LayoutBuilderTabsProps } from './components/tabs';
import { LayoutBuilderValueProps } from './components/value';
import { Resource, ResourceID } from 'webpanel-data';
import { Thunk } from 'ts-thunk';
import { Entity } from '../model/Entity';
import { FormContext } from 'webpanel-antd/lib/form/form/Form';
export interface LayoutBuilderConfig {
    entity: Entity;
    id?: ResourceID;
    data: any;
    formContext?: FormContext;
    resource: Resource;
}
export declare class LayoutBuilder {
    readonly config: LayoutBuilderConfig;
    constructor(config: LayoutBuilderConfig);
    isLoading(): boolean;
    isInitLoading(): boolean;
    card(props: Thunk<LayoutBuilderCardProps, LayoutBuilderConfig>): React.ReactNode;
    row(props: Thunk<LayoutBuilderRowProps, LayoutBuilderConfig>): React.ReactNode;
    col(props: Thunk<LayoutBuilderColProps, LayoutBuilderConfig>): React.ReactNode;
    tabs(props: Thunk<LayoutBuilderTabsProps, LayoutBuilderConfig>): React.ReactNode;
    value(props: Thunk<LayoutBuilderValueProps, LayoutBuilderConfig>): React.ReactNode;
    stringField(props: Thunk<LayoutBuilderStringFieldProps, LayoutBuilderConfig>): React.ReactNode;
    editField(props: Thunk<LayoutBuilderEditFieldProps, LayoutBuilderConfig>): React.ReactNode;
    editButton(): React.ReactNode;
}
