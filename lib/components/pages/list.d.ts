import "../../../styles/entity-list.css";
import * as React from "react";
import { DataSourceAggregationFunction, ResourceCollection, ResourceCollectionOptions, ResourceID } from "webpanel-data";
import { Entity } from "../../model/Entity";
import { EntityDataType } from "../../model/EntityBase";
import { EntitylistActionButton } from "./list.buttons";
import { TablePaginationConfig, TableProps } from "antd/lib/table";
import { Thunk } from "ts-thunk";
import { CardProps } from "antd/lib/card";
import { CreateEntityProps } from "../buttons/EntityAddButton";
import { EntityField } from "../../model/EntityField";
export interface IEntityListTableProps extends TableProps<any>, ResourceCollectionOptions<any> {
    actionButtons?: Thunk<EntitylistActionButton[], any>;
    actionButtonsTitle?: React.ReactNode;
    actionButtonsFixed?: boolean;
    pagination?: TablePaginationConfig | false;
    onDelete?: (id: ResourceID) => void;
}
export type IEntityListColumnRender = (value: any, values: any, index: number, field: EntityField<any, any>) => React.ReactNode | {
    children: React.ReactNode;
    props: {
        rowSpan: number;
        colSpan: number;
    };
};
export type IEntityListColumnAlign = "left" | "right" | "center";
export type IEntityListColumn<T = any> = string | {
    field: string;
    hidden?: boolean;
    render?: IEntityListColumnRender;
    align?: IEntityListColumnAlign;
    titleRender?: (props: EntityListTitleRenderProps<T>) => React.ReactNode;
    aggregation?: DataSourceAggregationFunction;
    width?: number;
};
export interface IEntityListConfig<T extends EntityDataType> extends ResourceCollectionOptions<T> {
    table?: Thunk<IEntityListTableProps, ResourceCollection<T>>;
    card?: Thunk<CardProps, ResourceCollection<T>>;
    searchable?: boolean;
    hidden?: Thunk<boolean, ResourceCollection<T>>;
    showAddButton?: boolean;
    addButton?: Thunk<boolean | CreateEntityProps | React.ReactNode, {
        collection: ResourceCollection<T>;
    }>;
    title?: string;
    fields?: Thunk<IEntityListColumn<T>[]>;
    editableFields?: Thunk<string[]>;
    wrapperType?: "card" | "plain";
}
export interface IEntityListProps<T extends EntityDataType> extends IEntityListConfig<T> {
    entity: Entity<T>;
}
export interface EntityListTitleRenderProps<T> {
    title: string;
    data: T[] | undefined;
}
export declare const EntityList: <T extends EntityDataType = any>(props: IEntityListProps<T>) => JSX.Element | null;
