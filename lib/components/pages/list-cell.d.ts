import * as React from 'react';
import { EntityField } from '../../model/EntityField';
import { ResourceCollection } from 'webpanel-data';
export interface IListCellProps {
    collection: ResourceCollection;
    values: any;
    field: EntityField<any, any>;
    editable: boolean;
}
export interface ListCellState {
    value?: any;
}
export declare class ListCell extends React.Component<IListCellProps> {
    state: {
        value: undefined;
    };
    onChange: (value: any) => Promise<void>;
    render(): {} | null | undefined;
}
