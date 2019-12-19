import * as React from 'react';
import * as moment from 'moment';
import { EntityField, IEntityFieldConfig, IEntityFieldFilterProps } from '../EntityField';
export interface IEntityFieldDateConfig<T> extends IEntityFieldConfig<T> {
    showTime?: boolean;
    format?: string;
}
export declare class EntityFieldDate<T> extends EntityField<T, IEntityFieldDateConfig<T>> {
    private get format();
    private renderValue;
    get render(): ((record: T) => React.ReactNode);
    inputElement(props?: {
        value?: any;
        onChange?: (value: any, valueElement: React.ReactNode) => void;
        autoFocus?: boolean;
    }): React.ReactNode;
    filterDropdownInput: (props: IEntityFieldFilterProps<moment.Moment>) => JSX.Element;
    get filterNormalize(): ((values: moment.Moment[]) => {
        [key: string]: any;
    });
    get filterDenormalize(): (values: {
        [key: string]: any;
    }) => any[];
}
