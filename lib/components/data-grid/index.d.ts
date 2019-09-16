import '../../../styles/data-grid.css';
import * as React from 'react';
import { ResourceCollection } from 'webpanel-data';
import { ActionButtonProps } from 'webpanel-antd/lib/table/ResourceTableActionButtons';
import { DataSourceArgumentMap } from 'webpanel-data/lib/DataSource';
import { Entity } from '../../model/Entity';
import { EntityField } from '../../model/EntityField';
export interface IDataGridProps {
    entity: Entity;
    fields?: string[];
    editWholeRows?: boolean;
    initialFilters?: DataSourceArgumentMap;
    newItemInitialValues?: {
        [key: string]: any;
    };
}
export interface IDataGridState {
    rowValues: {
        [key: string]: {
            [key: string]: any;
        };
    };
    editingFlags: {
        [key: string]: boolean;
    };
    addingNewEntity: boolean;
}
export declare class DataGrid extends React.Component<IDataGridProps, IDataGridState> {
    state: {
        rowValues: {};
        editingFlags: {};
        addingNewEntity: boolean;
    };
    toggleEditing: (resourceID: string, fields: EntityField<any, any>[], force?: boolean) => void;
    isEditing: (resourceID: string, field?: EntityField<any, any> | undefined) => boolean;
    onValueChange: (record: any, field: EntityField<any, any>, value: any) => void;
    saveChange: (resource: ResourceCollection<any[] | null, import("webpanel-data/lib/ResourceCollection").ResourceCollectionConfig>, record: any, fields: EntityField<any, any>[]) => Promise<void>;
    deleteRow: (resource: ResourceCollection<any[] | null, import("webpanel-data/lib/ResourceCollection").ResourceCollectionConfig>, resourceID: string) => Promise<void>;
    actionButtons: (resource: ResourceCollection<any[] | null, import("webpanel-data/lib/ResourceCollection").ResourceCollectionConfig>, fields: EntityField<any, any>[]) => ((props: ActionButtonProps) => JSX.Element)[] | undefined;
    render(): React.ReactNode;
}
