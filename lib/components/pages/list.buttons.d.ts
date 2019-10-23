import * as React from 'react';
import { ActionButtonProps } from 'webpanel-antd/lib/table/ResourceTableActionButtons';
import { Entity } from '../../model/Entity';
export declare type EntityListSize = 'small' | 'default';
export interface EntityListActionButtonProps extends ActionButtonProps {
    entity: Entity<any>;
}
export declare type EntitylistActionButton = 'detail' | 'edit' | 'delete' | React.ReactNode | ((props: EntityListActionButtonProps) => React.ReactNode);
export declare const detailListButton: (props: EntityListActionButtonProps, size: EntityListSize) => JSX.Element;
export declare const editListButton: (props: EntityListActionButtonProps, size: EntityListSize) => JSX.Element;
