import * as React from 'react';
import { ActionButtonProps } from 'webpanel-antd/lib/table/ResourceTableActionButtons';
import { Entity } from '../../model/Entity';
export declare type EntityListSize = 'small' | 'default';
export interface EntityListActionButtonProps<T> extends ActionButtonProps<T> {
    entity: Entity<T>;
}
export declare type EntitylistActionButton<T = any> = 'detail' | 'edit' | 'delete' | React.ReactNode | ((props: EntityListActionButtonProps<T>) => React.ReactNode);
export declare const detailListButton: (props: EntityListActionButtonProps<any>, size: import("antd/lib/card").CardSize) => JSX.Element;
export declare const editListButton: (props: EntityListActionButtonProps<any>, size: import("antd/lib/card").CardSize) => JSX.Element;
