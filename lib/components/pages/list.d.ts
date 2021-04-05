import "../../../styles/entity-list.css";
import * as React from "react";
import { Entity, EntityDataType } from "../../model/Entity";
import { EntitylistActionButton } from "./list.buttons";
import { ResourceCollection, ResourceCollectionOptions } from "webpanel-data";
import { TablePaginationConfig, TableProps } from "antd/lib/table";
import { Thunk } from "ts-thunk";
import { CardProps } from "antd/lib/card";
import { CreateEntityProps } from "../buttons/EntityAddButton";
import { EntityField } from "../../model/EntityField";
import { ResourceTableColumn } from "webpanel-antd/lib/table/ResourceTable";
import i18next from "i18next";
export interface IEntityListTableProps extends TableProps<any>, ResourceCollectionOptions<any> {
    actionButtons?: Thunk<EntitylistActionButton[], any>;
    actionButtonsTitle?: React.ReactNode;
    actionButtonsFixed?: boolean;
    pagination?: TablePaginationConfig | false;
}
export declare type IEntityListColumnRender = (value: any, values: any, index: number, field: EntityField<any, any>) => React.ReactNode | {
    children: React.ReactNode;
    props: {
        rowSpan: number;
        colSpan: number;
    };
};
export declare type IEntityListColumnAlign = "left" | "right" | "center";
export declare type IEntityListColumn<T = any> = string | {
    field: string;
    hidden?: boolean;
    render?: IEntityListColumnRender;
    align?: IEntityListColumnAlign;
    titleRender?: (props: EntityListTitleRenderProps<T>) => React.ReactNode;
};
export interface IEntityListConfig<T extends EntityDataType> extends ResourceCollectionOptions<T> {
    table?: IEntityListTableProps;
    card?: CardProps;
    searchable?: boolean;
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
export declare class EntityList<T extends EntityDataType = any> extends React.Component<IEntityListProps<T>, {
    version: number;
}> {
    state: {
        version: number;
    };
    getColumns(listFields: {
        field: EntityField<any, any>;
        render?: IEntityListColumnRender;
        align?: IEntityListColumnAlign;
        titleRender?: (props: EntityListTitleRenderProps<T>) => React.ReactNode;
    }[], resource: ResourceCollection<T>, t: i18next.TFunction): ResourceTableColumn[];
    private getListFields;
    private cardContent;
    private tableActionButtons;
    private tableContent;
    render(): React.ReactNode;
}
