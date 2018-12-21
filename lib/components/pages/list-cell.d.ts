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
    currentValue?: any;
    value?: any;
    valueElement?: React.ReactNode;
}
export declare class ListCell extends React.Component<IListCellProps> {
    state: {
        currentValue: undefined;
        value: undefined;
        valueElement: undefined;
    };
    onChange: (value: any, valueElement: React.ReactNode) => Promise<void>;
    cancel: () => void;
    save: () => Promise<void>;
    render(): JSX.Element;
}
