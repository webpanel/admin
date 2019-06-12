import * as React from 'react';
import { EntityField } from '../../model/EntityField';
import { ResourceCollection } from 'webpanel-data';
export interface IListCellProps {
    collection: ResourceCollection;
    values: any;
    field: EntityField<any, any>;
    editable: boolean;
}
export interface IListCellState {
    currentValue?: any;
    value?: any;
    valueElement?: React.ReactNode;
    editing: boolean;
    saving: boolean;
}
export declare class ListCell extends React.Component<IListCellProps, IListCellState> {
    state: {
        currentValue: undefined;
        value: undefined;
        valueElement: undefined;
        editing: boolean;
        saving: boolean;
    };
    onChange: (value: any, valueElement: React.ReactNode) => Promise<void>;
    cancel: () => void;
    save: () => Promise<void>;
    render(): React.ReactNode;
}
