import * as React from "react";

import {
  EntityField,
  IEntityFieldConfig,
  IEntityFieldInputElementProps,
} from "../EntityField";

export interface IEntityFieldCustomConfig<T> extends IEntityFieldConfig<T> {
  fetchField?: string;
  editFetchField?: string;
  inputElement: (props: {
    value: T | undefined;
    onChange: (value?: T) => void;
    valueGetter: (key: string) => any;
    values?: any;
  }) => React.ReactNode;
}

export class EntityFieldCustom<
  T,
  C extends IEntityFieldCustomConfig<T>
> extends EntityField<T, C> {
  public editFetchField(): string {
    return this.config.editFetchField || super.editFetchField();
  }

  public fetchField(): string | null {
    return this.config.fetchField || super.fetchField();
  }

  public inputElement(
    props?: IEntityFieldInputElementProps<T>
  ): React.ReactNode {
    const onChange = props && props.onChange;
    const onChangeProp = (value?: T) => onChange && onChange(value, value);
    return this.config.inputElement({
      value: props && props.value,
      onChange: onChangeProp,
      values: props?.values,
      valueGetter: (key) => {
        return (
          props?.formInstance?.getFieldValue(key) ||
          (props?.values && props?.values[key])
        );
      },
    });
  }
}
