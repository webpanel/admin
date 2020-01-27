import * as React from "react";

import { EntityField, IEntityFieldConfig } from "../EntityField";

export interface IEntityFieldCustomConfig<T> extends IEntityFieldConfig<T> {
  fetchField?: string;
  editFetchField?: string;
  inputElement: (props: {
    value: T | undefined;
    onChange: (value?: T) => void;
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

  public inputElement(props?: {
    value?: T;
    onChange?: (value: any, valueElement: React.ReactNode) => void;
    autoFocus?: boolean;
  }): React.ReactNode {
    const onChange = props && props.onChange;
    const onChangeProp = (value?: T) => onChange && onChange(value, value);
    return this.config.inputElement({
      value: props && props.value,
      onChange: onChangeProp
    });
  }
}
