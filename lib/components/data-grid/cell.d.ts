import * as React from 'react';
import { EntityField } from '../../model/EntityField';
export interface IDataGridCellProps {
    values: any;
    field: EntityField<any, any>;
    isEditing: boolean;
    onClick?: () => void;
    onChange?: (value: any) => void;
    onSave?: () => void;
    onCancel?: () => void;
}
export declare class DataGridCell extends React.Component<IDataGridCellProps> {
    render(): React.ReactNode;
}
