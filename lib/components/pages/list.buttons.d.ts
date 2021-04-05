import * as React from "react";
import { Entity, EntityDataType } from "../../model/Entity";
import { ActionButtonProps } from "webpanel-antd/lib/table/ResourceTableActionButtons";
export declare type EntityListSize = "small" | "default";
export interface EntityListActionButtonProps<T extends EntityDataType> extends ActionButtonProps<T> {
    entity: Entity<T>;
}
export declare type EntitylistActionButton<T extends EntityDataType = any> = "detail" | "edit" | "delete" | React.ReactNode | ((props: EntityListActionButtonProps<T>) => React.ReactNode);
export declare const detailListButton: (props: EntityListActionButtonProps<any>, size: EntityListSize) => JSX.Element;
export declare const editListButton: (props: EntityListActionButtonProps<any>, size: EntityListSize) => JSX.Element;
