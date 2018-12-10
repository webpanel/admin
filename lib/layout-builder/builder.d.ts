import * as React from 'react';
import { FormContext } from 'webpanel-antd/lib/form/form/Form';
import { Thunk } from 'ts-thunk';
import { LayoutBuilderTabsProps } from './components/tabs';
import { LayoutBuilderRowProps } from './components/row';
import { LayoutBuilderColProps } from './components/col';
import { LayoutBuilderStringFieldProps } from './components/string-field';
import { LayoutBuilderCardProps } from './components/card';
import { Entity } from '../model/Entity';
import { LayoutBuilderEditFieldProps } from './components/edit-field';
export interface LayoutBuilderConfig {
    entity: Entity<any>;
    id?: string;
    data: any;
    formContext?: FormContext;
}
export declare class LayoutBuilder {
    readonly config: LayoutBuilderConfig;
    constructor(config: LayoutBuilderConfig);
    card(props: Thunk<LayoutBuilderCardProps, LayoutBuilderConfig>): React.ReactNode;
    row(props: Thunk<LayoutBuilderRowProps, LayoutBuilderConfig>): React.ReactNode;
    col(props: Thunk<LayoutBuilderColProps, LayoutBuilderConfig>): React.ReactNode;
    tabs(props: Thunk<LayoutBuilderTabsProps, LayoutBuilderConfig>): React.ReactNode;
    stringField(props: Thunk<LayoutBuilderStringFieldProps, LayoutBuilderConfig>): React.ReactNode;
    editField(props: Thunk<LayoutBuilderEditFieldProps, LayoutBuilderConfig>): React.ReactNode;
    editButton(): React.ReactNode;
}
