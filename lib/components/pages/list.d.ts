import "../../../styles/entity-list.css";
import * as React from "react";
import { DataSource, ResourceCollection, ResourceCollectionOptions, ResourceID } from "webpanel-data";
import { EntitylistActionButton } from "./list.buttons";
import { PaginationConfig, TableProps } from "antd/lib/table";
import { Thunk } from "ts-thunk";
import { CardProps } from "antd/lib/card";
import { CreateEntityProps } from "../buttons/EntityAddButton";
import { Entity } from "../../model/Entity";
import { EntityField } from "../../model/EntityField";
import { ResourceTableColumn } from "webpanel-antd/lib/table/ResourceTable";
import i18next from "i18next";
export interface IEntityListTableProps extends TableProps<any>, ResourceCollectionOptions<any> {
    condensed?: boolean;
    actionButtons?: EntitylistActionButton[];
    actionButtonsTitle?: React.ReactNode;
    actionButtonsFixed?: boolean;
    pagination?: PaginationConfig | false;
}
export declare type IEntityListColumnRender = (value: any, values: any, index: number, field: EntityField<any, any>) => React.ReactNode | {
    childre: React.ReactNode;
    props: {
        rowSpan: number;
        colSpan: number;
    };
};
export declare type IEntityListColumnAlign = "left" | "right" | "center";
export declare type IEntityListColumn = string | {
    field: string;
    hidden?: boolean;
    render?: IEntityListColumnRender;
    align?: IEntityListColumnAlign;
};
export interface IEntityListConfig<T> extends ResourceCollectionOptions<T> {
    table?: IEntityListTableProps;
    card?: CardProps;
    searchable?: boolean;
    showAddButton?: boolean;
    addButton?: boolean | CreateEntityProps;
    title?: string;
    fields?: Thunk<IEntityListColumn[]>;
    editableFields?: Thunk<string[]>;
    wrapperType?: "card" | "plain";
}
export interface IEntityListProps<T extends {
    id: ResourceID;
}> extends IEntityListConfig<T> {
    entity: Entity<T>;
    dataSource: DataSource;
}
export declare class EntityList<T extends {
    id: ResourceID;
} = any> extends React.Component<IEntityListProps<T>> {
    getColumns(listFields: {
        field: EntityField<any, any>;
        render?: IEntityListColumnRender;
        align?: IEntityListColumnAlign;
    }[], resource: ResourceCollection<T>, t: i18next.TFunction): ResourceTableColumn[];
    private getListFields;
    private cardContent;
    private tableActionButtons;
    private tableContent;
    render(): React.ReactNode;
}
