import * as React from "react";
import { DataSource, ResourceCollection, SortInfo } from "webpanel-data";
import { Entity } from "../../model/Entity";
import { ResourceTableColumn } from "webpanel-antd/lib/table/ResourceTable";
import { EntityField } from "../../model/EntityField";
import { Thunk } from "ts-thunk";
import { DataSourceArgumentMap } from "webpanel-data/lib/DataSource";
export interface IEntityListTableProps {
    condensed?: boolean;
}
export declare type IEntityListColumnRender = (value: any, values: any, field: EntityField<any, any>) => React.ReactNode;
export declare type IEntityListColumn = string | {
    field: string;
    render?: IEntityListColumnRender;
};
export interface IEntityListConfig {
    table?: IEntityListTableProps;
    title?: string;
    fields?: Thunk<IEntityListColumn[]>;
    editableFields?: Thunk<string[]>;
    initialSorting?: SortInfo[];
    initialFilters?: DataSourceArgumentMap;
}
export interface IEntityListProps extends IEntityListConfig {
    entity: Entity<any>;
    dataSource: DataSource;
}
export declare class EntityList extends React.Component<IEntityListProps> {
    getColumns(listFields: {
        field: EntityField<any, any>;
        render?: IEntityListColumnRender;
    }[], resource: ResourceCollection): ResourceTableColumn[];
    render(): JSX.Element;
}
