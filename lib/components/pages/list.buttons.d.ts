import * as React from "react";
import { ActionButtonProps } from "webpanel-antd/lib/table/ResourceTableActionButtons";
import { Entity } from "../../model/Entity";
import { ResourceID } from "webpanel-data";
export declare type EntityListSize = "small" | "default";
export interface EntityListActionButtonProps<T extends {
    id: ResourceID;
}> extends ActionButtonProps<T> {
    entity: Entity<T>;
}
export declare type EntitylistActionButton<T extends {
    id: ResourceID;
} = any> = "detail" | "edit" | "delete" | React.ReactNode | ((props: EntityListActionButtonProps<T>) => React.ReactNode);
export declare const detailListButton: (props: EntityListActionButtonProps<any>, size: EntityListSize) => JSX.Element;
export declare const editListButton: (props: EntityListActionButtonProps<any>, size: EntityListSize) => JSX.Element;
