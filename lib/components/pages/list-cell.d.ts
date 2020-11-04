import * as React from "react";
import { EntityField } from "../../model/EntityField";
import { ResourceCollection } from "webpanel-data";
export interface IListCellProps {
    collection: ResourceCollection<any>;
    values: any;
    field: EntityField<any, any>;
    fields: EntityField<any, any>[];
    editable: boolean;
}
export interface IListCellState {
    currentValue?: any;
    value?: any;
    valueElement?: React.ReactNode;
    editing: boolean;
    saving: boolean;
}
export declare const ListCell: (props: IListCellProps) => JSX.Element;
